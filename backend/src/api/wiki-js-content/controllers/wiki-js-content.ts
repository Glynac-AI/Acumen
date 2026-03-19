import { factories } from '@strapi/strapi';
import wikiSyncService from '../../../services/wiki-sync';

export default factories.createCoreController(
  'api::wiki-js-content.wiki-js-content' as any,
  ({ strapi }) => ({
    
    /**
     * Manual sync trigger for a specific wiki-js-content entry
     * POST /api/wiki-js-contents/:documentId/sync
     */
    async syncToWiki(ctx) {
      const { documentId } = ctx.params;
      
      try {
        // Fetch the entry using Document Service
        const entry = await strapi.documents('api::wiki-js-content.wiki-js-content').findOne({
          documentId: documentId,
        });
        
        if (!entry) {
          return ctx.notFound('Wiki JS Content entry not found');
        }

        // Check if sync is enabled
        if (entry.syncToWiki !== true) {
          return ctx.badRequest('syncToWiki is not enabled for this entry');
        }

        // Trigger sync
        console.log(`[wiki-sync] Manual sync triggered for: ${entry.title}`);
        await wikiSyncService.syncWikiJsContent(entry as any, strapi);
        
        // Fetch updated entry to get sync status
        const updatedEntry = await strapi.documents('api::wiki-js-content.wiki-js-content').findOne({
          documentId: documentId,
        });

        return ctx.send({
          success: true,
          message: 'Sync triggered successfully',
          syncStatus: {
            lastSyncStatus: updatedEntry.lastSyncStatus,
            lastSyncedAt: updatedEntry.lastSyncedAt,
            lastSyncError: updatedEntry.lastSyncError,
            wikiPageId: updatedEntry.wikiPageId,
          },
        });
      } catch (error) {
        console.error('[wiki-sync] Manual sync error:', error);
        return ctx.badRequest('Sync failed', { 
          error: error.message,
          details: error.toString(),
        });
      }
    },

    /**
     * Test Wiki.js connectivity and configuration
     * GET /api/wiki-js-contents/test-connection
     */
    async testConnection(ctx) {
      try {
        const config = {
          enabled: process.env.WIKI_SYNC_ENABLED === 'true',
          baseUrl: process.env.WIKI_BASE_URL || '',
          graphqlUrl: process.env.WIKI_GRAPHQL_URL || '',
          apiToken: process.env.WIKI_API_TOKEN || '',
          defaultEditor: process.env.WIKI_DEFAULT_EDITOR || 'markdown',
          defaultLocale: process.env.WIKI_DEFAULT_LOCALE || 'en',
          defaultPrivate: process.env.WIKI_DEFAULT_PRIVATE === 'true',
          syncCollections: [],
        };

        // Check if sync is enabled
        if (!config.enabled) {
          return ctx.send({ 
            status: 'disabled',
            message: 'WIKI_SYNC_ENABLED is not set to "true"',
            config: {
              WIKI_SYNC_ENABLED: process.env.WIKI_SYNC_ENABLED,
              WIKI_BASE_URL: config.baseUrl ? '✓ Set' : '✗ Missing',
              WIKI_GRAPHQL_URL: config.graphqlUrl ? '✓ Set' : '✗ Missing',
              WIKI_API_TOKEN: config.apiToken ? '✓ Set' : '✗ Missing',
            },
          });
        }

        // Check required fields
        const missing = [];
        if (!config.apiToken) missing.push('WIKI_API_TOKEN');
        if (!config.graphqlUrl) missing.push('WIKI_GRAPHQL_URL');
        if (!config.baseUrl) missing.push('WIKI_BASE_URL');

        if (missing.length > 0) {
          return ctx.badRequest('Missing required configuration', {
            missing,
            config: {
              WIKI_SYNC_ENABLED: config.enabled,
              WIKI_BASE_URL: config.baseUrl ? '✓ Set' : '✗ Missing',
              WIKI_GRAPHQL_URL: config.graphqlUrl ? '✓ Set' : '✗ Missing',
              WIKI_API_TOKEN: config.apiToken ? '✓ Set' : '✗ Missing',
            },
          });
        }

        // Test GraphQL connection
        const testQuery = `
          query {
            pages {
              list {
                id
                title
                path
              }
            }
          }
        `;

        const result = await wikiSyncService.wikiGraphQLRequest(
          testQuery,
          {},
          config as any
        );

        const pageCount = result?.data?.pages?.list?.length || 0;

        return ctx.send({
          status: 'connected',
          message: 'Successfully connected to Wiki.js',
          wikiUrl: config.baseUrl,
          graphqlUrl: config.graphqlUrl,
          pages: {
            total: pageCount,
            sample: result?.data?.pages?.list?.slice(0, 5) || [],
          },
          config: {
            editor: config.defaultEditor,
            locale: config.defaultLocale,
            private: config.defaultPrivate,
          },
        });
      } catch (error) {
        console.error('[wiki-sync] Connection test failed:', error);
        return ctx.badRequest('Connection test failed', { 
          error: error.message,
          details: error.toString(),
          hint: 'Check that WIKI_GRAPHQL_URL and WIKI_API_TOKEN are correct',
        });
      }
    },
  })
);
