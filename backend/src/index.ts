import type { Core } from '@strapi/strapi';

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
    // Seed Pillars
    const existingPillars = await strapi.documents('api::pillar.pillar').findMany({});

    if (existingPillars.length === 0) {
      console.log('🌱 Seeding pillars...');
      for (const pillar of pillarsData) {
        await strapi.documents('api::pillar.pillar').create({
          data: pillar,
        });
      }
      console.log('✅ Pillars seeded successfully!');
    } else {
      console.log('📋 Pillars already exist, skipping seed.');
    }

    // Seed Tags
    const existingTags = await strapi.documents('api::tag.tag').findMany({});

    if (existingTags.length === 0) {
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
          },
        });
      }
      console.log('✅ Tags seeded successfully!');
    } else {
      console.log('📋 Tags already exist, skipping seed.');
    }
  },
};
