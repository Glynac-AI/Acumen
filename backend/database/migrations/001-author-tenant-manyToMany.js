'use strict';

/**
 * Migration: author.tenant manyToOne → manyToMany
 *
 * Copies existing tenant_id FK values from the authors table
 * into the new join table created by Strapi for the manyToMany relation.
 *
 * Run AFTER the schema change is deployed and Strapi has created the join table.
 * The join table name is determined by Strapi — check your DB schema after
 * first deploy with the new schema to confirm the exact table name.
 *
 * Strapi v5 manyToMany join table naming convention:
 *   {collection_a}_{field}_{collection_b}_lnk
 *   e.g. authors_tenant_lnk  or  authors_tenants_lnk
 */
async function up(knex) {
    // Confirm join table exists
    const joinTableCandidates = [
        'authors_tenant_lnk',
        'authors_tenants_lnk',
        'authors_tenant_links',
    ];

    let joinTable = null;
    for (const candidate of joinTableCandidates) {
        const exists = await knex.schema.hasTable(candidate);
        if (exists) { joinTable = candidate; break; }
    }

    if (!joinTable) {
        console.warn('[Migration] Join table not found — schema may not have been deployed yet. Skipping.');
        return;
    }

    // Fetch all authors with a tenant_id FK (old column)
    const hasOldColumn = await knex.schema.hasColumn('authors', 'tenant_id');
    if (!hasOldColumn) {
        console.log('[Migration] No old tenant_id column found — nothing to migrate.');
        return;
    }

    const authors = await knex('authors')
        .select('id', 'tenant_id')
        .whereNotNull('tenant_id');

    console.log(`[Migration] Migrating ${authors.length} author→tenant links to join table '${joinTable}'`);

    for (const author of authors) {
        const exists = await knex(joinTable)
            .where({ author_id: author.id, tenant_id: author.tenant_id })
            .first();

        if (!exists) {
            await knex(joinTable).insert({
                author_id: author.id,
                tenant_id: author.tenant_id,
            });
        }
    }

    console.log('[Migration] Done.');
}

async function down(knex) {
    // Reversing this migration is not safe — do not drop the join table data
    console.log('[Migration] Down is a no-op for author-tenant manyToMany migration.');
}

module.exports = { up, down };
