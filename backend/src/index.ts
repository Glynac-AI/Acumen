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

// Seed data for Newsletter Subscribers
const newsletterSubscribersData = [
  {
    email: 'tech.enthusiast@example.com',
    status: 'subscribed',
    source: 'Homepage',
    subscribedAt: '2026-01-15T09:00:00.000Z'
  },
  {
    email: 'news.reader@example.com',
    status: 'subscribed',
    source: 'Article_CTA',
    subscribedAt: '2026-01-16T14:30:00.000Z'
  },
  {
    email: 'blog.follower@example.com',
    status: 'subscribed',
    source: 'Author_CTA',
    subscribedAt: '2026-01-17T11:15:00.000Z'
  },
  {
    email: 'weekly.digest@example.com',
    status: 'subscribed',
    source: 'global_footer',
    subscribedAt: '2026-01-18T16:45:00.000Z'
  },
  {
    email: 'industry.news@example.com',
    status: 'subscribed',
    source: 'Website',
    subscribedAt: '2026-01-19T10:00:00.000Z'
  },
  {
    email: 'content.lover@example.com',
    status: 'subscribed',
    source: 'Homepage',
    subscribedAt: '2026-01-20T13:20:00.000Z'
  },
  {
    email: 'insights.subscriber@example.com',
    status: 'subscribed',
    source: 'Article_CTA',
    subscribedAt: '2026-01-21T08:30:00.000Z'
  },
  {
    email: 'former.subscriber@example.com',
    status: 'unsubscribed',
    source: 'Homepage',
    subscribedAt: '2026-01-10T12:00:00.000Z',
    unsubscribeAt: '2026-01-22T15:00:00.000Z',
    unsubscribeReason: 'Too many emails'
  },
  {
    email: 'market.updates@example.com',
    status: 'subscribed',
    source: 'Website',
    subscribedAt: '2026-01-22T09:00:00.000Z'
  },
  {
    email: 'research.reader@example.com',
    status: 'subscribed',
    source: 'Author_CTA',
    subscribedAt: '2026-01-23T11:30:00.000Z'
  }
];

// Seed data for Tags
const tagsData = [
  'Portfolio Management',
  'SEC Examinations',
  'CRM Systems',
  'Firm Growth',
  'Marketing Rule',
  'Cybersecurity',
  'Client Segmentation',
  'Succession Planning',
  'Compensation Models',
  'Integration',
  'AI in Wealth Management',
  'SEC Audits',
  'RIA Growth',
  'Options Strategies',
  'Covered Calls',
  'FINRA Regulation',
  'Automation',
  'Real Estate Investing',
  'Tax Planning',
  'M&A',
  'Data Integration',
  'Risk Management',
  'Advisor Recruiting',
];

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/* { strapi }: { strapi: Core.Strapi } */) { },

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    // Seed Default Tenant first
    let defaultTenant: any = null;

    try {
      const existingTenants = await strapi.documents('api::tenant.tenant').findMany({
        filters: { slug: 'regulatethis' }
      });

      if (existingTenants.length === 0) {
        console.log('🏢 Seeding default tenant...');
        try {
          defaultTenant = await strapi.documents('api::tenant.tenant').create({
            data: defaultTenantData,
          });
          console.log('✅ Default tenant created!');
        } catch (createError: any) {
          // Handle race condition - another instance may have created it
          if (createError.message?.includes('unique') || createError.name === 'ValidationError') {
            console.log('⚠️ Tenant was created by another process, fetching...');
            const refetchedTenants = await strapi.documents('api::tenant.tenant').findMany({
              filters: { slug: 'regulatethis' }
            });
            defaultTenant = refetchedTenants[0];
          } else {
            throw createError;
          }
        }
      } else {
        defaultTenant = existingTenants[0];
        console.log('📋 Default tenant already exists, skipping seed.');
      }
    } catch (error) {
      console.error('❌ Error seeding tenant:', error);
      // Continue without tenant - allows app to start
    }

    // Seed Pillars (with tenant association)
    const existingPillars = await strapi.documents('api::pillar.pillar').findMany({});

    if (existingPillars.length === 0 && defaultTenant) {
      console.log('🌱 Seeding pillars...');
      for (const pillar of pillarsData) {
        await strapi.documents('api::pillar.pillar').create({
          data: {
            ...pillar,
            tenant: defaultTenant.documentId,
          },
        });
      }
      console.log('✅ Pillars seeded successfully!');
    } else {
      console.log('📋 Pillars already exist, skipping seed.');
    }

    // Seed Tags (with tenant association)
    const existingTags = await strapi.documents('api::tag.tag').findMany({});

    if (existingTags.length === 0 && defaultTenant) {
      console.log('🌱 Seeding tags...');
      for (const tagName of tagsData) {
        const slug = tagName
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '');

        await strapi.documents('api::tag.tag').create({
          data: {
            name: tagName,
            slug: slug,
            tenant: defaultTenant.documentId,
          },
        });
      }
      console.log('✅ Tags seeded successfully!');
    } else {
      console.log('📋 Tags already exist, skipping seed.');
    }
    // Seed Newsletter Subscribers (with tenant association)
    try {
      const existingSubscribers = await strapi.documents('api::newsletter-subscriber.newsletter-subscriber').findMany({});

      if (existingSubscribers.length === 0 && defaultTenant) {
        console.log('📧 Seeding newsletter subscribers...');
        for (const subscriber of newsletterSubscribersData) {
          try {
            await strapi.documents('api::newsletter-subscriber.newsletter-subscriber').create({
              data: {
                ...subscriber,
                tenant: defaultTenant.documentId,
              },
            });
          } catch (subError: any) {
            // Skip duplicate email errors
            if (!subError.message?.includes('unique')) {
              console.error(`⚠️ Failed to create subscriber ${subscriber.email}:`, subError.message);
            }
          }
        }
        console.log('✅ Newsletter subscribers seeded successfully!');
      } else {
        console.log('📋 Newsletter subscribers already exist, skipping seed.');
      }
    } catch (error) {
      console.error('❌ Error seeding newsletter subscribers:', error);
      // Continue - don't block app startup
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
  },
};
