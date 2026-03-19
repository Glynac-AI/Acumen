// @ts-nocheck
export default {
  routes: [
    {
      method: 'POST',
      path: '/wiki-js-contents/:documentId/sync',
      handler: 'api::wiki-js-content.wiki-js-content.syncToWiki',
      config: {
        auth: {
          scope: ['api::wiki-js-content.wiki-js-content.update'],
        },
      },
    },
    {
      method: 'GET',
      path: '/wiki-js-contents/test-connection',
      handler: 'api::wiki-js-content.wiki-js-content.testConnection',
      config: {
        auth: {
          scope: ['api::wiki-js-content.wiki-js-content.find'],
        },
      },
    },
  ],
};
