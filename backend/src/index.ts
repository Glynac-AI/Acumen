import type { Core } from '@strapi/strapi';

// Seed data for default tenant
const defaultTenantData = {
  name: 'RegulateThis',
  slug: 'regulatethis',
  domain: 'regulatethis.com',
  isActive: true,
  primaryColor: '#49648C',
  secondaryColor: '#1a1a2e',
  description: 'The original RegulateThis blog platform'
};

// Seed data for Sylvian tenant
const sylvianTenantData = {
  name: 'Sylvan',
  slug: 'sylvian',
  domain: 'sylvannotes.com',
  isActive: true,
  primaryColor: '#000000', // Placeholder, can be updated
  secondaryColor: '#ffffff', // Placeholder, can be updated
  description: 'Standardized structured real estate income platform providing repeatable structure, workflow, and audit-ready documentation for institutional-grade real estate income investing.'
};

// Seed data for Glynac AI tenant
const glynacTenantData = {
  name: 'Glynac AI',
  slug: 'glynac-ai',
  domain: 'glynac.ai',
  isActive: true,
  primaryColor: '#6366f1',
  secondaryColor: '#1e1b4b',
  description: 'Glynac AI platform for intelligent automation and insights'
};

// Seed data for Pillars
const pillarsData = [
  {
    name: 'Practice Management',
    slug: 'practice-management',
    subtitle: 'Building Firms That Work',
    description: 'Growth creates problems. Good problems, but problems nonetheless. Our practice management coverage digs into compensation structures, talent acquisition, client segmentation, and the operational decisions that separate thriving firms from struggling ones.',
    color: '#49648C',
    order: 1,
    details: [
      { detail: 'Succession & Transition — Planning exits, buying books, and everything in between' },
      { detail: 'Scaling Operations — What breaks first when your AUM doubles' },
      { detail: 'Client Experience — Retention starts long before the annual review' },
    ],
  },
  {
    name: 'Wealth Management Tech',
    slug: 'wealth-management-tech',
    subtitle: 'Cutting Through the Noise',
    description: 'Every new app claims to be the solution. We test those claims against reality — focusing on what actually improves client outcomes and firm efficiency, and calling it out when something falls short of the hype.',
    color: '#49648C',
    order: 2,
    details: [
      { detail: 'Portfolio management platforms compared head-to-head' },
      { detail: 'CRM solutions that advisors actually use' },
      { detail: 'Reporting tools clients appreciate' },
      { detail: 'Integration challenges and how firms solve them' },
      { detail: 'Security considerations that matter now' },
    ],
  },
  {
    name: 'Compliance & Regulation',
    slug: 'compliance-regulation',
    subtitle: 'Keeping You Ahead of the Curve',
    description: 'Regulatory shifts rarely arrive with clear instructions. We track SEC guidance, state-level changes, and industry standards — then translate what it means for your policies, disclosures, and daily operations.',
    color: '#49648C',
    order: 3,
    details: [
      { detail: 'Marketing Rule Developments — Advertising, testimonials, and social media guidance' },
      { detail: 'Examination Priorities — Where regulators are focusing their attention' },
      { detail: 'Cybersecurity Standards — Requirements keep evolving. So should your approach' },
    ],
  },
];

// Tenant user account definitions
const tenantUsers = [
  {
    username: 'regulatethis-user',
    email: 'regulatethis-user@regulatethis.com',
    password: 'RegulateThis123!',
    tenantSlug: 'regulatethis',
    roleName: 'RegulateThis User',
    roleDescription: 'User role scoped to RegulateThis tenant content only',
  },
  {
    username: 'sylvan-user',
    email: 'sylvan-user@sylvannotes.com',
    password: 'Sylvan123!',
    tenantSlug: 'sylvian',
    roleName: 'Sylvan User',
    roleDescription: 'User role scoped to Sylvan tenant content only',
  },
  {
    username: 'glynac-user',
    email: 'glynac-user@glynac.ai',
    password: 'GlynacAI123!',
    tenantSlug: 'glynac-ai',
    roleName: 'Glynac AI User',
    roleDescription: 'User role scoped to Glynac AI tenant content only',
  },
];

