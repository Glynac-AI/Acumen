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
