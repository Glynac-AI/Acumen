/**
 * Script to manually fix Wiki.js Admin upload permissions
 * Run with: node backend/scripts/fix-wiki-upload-perms.js
 */

const { Strapi } = require('@strapi/strapi');

async function fixWikiUploadPermissions() {
  const strapi = await Strapi().load();
  const knex = strapi.db.connection;

  try {
    console.log('🔍 Looking for wiki-js-admin role...');
    
    // Find wiki-js-admin role
    const wikiRole = await knex('admin_roles')
      .where({ code: 'wiki-js-admin' })
      .first();

    if (!wikiRole) {
      console.error('❌ wiki-js-admin role not found!');
      process.exit(1);
    }

    console.log(`✅ Found wiki-js-admin role (id=${wikiRole.id})`);

    // Detect junction table
    let junctionTable = null;
    for (const candidate of ['admin_permissions_role_lnk', 'admin_permissions_role_links']) {
      const exists = await knex.schema.hasTable(candidate);
      if (exists) {
        junctionTable = candidate;
        break;
      }
    }

    console.log(`📋 Using junction table: ${junctionTable}`);

    // Check current upload permissions
    console.log('\n📊 Current upload permissions:');
    const currentPerms = await knex('admin_permissions as p')
      .join(`${junctionTable} as lnk`, 'p.id', 'lnk.permission_id')
      .where({ 'lnk.role_id': wikiRole.id })
      .whereNull('p.subject')
      .where('p.action', 'like', 'plugin::upload%')
      .select('p.id', 'p.action');

    currentPerms.forEach(p => console.log(`  - ${p.action} (id=${p.id})`));

    // Required upload permissions
    const requiredPerms = [
      'plugin::upload.read',
      'plugin::upload.assets.create',
      'plugin::upload.assets.update',
      'plugin::upload.assets.download',
      'plugin::upload.assets.copy-link',
      'plugin::upload.assets.delete',
      'plugin::upload.configure-view',
      'plugin::upload.settings.read',
      'plugin::upload.assets.access',
    ];

    console.log('\n🔧 Adding missing permissions...');

    for (const action of requiredPerms) {
      // Check if permission exists
      const existingPerm = await knex('admin_permissions as p')
        .join(`${junctionTable} as lnk`, 'p.id', 'lnk.permission_id')
        .where({ 
          'p.action': action, 
          'lnk.role_id': wikiRole.id 
        })
        .whereNull('p.subject')
        .select('p.id')
        .first();

      if (!existingPerm) {
        // Create new permission
        const [insertedPerm] = await knex('admin_permissions')
          .insert({
            action,
            subject: null,
            properties: JSON.stringify({ fields: null, locales: null }),
            conditions: '[]',
            created_at: new Date(),
            updated_at: new Date(),
          })
          .returning('id');

        const permId = typeof insertedPerm === 'object' ? insertedPerm.id : insertedPerm;

        // Link to role
        await knex(junctionTable).insert({
          permission_id: permId,
          role_id: wikiRole.id,
        });

        console.log(`  ✅ Created: ${action}`);
      } else {
        console.log(`  📋 Exists: ${action}`);
      }
    }

    // Verify final state
    console.log('\n📊 Final upload permissions:');
    const finalPerms = await knex('admin_permissions as p')
      .join(`${junctionTable} as lnk`, 'p.id', 'lnk.permission_id')
      .where({ 'lnk.role_id': wikiRole.id })
      .whereNull('p.subject')
      .where('p.action', 'like', 'plugin::upload%')
      .select('p.id', 'p.action');

    finalPerms.forEach(p => console.log(`  - ${p.action}`));

    console.log('\n✅ Wiki.js Admin upload permissions fixed!');
    console.log('⚠️  Please restart the Strapi server for changes to take effect.');

  } catch (error) {
    console.error('❌ Error fixing permissions:', error);
    throw error;
  } finally {
    await strapi.destroy();
  }
}

fixWikiUploadPermissions()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
