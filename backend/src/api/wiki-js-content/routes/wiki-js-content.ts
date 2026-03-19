import { factories } from '@strapi/strapi';

// Create default routes
const defaultRoutes = factories.createCoreRouter('api::wiki-js-content.wiki-js-content' as any);

// Add custom routes
const customRoutes = {
  routes: [
    {
      method: 'POST',
      path: '/wiki-js-contents/:documentId/sync',
      handler: 'wiki-js-content.syncToWiki',
      config: {
        auth: {
          scope: ['api::wiki-js-content.wiki-js-content.update'],
        },
      },
    },
    {
      method: 'GET',
      path: '/wiki-js-contents/test-connection',
      handler: 'wiki-js-content.testConnection',
      config: {
        auth: {
          scope: ['api::wiki-js-content.wiki-js-content.find'],
        },
      },
    },
  ],
};

export default {
  routes: [
    ...defaultRoutes.routes,
    ...customRoutes.routes,
  ],
};
