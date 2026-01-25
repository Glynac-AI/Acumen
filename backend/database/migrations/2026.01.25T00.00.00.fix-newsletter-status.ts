/**
 * Migration: Create newsletter_subscribers_tenant_lnk table
 * 
 * This migration creates the missing link table for the manyToOne/oneToMany
 * bidirectional relationship between newsletter_subscribers and tenants.
 * 
 * Error fixed: "relation newsletter_subscribers_tenant_lnk does not exist"
 */

export async function up(knex: any) {
    console.log('🔧 Running newsletter_subscribers_tenant_lnk migration...');

    const tableName = 'newsletter_subscribers_tenant_lnk';

    // Check if the link table already exists
    const tableExists = await knex.schema.hasTable(tableName);

    if (tableExists) {
        console.log(`✅ Table ${tableName} already exists, skipping creation.`);
        return;
    }

    console.log(`📋 Creating table ${tableName}...`);

    await knex.schema.createTable(tableName, (table: any) => {
        // Primary key
        table.increments('id').primary();

        // Foreign key to newsletter_subscribers
        table.integer('newsletter_subscriber_id').unsigned().notNullable();

        // Foreign key to tenants
        table.integer('tenant_id').unsigned().notNullable();

        // Strapi's internal ordering column for relations
        table.double('newsletter_subscriber_ord').nullable();

        // Add foreign key constraints
        table
            .foreign('newsletter_subscriber_id')
            .references('id')
            .inTable('newsletter_subscribers')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');

        table
            .foreign('tenant_id')
            .references('id')
            .inTable('tenants')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');

        // Unique constraint to prevent duplicate links
        table.unique(['newsletter_subscriber_id', 'tenant_id']);
    });

    // Create indexes for better query performance
    console.log('📋 Creating indexes...');

    await knex.raw(`
        CREATE INDEX IF NOT EXISTS idx_newsletter_subscribers_tenant_lnk_subscriber 
        ON ${tableName} (newsletter_subscriber_id);
    `);

    await knex.raw(`
        CREATE INDEX IF NOT EXISTS idx_newsletter_subscribers_tenant_lnk_tenant 
        ON ${tableName} (tenant_id);
    `);

    console.log(`✅ Table ${tableName} created successfully!`);
}

export async function down(knex: any) {
    console.log('🔧 Rolling back newsletter_subscribers_tenant_lnk migration...');

    const tableName = 'newsletter_subscribers_tenant_lnk';
    const tableExists = await knex.schema.hasTable(tableName);

    if (tableExists) {
        console.log(`📋 Dropping table ${tableName}...`);
        await knex.schema.dropTable(tableName);
        console.log(`✅ Table ${tableName} dropped.`);
    } else {
        console.log(`⚠️ Table ${tableName} does not exist, nothing to drop.`);
    }
}