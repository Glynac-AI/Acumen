/**
 * Migration: Fix newsletter_subscribers table schema
 * 
 * This migration ensures the newsletter_subscribers table has:
 * 1. The correct columns (created_by_id, updated_by_id)
 * 2. The status column is a VARCHAR, not an enum
 */

export async function up(knex: any) {
    console.log('🔧 Running newsletter_subscribers migration...');

    // Check if the table exists
    const tableExists = await knex.schema.hasTable('newsletter_subscribers');

    if (!tableExists) {
        console.log('📋 Table newsletter_subscribers does not exist, skipping migration.');
        return;
    }

    // Check if created_by_id column exists
    const hasCreatedBy = await knex.schema.hasColumn('newsletter_subscribers', 'created_by_id');
    if (!hasCreatedBy) {
        console.log('➕ Adding created_by_id column...');
        await knex.schema.alterTable('newsletter_subscribers', (table: any) => {
            table.integer('created_by_id').unsigned().nullable();
        });
    }

    // Check if updated_by_id column exists
    const hasUpdatedBy = await knex.schema.hasColumn('newsletter_subscribers', 'updated_by_id');
    if (!hasUpdatedBy) {
        console.log('➕ Adding updated_by_id column...');
        await knex.schema.alterTable('newsletter_subscribers', (table: any) => {
            table.integer('updated_by_id').unsigned().nullable();
        });
    }

    // Fix the status column - convert from enum to varchar if needed
    // This handles PostgreSQL enum constraints
    try {
        console.log('🔄 Ensuring status column is VARCHAR...');

        // For PostgreSQL - alter the column type to varchar
        await knex.raw(`
      DO $$ 
      BEGIN
        -- Check if status column exists and alter it
        IF EXISTS (
          SELECT 1 FROM information_schema.columns 
          WHERE table_name = 'newsletter_subscribers' 
          AND column_name = 'status'
        ) THEN
          -- Try to alter to varchar, this handles enum conversion
          ALTER TABLE newsletter_subscribers 
          ALTER COLUMN status TYPE VARCHAR(255) USING status::VARCHAR;
          
          -- Set default value
          ALTER TABLE newsletter_subscribers 
          ALTER COLUMN status SET DEFAULT 'active';
        END IF;
      END $$;
    `);

        console.log('✅ Status column updated to VARCHAR.');
    } catch (error: any) {
        // If the column is already varchar, this might fail - that's OK
        console.log('⚠️ Status column modification skipped (may already be VARCHAR):', error.message);
    }

    console.log('✅ Newsletter subscribers migration completed!');
}

export async function down(knex: any) {
    // We don't want to revert these changes
    console.log('⚠️ Down migration not implemented for newsletter_subscribers fix.');
}