// Content-type API UIDs that tenant users should have access to
const tenantScopedContentTypes = [
  'api::article.article',
  'api::author.author',
  'api::category.category',
  'api::tag.tag',
  'api::pillar.pillar',
  'api::subcategory.subcategory',
  'api::site-setting.site-setting',
  'api::tenant.tenant',
  'api::blog-post.blog-post',
  'api::regulatethis-subscriber.regulatethis-subscriber',
  'api::sylvan-request-access.sylvan-request-access',
];

// Tenant admin accounts (Strapi Admin Panel)
const tenantAdmins = [
  {
    firstname: 'RegulateThis',
    lastname: 'Admin',
    email: 'admin@regulatethis.com',
    password: 'RegulateThisAdmin123',
    username: 'regulatethisAdmin',
    tenantSlug: 'regulatethis',
    isActive: true,
  },
  {
    firstname: 'Sylvan',
    lastname: 'Admin',
    email: 'admin@sylvannotes.com',
    password: 'SylvanAdmin123',
    username: 'sylvanAdmin',
    tenantSlug: 'sylvian',
    isActive: true,
  },
  {
    firstname: 'Glynac',
    lastname: 'Admin',
    email: 'GlynacAdmin@glynac.ai',
    password: 'GlynacAdmin123',
    username: 'glynacAdmin',
    tenantSlug: 'glynac-ai',
    isActive: true,
  },
];

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register({ strapi }: { strapi: Core.Strapi }) {
    // Note: The admin::user tenant relation is now defined via schema extension:
    // src/extensions/admin/content-types/user/schema.json
    // This is preferred over dynamic injection as it creates a proper DB column.
  },

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    // ─── 1. Seed Tenants ───────────────────────────────────────────────
    const seedTenant = async (tenantData: typeof defaultTenantData) => {
      let tenant = await strapi.documents('api::tenant.tenant').findFirst({
        filters: {
          $or: [
            { slug: tenantData.slug },
            { domain: tenantData.domain },
          ],
        },
      });

      if (!tenant) {
        console.log(`⚙️ Seeding tenant: ${tenantData.name}...`);
        tenant = await strapi.documents('api::tenant.tenant').create({
          data: tenantData,
          status: 'published',
        });
        console.log(`✅ Tenant ${tenantData.name} created!`);
      } else {
        console.log(`📋 Tenant ${tenantData.name} already exists, skipping seed.`);
      }
      return tenant;
    };

    const defaultTenant = await seedTenant(defaultTenantData);
    const sylvianTenant = await seedTenant(sylvianTenantData);
    const glynacTenant = await seedTenant(glynacTenantData);

    // Build a slug-to-tenant map for user creation
    const tenantMap: Record<string, any> = {};
    if (defaultTenant) tenantMap[defaultTenantData.slug] = defaultTenant;
    if (sylvianTenant) tenantMap[sylvianTenantData.slug] = sylvianTenant;
    if (glynacTenant) tenantMap[glynacTenantData.slug] = glynacTenant;

    // ─── 2. Seed Pillars (for RegulateThis tenant) ────────────────────
    if (defaultTenant) {
      for (const pillar of pillarsData) {
        const existingPillar = await strapi.documents('api::pillar.pillar').findFirst({
          filters: {
            slug: pillar.slug,
          },
        });

        if (!existingPillar) {
          console.log(`⚙️ Seeding pillar: ${pillar.name}...`);
          const { color, ...pillarData } = pillar as any;
          await strapi.documents('api::pillar.pillar').create({
            data: {
              ...pillarData,
              tenant: defaultTenant.documentId,
            },
            status: 'published',
          });
          console.log(`✅ Pillar ${pillar.name} created!`);
        } else {
          console.log(`📋 Pillar ${pillar.name} already exists, skipping seed.`);
        }
      }
    }

    // ─── 3. Seed Site Settings ─────────────────────────────────────────
    const seedSiteSettings = async (
      tenant: any,
      siteName: string,
      siteDescription: string
    ) => {
      if (!tenant) return;
      const existing = await strapi.documents('api::site-setting.site-setting').findMany({
        filters: { tenant: { documentId: tenant.documentId } }
      });

      if (existing.length === 0) {
        console.log(`⚙️ Seeding ${siteName} site settings...`);
        await strapi.documents('api::site-setting.site-setting').create({
          data: {
            siteName,
            siteDescription,
            gtmEnabled: false,
            gaEnabled: false,
            metaPixelEnabled: false,
            tenant: tenant.documentId,
          },
          status: 'published',
        });
        console.log(`✅ ${siteName} site settings created!`);
      } else {
        console.log(`📋 ${siteName} site settings already exist, skipping seed.`);
      }
    };

    await seedSiteSettings(
      defaultTenant,
      'RegulateThis',
      'Expert insights on wealth management, compliance, and practice management for financial advisors.'
    );
    await seedSiteSettings(
      sylvianTenant,
      'Sylvan',
      'Structure. Yield. Growth.'
    );
    await seedSiteSettings(
      glynacTenant,
      'Glynac AI',
      'Intelligent automation and insights powered by Glynac AI.'
    );


    // ─── 4. Seed Tenant-Scoped Roles & User Accounts ──────────────────
    for (const userDef of tenantUsers) {
      const tenant = tenantMap[userDef.tenantSlug];
      if (!tenant) {
        console.log(`⚠️ Tenant ${userDef.tenantSlug} not found, skipping user ${userDef.username}`);
        continue;
      }

      // Create or find the custom role
      let role = await strapi.db.query('plugin::users-permissions.role').findOne({
        where: { name: userDef.roleName },
      });

      if (!role) {
        console.log(`⚙️ Creating role: ${userDef.roleName}...`);
        role = await strapi.db.query('plugin::users-permissions.role').create({
          data: {
            name: userDef.roleName,
            description: userDef.roleDescription,
            type: userDef.roleName.toLowerCase().replace(/\s+/g, '-'),
          },
        });

        // Assign permissions to the role for tenant-scoped content types
        for (const contentTypeUID of tenantScopedContentTypes) {
          const apiName = contentTypeUID.split('.')[0].replace('api::', '');
          const actions = ['find', 'findOne'];

          for (const action of actions) {
            await strapi.db.query('plugin::users-permissions.permission').create({
              data: {
                action: `${contentTypeUID}.${action}`,
                role: role.id,
              },
            });
          }
        }
        console.log(`✅ Role ${userDef.roleName} created with read permissions!`);
      } else {
        console.log(`📋 Role ${userDef.roleName} already exists, skipping.`);
      }

      // Create or find the user
      const existingUser = await strapi.db.query('plugin::users-permissions.user').findOne({
        where: { email: userDef.email },
      });

      if (!existingUser) {
        console.log(`⚙️ Creating user: ${userDef.username}...`);
        await strapi.plugins['users-permissions'].services.user.add({
          username: userDef.username,
          email: userDef.email,
          password: userDef.password,
          confirmed: true,
          blocked: false,
          role: role.id,
          tenant: tenant.id,
          provider: 'local',
        });
        console.log(`✅ User ${userDef.username} created and linked to tenant ${tenant.name}!`);
      } else {
        console.log(`📋 User ${userDef.username} already exists, skipping.`);
      }
    }

    // ─── 5. Seed Public Role Permissions for blog-post ─────────────────
    // This ensures find & findOne are enabled for the Public role on every
    // fresh deployment — no manual Admin UI step required. Fixes issue #6 / #12.
    const publicPermissionsToSeed = [
      'api::blog-post.blog-post.find',
      'api::blog-post.blog-post.findOne',
    ];

    const publicRole = await strapi.db.query('plugin::users-permissions.role').findOne({
      where: { type: 'public' },
    });

    if (publicRole) {
      for (const action of publicPermissionsToSeed) {
        const existing = await strapi.db.query('plugin::users-permissions.permission').findOne({
          where: { action, role: publicRole.id },
        });

        if (!existing) {
          await strapi.db.query('plugin::users-permissions.permission').create({
            data: { action, role: publicRole.id, enabled: true },
          });
          console.log(`✅ Public permission granted: ${action}`);
        } else if (!existing.enabled) {
          await strapi.db.query('plugin::users-permissions.permission').update({
            where: { id: existing.id },
            data: { enabled: true },
          });
          console.log(`✅ Public permission enabled: ${action}`);
        } else {
          console.log(`📋 Public permission already set: ${action}`);
        }
      }
    } else {
      console.warn('⚠️ Could not find Public role — permissions not seeded.');
    }

    const editorRole = await strapi.db.query('admin::role').findOne({
      where: { code: 'strapi-editor' }
    });
    const authorRole = await strapi.db.query('admin::role').findOne({
      where: { code: 'strapi-author' }
    });

    if (!editorRole) {
      console.warn('⚠️ strapi-editor role not found — tenant admins cannot be seeded.');
    }

    // ─── Tenant-Specific Admin Roles ───────────────────────────────────────
    const tenantAdminRoleDefs = [
      {
        name: 'Glynac Admin',
        code: 'glynac-admin',
        description: 'Admin role scoped exclusively to Glynac AI tenant content',
        tenantSlug: 'glynac-ai',
      },
      {
        name: 'Sylvan Admin',
        code: 'sylvan-admin',
        description: 'Admin role scoped exclusively to Sylvan tenant content',
        tenantSlug: 'sylvian',
      },
      {
        name: 'RegulateThis Admin',
        code: 'regulatethis-admin',
        description: 'Admin role scoped exclusively to RegulateThis tenant content',
        tenantSlug: 'regulatethis',
      },
    ];

    const tenantAdminRoleMap: Record<string, any> = {}; // slug → role object

    for (const roleDef of tenantAdminRoleDefs) {
      let role = await strapi.db.query('admin::role').findOne({
        where: { code: roleDef.code },
      });

      if (!role) {
        console.log(`⚙️ Creating admin role: ${roleDef.name}...`);
        role = await strapi.db.query('admin::role').create({
          data: {
            name: roleDef.name,
            code: roleDef.code,
            description: roleDef.description,
          },
        });
        console.log(`✅ Admin role ${roleDef.name} created (code: ${roleDef.code})`);
      } else {
        console.log(`📋 Admin role ${roleDef.name} already exists, skipping creation.`);
      }

      tenantAdminRoleMap[roleDef.tenantSlug] = role;
    }

    // ─── Permission Matrix for Tenant Admin Roles ──────────────────────────
    const sharedContentTypes = [
      'api::article.article',
      'api::author.author',
      'api::category.category',
      'api::tag.tag',
      'api::pillar.pillar',
      'api::subcategory.subcategory',
      'api::site-setting.site-setting',
    ];

    const exclusiveContentTypes: Record<string, string[]> = {
      'glynac-ai': ['api::blog-post.blog-post'],
      'sylvian': ['api::sylvan-request-access.sylvan-request-access'],
      'regulatethis': ['api::regulatethis-subscriber.regulatethis-subscriber'],
    };

    const fullCrudActions = [
      'plugin::content-manager.explorer.create',
      'plugin::content-manager.explorer.read',
      'plugin::content-manager.explorer.update',
      'plugin::content-manager.explorer.delete',
    ];

    const readUpdateOnly = [
      'plugin::content-manager.explorer.read',
      'plugin::content-manager.explorer.update',
    ];

    const upsertAdminPermission = async (
      roleId: number,
      action: string,
      subject: string,
      allFields: string[] | null
    ) => {
      const existing = await strapi.db.query('admin::permission').findOne({
        where: { action, subject, role: roleId },
      });
      const properties = { fields: allFields, locales: null };
      if (!existing) {
        await strapi.db.query('admin::permission').create({
          data: { action, subject, properties, conditions: [], role: roleId },
        });
      } else {
        await strapi.db.query('admin::permission').update({
          where: { id: existing.id },
          data: { properties },
        });
      }
    };

    for (const [tenantSlug, role] of Object.entries(tenantAdminRoleMap)) {
      if (!role) continue;

      console.log(`⚙️ Setting permissions for role: ${role.name}...`);

      // Shared types — full CRUD
      for (const uid of sharedContentTypes) {
        const cType = strapi.contentType(uid as any);
        const fields = cType
          ? Object.keys(cType.attributes).filter(
            (attr) => !['createdBy', 'updatedBy'].includes(attr)
          )
          : null;

        for (const action of fullCrudActions) {
          await upsertAdminPermission(role.id, action, uid, fields);
        }
      }

      // Tenant model — read + update only
      const tenantCType = strapi.contentType('api::tenant.tenant' as any);
      const tenantFields = tenantCType
        ? Object.keys(tenantCType.attributes).filter(
          (attr) => !['createdBy', 'updatedBy'].includes(attr)
        )
        : null;
      for (const action of readUpdateOnly) {
        await upsertAdminPermission(role.id, action, 'api::tenant.tenant', tenantFields);
      }

      // Exclusive types — full CRUD for this tenant only
      const exclusiveTypes = exclusiveContentTypes[tenantSlug] || [];
      for (const uid of exclusiveTypes) {
        const cType = strapi.contentType(uid as any);
        const fields = cType
          ? Object.keys(cType.attributes).filter(
            (attr) => !['createdBy', 'updatedBy'].includes(attr)
          )
          : null;
        for (const action of fullCrudActions) {
          await upsertAdminPermission(role.id, action, uid, fields);
        }
      }

      console.log(`✅ Permissions set for role: ${role.name}`);
    }

    // ─── 6. Seed Tenant-Scoped Strapi Admins ──────────────────────────────────
    // Uses bcryptjs directly (strapi.admin.services.auth.hashPassword does not exist in Strapi v5)
    const bcrypt = require('bcryptjs');

    // Detect the correct junction table name (Strapi v5 uses _lnk, Strapi v4 uses _links)
    const knex = strapi.db.connection;
    let rolesJunctionTable: string | null = null;

    // Check in priority order: Strapi v5 name first, then v4 fallback
    const tableNamesToTry = ['admin_users_roles_lnk', 'admin_users_roles_links'];
    for (const tName of tableNamesToTry) {
      const exists = await knex.schema.hasTable(tName);
      console.log(`[RBAC-BOOTSTRAP] Junction table '${tName}' exists: ${exists}`);
      if (exists) {
        rolesJunctionTable = tName;
        break;
      }
    }

    if (!rolesJunctionTable) {
      // Last resort: scan all tables for anything matching *roles*lnk* or *roles*link*
      const allTables: string[] = await knex.raw(
        knex.client.config.client === 'sqlite3' || knex.client.config.client === 'sqlite'
          ? "SELECT name FROM sqlite_master WHERE type='table' AND name LIKE '%roles%'"
          : "SELECT table_name AS name FROM information_schema.tables WHERE table_name LIKE '%roles%' AND table_schema = current_schema()"
      ).then((result: any) => {
        // SQLite returns result.rows or result[0] depending on knex version
        const rows = result.rows ?? result[0] ?? result;
        return Array.isArray(rows) ? rows.map((r: any) => r.name ?? r.table_name) : [];
      });
      console.log(`[RBAC-BOOTSTRAP] All roles-related tables found: ${JSON.stringify(allTables)}`);
      const junctionCandidate = allTables.find((t: string) =>
        t.includes('admin') && t.includes('roles')
      );
      if (junctionCandidate) {
        rolesJunctionTable = junctionCandidate;
        console.log(`[RBAC-BOOTSTRAP] Using fallback junction table: ${rolesJunctionTable}`);
      }
    }

    if (!rolesJunctionTable) {
      console.error('[RBAC-BOOTSTRAP] CRITICAL: Cannot find admin roles junction table. Role assignment will be skipped. Check your DB schema.');
    }

    for (const adminDef of tenantAdmins) {
      console.log(`[RBAC-BOOTSTRAP] Processing admin: ${adminDef.email}`);

      const tenant = tenantMap[adminDef.tenantSlug];
      if (!tenant) {
        console.warn(`[RBAC-BOOTSTRAP] Tenant not found for slug '${adminDef.tenantSlug}', skipping ${adminDef.email}`);
        continue;
      }

      const tenantSpecificRole = tenantAdminRoleMap[adminDef.tenantSlug];
      if (!tenantSpecificRole) {
        console.warn(`[RBAC-BOOTSTRAP] Tenant-specific admin role not found for slug '${adminDef.tenantSlug}', skipping ${adminDef.email}`);
        continue;
      }

      console.log(`[RBAC-BOOTSTRAP] Target role: ${tenantSpecificRole.name} (id=${tenantSpecificRole.id}) | Tenant: ${tenant.name} (id=${tenant.id})`);

      const existingAdmin = await strapi.db.query('admin::user').findOne({
        where: { email: adminDef.email },
        populate: ['tenant', 'roles'],
      });

      let adminUserId: number | null = null;

      if (!existingAdmin) {
        console.log(`[RBAC-BOOTSTRAP] Creating new admin user: ${adminDef.email}`);
        try {
          // Hash password using bcryptjs directly — strapi.admin.services.auth.hashPassword
          // does not exist in Strapi v5.
          const hashedPassword = await bcrypt.hash(adminDef.password, 10);
          console.log(`[RBAC-BOOTSTRAP] Password hashed successfully for ${adminDef.email}`);

          const created = await strapi.db.query('admin::user').create({
            data: {
              email: adminDef.email,
              firstname: adminDef.firstname,
              lastname: adminDef.lastname,
              username: adminDef.username,
              password: hashedPassword,
              isActive: adminDef.isActive,
              registrationToken: null,    // null = registered, not pending invitation
              resetPasswordToken: null,
              tenant: tenant.id,
            },
          });
          adminUserId = created.id;
          console.log(`[RBAC-BOOTSTRAP] ✅ Created admin user ${adminDef.email} (id=${adminUserId})`);
        } catch (err) {
          console.error(`[RBAC-BOOTSTRAP] ❌ Failed to create admin user ${adminDef.email}:`, err);
          continue; // Skip role assignment if user creation failed
        }
      } else {
        adminUserId = existingAdmin.id;
        console.log(`[RBAC-BOOTSTRAP] Admin user ${adminDef.email} already exists (id=${adminUserId})`);

        // Always update tenant link to ensure it's correct
        try {
          await strapi.db.query('admin::user').update({
            where: { id: adminUserId },
            data: { tenant: tenant.id },
          });
          console.log(`[RBAC-BOOTSTRAP] ✅ Tenant link updated: ${adminDef.email} → ${tenant.name}`);
        } catch (err) {
          console.error(`[RBAC-BOOTSTRAP] ❌ Failed to update tenant for ${adminDef.email}:`, err);
        }
      }

      if (adminUserId === null) {
        console.error(`[RBAC-BOOTSTRAP] adminUserId is null for ${adminDef.email} — skipping role assignment`);
        continue;
      }

      // ── Force-assign role via junction table ────────────────────────────────
      // This is the ONLY reliable way to set admin roles in Strapi v5.
      // strapi.admin.services.user.updateById does NOT reliably update the junction table.
      if (!rolesJunctionTable) {
        console.error(`[RBAC-BOOTSTRAP] ❌ No junction table found — cannot assign role for ${adminDef.email}`);
        continue;
      }

      try {
        // Step 1: Remove all existing role assignments for this user
        const deleteCount = await knex(rolesJunctionTable)
          .where({ user_id: adminUserId })
          .delete();
        console.log(`[RBAC-BOOTSTRAP] Deleted ${deleteCount} existing role link(s) for user_id=${adminUserId}`);

        // Step 2: Insert the correct tenant-specific role
        await knex(rolesJunctionTable).insert({
          user_id: adminUserId,
          role_id: tenantSpecificRole.id,
        });
        console.log(`[RBAC-BOOTSTRAP] ✅ Role assigned: ${adminDef.email} → ${tenantSpecificRole.name} (role_id=${tenantSpecificRole.id}) via table '${rolesJunctionTable}'`);
      } catch (err) {
        console.error(`[RBAC-BOOTSTRAP] ❌ Failed to assign role for ${adminDef.email} via knex:`, err);

        // Fallback: try Strapi's admin service as a last resort
        try {
          await strapi.admin.services.user.updateById(adminUserId, {
            roles: [tenantSpecificRole.id],
          });
          console.log(`[RBAC-BOOTSTRAP] ✅ Role assigned via service fallback for ${adminDef.email}`);
        } catch (serviceErr) {
          console.error(`[RBAC-BOOTSTRAP] ❌ Service fallback also failed for ${adminDef.email}:`, serviceErr);
        }
      }
    }

    // ─── 7. Data Repair: Assign Orphan Records to Tenants ──────────────
    console.log('🛠 Running Data Repair: Assigning orphan records to tenants...');

    const repairOrphans = async (uid: string, targetTenant: any) => {
      if (!targetTenant) return;
      const orphans = await strapi.documents(uid as any).findMany({
        filters: { tenant: { $null: true } }
      } as any);

      if (orphans.length > 0) {
        console.log(`🔧 Repairing ${orphans.length} orphan records for ${uid} -> ${targetTenant.name}`);
        for (const orphan of orphans) {
          await strapi.documents(uid as any).update({
            documentId: orphan.documentId,
            data: { tenant: targetTenant.documentId },
            status: 'published',
          } as any);
        }
      }
    };

    // Articles & Subscribers -> RegulateThis
    await repairOrphans('api::article.article', defaultTenant);
    await repairOrphans('api::regulatethis-subscriber.regulatethis-subscriber', defaultTenant);

    // Blog Posts -> Glynac AI
    await repairOrphans('api::blog-post.blog-post', glynacTenant);

    // Request Access -> Sylvan
    await repairOrphans('api::sylvan-request-access.sylvan-request-access', sylvianTenant);

    console.log('✅ Data Repair complete.');
  },
};
