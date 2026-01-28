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
  domain: 'sylvan.com',
  isActive: true,
  primaryColor: '#000000', // Placeholder, can be updated
  secondaryColor: '#ffffff', // Placeholder, can be updated
  description: 'Standardized structured real estate income platform providing repeatable structure, workflow, and audit-ready documentation for institutional-grade real estate income investing.'
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


export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register({ strapi }: { strapi: Core.Strapi }) { },

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    // Seed Default Tenant
    let defaultTenant = await strapi.documents('api::tenant.tenant').findFirst({
      filters: {
        $or: [
          { slug: defaultTenantData.slug },
          { domain: defaultTenantData.domain },
        ],
      },
    });

    if (!defaultTenant) {
      console.log('⚙️ Seeding default tenant...');
      defaultTenant = await strapi.documents('api::tenant.tenant').create({
        data: defaultTenantData,
        status: 'published',
      });
      console.log('✅ Default tenant created!');
    }

    // Seed Sylvian Tenant
    let sylvianTenant = await strapi.documents('api::tenant.tenant').findFirst({
      filters: {
        $or: [
          { slug: sylvianTenantData.slug },
          { domain: sylvianTenantData.domain },
        ],
      },
    });

    if (!sylvianTenant) {
      console.log('⚙️ Seeding Sylvian tenant...');
      sylvianTenant = await strapi.documents('api::tenant.tenant').create({
        data: sylvianTenantData,
        status: 'published',
      });
      console.log('✅ Sylvian tenant created!');
    }

    // Seed Pillars
    if (defaultTenant) {
      for (const pillar of pillarsData) {
        // Check if pillar exists by slug (assuming slug is unique globally or sufficient to identify)
        // We removed the tenant filter to catch existing pillars that might have been created without a tenant relation
        // or to prevent unique constraint violations if the pillar exists globally.
        const existingPillar = await strapi.documents('api::pillar.pillar').findFirst({
          filters: {
            slug: pillar.slug,
          },
        });

        if (!existingPillar) {
          console.log(`⚙️ Seeding pillar: ${pillar.name}...`);

          // Remove color from data as it's not in the schema
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

    // Seed default Site Settings for the tenant
    const existingSiteSettings = await strapi.documents('api::site-setting.site-setting').findMany({
      filters: { tenant: { documentId: defaultTenant?.documentId } }
    });

    if (existingSiteSettings.length === 0 && defaultTenant) {
      console.log('⚙️ Seeding default site settings...');
      await strapi.documents('api::site-setting.site-setting').create({
        data: {
          siteName: 'RegulateThis',
          siteDescription: 'Expert insights on wealth management, compliance, and practice management for financial advisors.',
          gtmEnabled: false,
          gaEnabled: false,
          metaPixelEnabled: false,
          tenant: defaultTenant.documentId,
        },
        status: 'published',
      });
      console.log('✅ Default site settings created!');
    } else {
      console.log('📋 Site settings already exist, skipping seed.');
    }

    // Seed Sylvian Site Settings
    if (sylvianTenant) {
      const existingSylvianSettings = await strapi.documents('api::site-setting.site-setting').findMany({
        filters: { tenant: { documentId: sylvianTenant.documentId } }
      });

      if (existingSylvianSettings.length === 0) {
        console.log('⚙️ Seeding Sylvian site settings...');
        await strapi.documents('api::site-setting.site-setting').create({
          data: {
            siteName: 'Sylvan',
            siteDescription: 'Structure. Yield. Growth.',
            gtmEnabled: false,
            gaEnabled: false,
            metaPixelEnabled: false,
            tenant: sylvianTenant.documentId,
          },
          status: 'published',
        });
        console.log('✅ Sylvian site settings created!');
      } else {
        console.log('📋 Sylvian site settings already exist, skipping seed.');
      }
    }
  },
};
