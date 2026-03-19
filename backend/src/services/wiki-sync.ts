import type { Core } from '@strapi/strapi';

interface WikiSyncConfig {
  enabled: boolean;
  baseUrl: string;
  graphqlUrl: string;
  apiToken: string;
  defaultEditor: string;
  defaultLocale: string;
  defaultPrivate: boolean;
  syncCollections: string[];
}

interface StrapiEntry {
  documentId: string;
  title?: string;
  product?: string;
  persona?: string;
  category?: string;
  owner?: string;
  reviewDate?: string;
  summary?: string;
  body?: string;
  content?: string;
  syncToWiki?: boolean;
  sync_to_wiki?: boolean;
  wikiPath?: string;
  wiki_path?: string;
  wikiTags?: any;
  slug?: string;
  [key: string]: any;
}

const getConfig = (): WikiSyncConfig => {
  return {
    enabled: process.env.WIKI_SYNC_ENABLED === 'true',
    baseUrl: process.env.WIKI_BASE_URL || '',
    graphqlUrl: process.env.WIKI_GRAPHQL_URL || '',
    apiToken: process.env.WIKI_API_TOKEN || '',
    defaultEditor: process.env.WIKI_DEFAULT_EDITOR || 'markdown',
    defaultLocale: process.env.WIKI_DEFAULT_LOCALE || 'en',
    defaultPrivate: process.env.WIKI_DEFAULT_PRIVATE === 'true',
    syncCollections: (process.env.WIKI_SYNC_COLLECTIONS || '')
      .split(',')
      .map(c => c.trim())
      .filter(Boolean),
  };
};

/**
 * Validates Wiki.js configuration and logs detailed errors
 * Returns true if config is valid, false otherwise
 */
const validateConfig = (config: WikiSyncConfig, context: string): boolean => {
  if (!config.enabled) {
    console.warn(`[wiki-sync] ${context}: WIKI_SYNC_ENABLED=false, sync disabled`);
    return false;
  }

  const errors: string[] = [];
  
  if (!config.apiToken) {
    errors.push('WIKI_API_TOKEN is missing or empty');
  }
  
  if (!config.graphqlUrl) {
    errors.push('WIKI_GRAPHQL_URL is missing or empty');
  }
  
  if (!config.baseUrl) {
    errors.push('WIKI_BASE_URL is missing or empty');
  }

  if (errors.length > 0) {
    console.error(`[wiki-sync] ${context}: Configuration errors:`, errors);
    console.error('[wiki-sync] Set these environment variables:', {
      WIKI_SYNC_ENABLED: config.enabled,
      WIKI_BASE_URL: config.baseUrl || 'MISSING',
      WIKI_GRAPHQL_URL: config.graphqlUrl || 'MISSING',
      WIKI_API_TOKEN: config.apiToken ? 'SET (hidden)' : 'MISSING',
    });
    return false;
  }

  return true;
};

const normalizePath = (path: string): string => {
  if (!path) return '';
  let normalized = path.trim().toLowerCase();
  
  // Replace spaces and invalid characters with hyphens
  normalized = normalized.replace(/[^a-z0-9-\/]/g, '-');
  
  // Remove multiple consecutive hyphens or slashes
  normalized = normalized.replace(/-+/g, '-').replace(/\/+/g, '/');
  
  // Ensure it starts with a slash
  if (!normalized.startsWith('/')) {
    normalized = '/' + normalized;
  }
  
  return normalized;
};

const renderMarkdown = (entry: StrapiEntry): string => {
  const safeText = (text: any) => {
    if (!text) return '';
    return String(text).replace(/</g, '&lt;').replace(/>/g, '&gt;');
  };

  const title = safeText(entry.title || entry.name || 'Untitled');
  const product = safeText(entry.product || 'N/A');
  const persona = safeText(entry.persona || 'N/A');
  const category = safeText(entry.category || 'N/A');
  const owner = safeText(entry.owner || 'Unknown');
  const reviewDate = safeText(entry.reviewDate || 'N/A');
  const summary = safeText(entry.summary || '');
  const body = entry.body ? String(entry.body) : '';

  return `# ${title}

> Product: ${product}
> Persona: ${persona}
> Category: ${category}
> Owner: ${owner}
> Review Date: ${reviewDate}

## Summary
${summary}

## Content
${body}`;
};

const wikiGraphQLRequest = async (query: string, variables: any, config: WikiSyncConfig, retries = 2): Promise<any> => {
  if (!config.apiToken || !config.graphqlUrl) {
    throw new Error('Wiki.js API token or GraphQL URL is missing');
  }

  try {
    const response = await fetch(config.graphqlUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${config.apiToken}`,
      },
      body: JSON.stringify({ query, variables }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`[wiki-sync] HTTP Error ${response.status}:`, errorText);
      throw new Error(`HTTP error! status: ${response.status}, body: ${errorText}`);
    }

    const data = await response.json() as { data?: any, errors?: any };
    
    if (data.errors) {
      console.error('[wiki-sync] GraphQL Errors:', JSON.stringify(data.errors, null, 2));
      throw new Error(`GraphQL Error: ${JSON.stringify(data.errors)}`);
    }

    return data;
  } catch (error) {
    if (retries > 0) {
      console.warn(`[wiki-sync] GraphQL request failed, retrying... (${retries} attempts left)`);
      console.warn('[wiki-sync] Error details:', error);
      await new Promise(resolve => setTimeout(resolve, 1000));
      return wikiGraphQLRequest(query, variables, config, retries - 1);
    }
    console.error('[wiki-sync] All retry attempts exhausted. Final error:', error);
    throw error;
  }
};

const checkPageExists = async (path: string, locale: string, config: WikiSyncConfig): Promise<number | null> => {
  // Wiki.js GraphQL API doesn't support querying by path directly in single()
  // We must list all pages and find by path match
  const query = `
    query {
      pages {
        list {
          id
          path
          locale
        }
      }
    }
  `;

  try {
    const response = await wikiGraphQLRequest(query, {}, config);
    const pages = response?.data?.pages?.list || [];
    
    // Normalize paths for comparison (remove leading/trailing slashes)
    const normalizedSearchPath = path.replace(/^\/+|\/+$/g, '');
    
    const match = pages.find((p: any) => {
      const normalizedPagePath = p.path.replace(/^\/+|\/+$/g, '');
      return normalizedPagePath === normalizedSearchPath && p.locale === locale;
    });
    
    if (match) {
      console.log(`[wiki-sync] Found existing page: ${path} (id=${match.id})`);
    }
    
    return match?.id || null;
  } catch (error) {
    console.error(`[wiki-sync] Error checking if page exists at ${path}:`, error);
    return null;
  }
};

const createOrUpdatePage = async (entry: StrapiEntry, collectionName: string) => {
  const config = getConfig();
  if (!config.enabled) return;
  
  const isSyncableCollection = config.syncCollections.some(
    collection => collectionName.includes(collection)
  );
  if (!isSyncableCollection) return;
  if (entry.syncToWiki === false) return;

  const slug = entry.slug || entry.documentId;
  const rawPath = entry.wikiPath || `/knowledge/${collectionName.split('.').pop()}/${slug}`;
  const path = normalizePath(rawPath);
  
  console.log(`[wiki-sync] syncing page ${path}`);

  try {
    const content = renderMarkdown(entry);
    const tags = Array.isArray(entry.wikiTags) ? entry.wikiTags : [];
    const existingPageId = await checkPageExists(path, config.defaultLocale, config);

    if (existingPageId) {
      const updateQuery = `
        mutation ($id: Int!, $content: String!, $description: String, $editor: String, $isPrivate: Boolean, $locale: String, $path: String, $published: Boolean, $tags: [String], $title: String!) {
          pages {
            update(id: $id, content: $content, description: $description, editor: $editor, isPrivate: $isPrivate, locale: $locale, path: $path, published: $published, tags: $tags, title: $title) {
              responseResult { succeeded errorCode slug message }
            }
          }
        }
      `;
      const variables = {
        id: existingPageId, content, description: entry.summary || '',
        editor: config.defaultEditor, isPrivate: config.defaultPrivate,
        locale: config.defaultLocale, path, published: true, tags,
        title: entry.title || entry.name || 'Untitled',
      };
      const result = await wikiGraphQLRequest(updateQuery, variables, config);
      if (result.data?.pages?.update?.responseResult?.succeeded) {
        console.log(`[wiki-sync] page updated: ${path}`);
      } else {
        console.error(`[wiki-sync] failed to update page ${path}:`, result.data?.pages?.update?.responseResult);
      }
    } else {
      const createQuery = `
        mutation ($content: String!, $description: String!, $editor: String!, $isPrivate: Boolean!, $isPublished: Boolean!, $locale: String!, $path: String!, $tags: [String]!, $title: String!) {
          pages {
            create(content: $content, description: $description, editor: $editor, isPrivate: $isPrivate, isPublished: $isPublished, locale: $locale, path: $path, tags: $tags, title: $title) {
              responseResult { succeeded errorCode slug message }
              page { id }
            }
          }
        }
      `;
      const variables = {
        content, description: entry.summary || '',
        editor: config.defaultEditor, isPrivate: config.defaultPrivate,
        isPublished: true, locale: config.defaultLocale, path, tags,
        title: entry.title || entry.name || 'Untitled',
      };
      const result = await wikiGraphQLRequest(createQuery, variables, config);
      if (result.data?.pages?.create?.responseResult?.succeeded) {
        console.log(`[wiki-sync] page created: ${path}`);
      } else {
        console.error(`[wiki-sync] failed to create page ${path}:`, result.data?.pages?.create?.responseResult);
      }
    }
  } catch (error) {
    console.error(`[wiki-sync] error during sync for ${path}:`, error);
  }
};

const deletePage = async (entry: StrapiEntry, collectionName: string) => {
  const config = getConfig();
  if (!config.enabled) return;

  const isSyncableCollection = config.syncCollections.some(
    collection => collectionName.includes(collection)
  );
  if (!isSyncableCollection) return;

  const slug = entry.slug || entry.documentId;
  const rawPath = entry.wikiPath || `/knowledge/${collectionName.split('.').pop()}/${slug}`;
  const path = normalizePath(rawPath);

  try {
    const existingPageId = await checkPageExists(path, config.defaultLocale, config);
    if (existingPageId) {
      const deleteQuery = `
        mutation ($id: Int!) {
          pages {
            delete(id: $id) {
              responseResult { succeeded errorCode slug message }
            }
          }
        }
      `;
      const result = await wikiGraphQLRequest(deleteQuery, { id: existingPageId }, config);
      if (result.data?.pages?.delete?.responseResult?.succeeded) {
        console.log(`[wiki-sync] page deleted: ${path}`);
      } else {
        console.error(`[wiki-sync] failed to delete page ${path}:`, result.data?.pages?.delete?.responseResult);
      }
    }
  } catch (error) {
    console.error(`[wiki-sync] error deleting page ${path}:`, error);
  }
};

// ─── Dedicated sync for api::wiki-js-content.wiki-js-content ────────────────
const WIKI_JS_CONTENT_UID = 'api::wiki-js-content.wiki-js-content';

const renderWikiJsContentMarkdown = (entry: StrapiEntry): string => {
  const title = entry.title || 'Untitled';
  const summary = entry.summary || '';
  const body = entry.body ? String(entry.body) : '';
  const syncTimestamp = new Date().toLocaleString('en-US', { timeZone: 'UTC' });
  const strapiBaseUrl = process.env.PUBLIC_STRAPI_URL || process.env.STRAPI_URL || 'https://your-strapi-url';

  let md = `# ${title}\n\n`;
  md += `[[toc]]\n\n---\n\n`;
  md += `> 📘 **Source:** Managed in [Strapi](${strapiBaseUrl})\n`;
  md += `> **Last Sync:** ${syncTimestamp} UTC\n\n`;
  if (summary) { md += `## Summary\n\n${summary}\n\n`; }
  md += `## Content\n\n${body}\n\n`;
  md += `---\n\n_Internal Document - Glynac Ops_\n`;
  return md;
};

// ─── Dedicated renderers for new knowledge system types ─────────────────────

const renderPlaybookMarkdown = (entry: StrapiEntry): string => {
  const title = entry.title || 'Untitled';
  const summary = entry.summary || '';
  const body = entry.body ? String(entry.body) : '';
  const syncTimestamp = new Date().toLocaleString('en-US', { timeZone: 'UTC' });
  const strapiBaseUrl = process.env.PUBLIC_STRAPI_URL || process.env.STRAPI_URL || 'https://your-strapi-url';
  const safeText = (text: any) => text ? String(text) : 'N/A';

  let md = `# ${title}\n\n`;
  md += `[[toc]]\n\n---\n\n`;
  md += `> 📗 **Playbook** — Managed in [Strapi](${strapiBaseUrl})\n`;
  md += `> **Last Sync:** ${syncTimestamp} UTC\n\n`;
  md += `| Field | Value |\n|-------|-------|\n`;
  md += `| Product | ${safeText(entry.product)} |\n`;
  md += `| Persona | ${safeText(entry.persona)} |\n`;
  md += `| Category | ${safeText(entry.category)} |\n`;
  md += `| Owner | ${safeText(entry.owner)} |\n`;
  md += `| Review Date | ${safeText(entry.reviewDate)} |\n`;
  md += `| Priority | ${safeText(entry.priority)} |\n`;
  md += `| Status | ${safeText(entry.status)} |\n\n`;
  if (summary) { md += `## Summary\n\n${summary}\n\n`; }
  md += `## Procedure\n\n${body}\n\n`;
  md += `---\n\n_Internal Playbook - Glynac Ops_\n`;
  return md;
};

const renderPlaybookPageMarkdown = (entry: StrapiEntry): string => {
  const title = entry.title || 'Untitled';
  const summary = entry.summary || '';
  const body = entry.content ? String(entry.content) : '';
  const syncTimestamp = new Date().toLocaleString('en-US', { timeZone: 'UTC' });
  const strapiBaseUrl = process.env.PUBLIC_STRAPI_URL || process.env.STRAPI_URL || 'https://your-strapi-url';
  const safeText = (text: any) => text ? String(text) : 'N/A';

  let md = `# ${title}\n\n`;
  md += `[[toc]]\n\n---\n\n`;
  md += `> 📕 **Playbook Page** — Managed in [Strapi](${strapiBaseUrl})\n`;
  md += `> **Last Sync:** ${syncTimestamp} UTC\n\n`;
  md += `| Field | Value |\n|-------|-------|\n`;
  md += `| Product | ${safeText(entry.product)} |\n`;
  md += `| Section | ${safeText(entry.section)} |\n`;
  md += `| Approval | ${safeText(entry.approval_status)} |\n`;
  md += `| Owner | ${safeText(entry.content_owner)} |\n`;
  md += `| Last Reviewed | ${safeText(entry.last_reviewed)} |\n`;
  md += `| Review Cadence | ${safeText(entry.review_cadence)} |\n\n`;
  if (summary) { md += `## Summary\n\n${summary}\n\n`; }
  md += `## Content\n\n${body}\n\n`;
  md += `---\n\n_Internal Playbook Page - Glynac Ops_\n`;
  return md;
};

const renderKnowledgeBaseMarkdown = (entry: StrapiEntry): string => {
  const title = entry.title || 'Untitled';
  const summary = entry.summary || '';
  const body = entry.body ? String(entry.body) : '';
  const syncTimestamp = new Date().toLocaleString('en-US', { timeZone: 'UTC' });
  const strapiBaseUrl = process.env.PUBLIC_STRAPI_URL || process.env.STRAPI_URL || 'https://your-strapi-url';
  const safeText = (text: any) => text ? String(text) : 'N/A';

  let md = `# ${title}\n\n`;
  md += `[[toc]]\n\n---\n\n`;
  md += `> 📘 **Knowledge Base** — Managed in [Strapi](${strapiBaseUrl})\n`;
  md += `> **Last Sync:** ${syncTimestamp} UTC\n\n`;
  md += `| Field | Value |\n|-------|-------|\n`;
  md += `| Product | ${safeText(entry.product)} |\n`;
  md += `| Persona | ${safeText(entry.persona)} |\n`;
  md += `| Category | ${safeText(entry.category)} |\n`;
  md += `| Owner | ${safeText(entry.owner)} |\n`;
  md += `| Review Date | ${safeText(entry.reviewDate)} |\n`;
  md += `| Confidentiality | ${safeText(entry.confidentiality)} |\n\n`;
  if (summary) { md += `## Summary\n\n${summary}\n\n`; }
  md += `## Content\n\n${body}\n\n`;
  md += `---\n\n_Internal Knowledge Base - Glynac Ops_\n`;
  return md;
};

const renderRawMaterialMarkdown = (entry: StrapiEntry): string => {
  const title = entry.title || 'Untitled';
  const notes = entry.notes ? String(entry.notes) : '';
  const syncTimestamp = new Date().toLocaleString('en-US', { timeZone: 'UTC' });
  const strapiBaseUrl = process.env.PUBLIC_STRAPI_URL || process.env.STRAPI_URL || 'https://your-strapi-url';
  const safeText = (text: any) => text ? String(text) : 'N/A';

  let md = `# ${title}\n\n`;
  md += `[[toc]]\n\n---\n\n`;
  md += `> 📙 **Raw Material** — Managed in [Strapi](${strapiBaseUrl})\n`;
  md += `> **Last Sync:** ${syncTimestamp} UTC\n\n`;
  md += `| Field | Value |\n|-------|-------|\n`;
  md += `| Type | ${safeText(entry.type)} |\n`;
  md += `| Product | ${safeText(entry.product)} |\n`;
  md += `| Date | ${safeText(entry.date)} |\n`;
  md += `| Processed | ${entry.processed ? 'Yes' : 'No'} |\n`;
  if (entry.external_url) {
    md += `| External URL | [Link](${entry.external_url}) |\n`;
  }
  md += `\n`;
  if (notes) { md += `## Notes\n\n${notes}\n\n`; }
  if (entry.sections_to_update && Array.isArray(entry.sections_to_update) && entry.sections_to_update.length > 0) {
    md += `## Sections to Update\n\n`;
    for (const section of entry.sections_to_update) {
      md += `- ${section}\n`;
    }
    md += `\n`;
  }
  md += `---\n\n_Internal Raw Material - Glynac Ops_\n`;
  return md;
};

// ─── Tier 3: Delete a Wiki.js page by its stored integer ID ─────────────────
const deletePageById = async (wikiPageId: number): Promise<void> => {
  const config = getConfig();
  if (!config.enabled) return;

  const deleteMutation = `
    mutation($id: Int!) {
      pages {
        delete(id: $id) {
          responseResult { succeeded message }
        }
      }
    }
  `;

  try {
    const result = await wikiGraphQLRequest(deleteMutation, { id: wikiPageId }, config);
    if (result?.data?.pages?.delete?.responseResult?.succeeded) {
      console.log(`[wiki-sync] page deleted (wikiPageId=${wikiPageId})`);
    } else {
      console.error(`[wiki-sync] delete failed (wikiPageId=${wikiPageId}):`, result?.data?.pages?.delete?.responseResult);
    }
  } catch (err) {
    console.error(`[wiki-sync] error deleting page (wikiPageId=${wikiPageId}):`, err);
  }
};

// ─── Tier 1: Sync wiki-js-content with status write-back ───────────────────
const syncWikiJsContent = async (entry: StrapiEntry, strapiInstance?: any): Promise<void> => {
  if (!entry || entry.syncToWiki !== true) return;

  const config = getConfig();
  
  // Validate configuration
  if (!validateConfig(config, 'syncWikiJsContent')) {
    // Write error status back to Strapi if possible
    if (strapiInstance && entry.id) {
      try {
        await strapiInstance.db.query(WIKI_JS_CONTENT_UID).update({
          where: { id: entry.id },
          data: { 
            lastSyncStatus: 'failed',
            lastSyncError: 'Wiki.js sync is disabled or misconfigured. Check environment variables.',
          },
        });
      } catch (err) {
        console.error('[wiki-sync] Failed to write config error status:', err);
      }
    }
    return;
  }

  const writeStatus = async (status: 'success' | 'failed' | 'pending', extra: Record<string, any> = {}) => {
    if (!strapiInstance || !entry.id) return;
    try {
      await strapiInstance.db.query(WIKI_JS_CONTENT_UID).update({
        where: { id: entry.id },
        data: { lastSyncStatus: status, ...extra },
      });
    } catch (dbErr) {
      console.error('[wiki-sync] failed to write sync status back to Strapi:', dbErr);
    }
  };

  const slug = entry.slug || entry.documentId;
  const rawPath = entry.wikiPath || `/wiki-js-content/${slug}`;
  const path = rawPath.startsWith('/') ? rawPath : `/${rawPath}`;

  const content = renderWikiJsContentMarkdown(entry);
  const description = entry.summary || '';
  const tags: string[] = entry.wikiTags
    ? String(entry.wikiTags).split(',').map((t: string) => t.trim()).filter(Boolean)
    : [];
  const title = entry.title || 'Untitled';

  await writeStatus('pending', { lastSyncError: null });

  try {
    const storedPageId: number | null = entry.wikiPageId || null;
    const existingId = storedPageId || await checkPageExists(path, config.defaultLocale, config);
    let returnedPageId: number | null = null;

    if (existingId) {
      const updateMutation = `
        mutation($id:Int!,$content:String!,$description:String!,$editor:String!,$isPrivate:Boolean!,$locale:String!,$path:String!,$tags:[String]!,$title:String!,$isPublished:Boolean!){
          pages{update(id:$id,content:$content,description:$description,editor:$editor,isPrivate:$isPrivate,locale:$locale,path:$path,tags:$tags,title:$title,isPublished:$isPublished){
            responseResult{succeeded message}
          }}
        }
      `;
      const result = await wikiGraphQLRequest(updateMutation, {
        id: existingId, content, description,
        editor: config.defaultEditor, isPrivate: config.defaultPrivate,
        locale: config.defaultLocale, path, tags, title, isPublished: true,
      }, config);

      if (!result?.data?.pages?.update?.responseResult?.succeeded) {
        throw new Error(result?.data?.pages?.update?.responseResult?.message || 'Wiki.js update mutation failed');
      }
      returnedPageId = existingId;
      console.log(`[wiki-sync] wiki-js-content updated: ${path}`);
    } else {
      const createMutation = `
        mutation($content:String!,$description:String!,$editor:String!,$isPrivate:Boolean!,$isPublished:Boolean!,$locale:String!,$path:String!,$tags:[String]!,$title:String!){
          pages{create(content:$content,description:$description,editor:$editor,isPrivate:$isPrivate,isPublished:$isPublished,locale:$locale,path:$path,tags:$tags,title:$title){
            responseResult{succeeded message}
            page{id}
          }}
        }
      `;
      const result = await wikiGraphQLRequest(createMutation, {
        content, description,
        editor: config.defaultEditor, isPrivate: config.defaultPrivate,
        isPublished: true, locale: config.defaultLocale, path, tags, title,
      }, config);

      if (!result?.data?.pages?.create?.responseResult?.succeeded) {
        throw new Error(result?.data?.pages?.create?.responseResult?.message || 'Wiki.js create mutation failed');
      }
      returnedPageId = result?.data?.pages?.create?.page?.id || null;
      console.log(`[wiki-sync] wiki-js-content created: ${path} (wikiPageId=${returnedPageId})`);
    }

    await writeStatus('success', {
      lastSyncedAt: new Date(),
      lastSyncError: null,
      ...(returnedPageId !== null ? { wikiPageId: returnedPageId } : {}),
    });
  } catch (err: any) {
    const errorMessage = err?.message || String(err);
    console.error(`[wiki-sync] error syncing wiki-js-content at ${path}:`, errorMessage);
    await writeStatus('failed', { lastSyncError: errorMessage });
  }
};

// ─── Dedicated sync for new knowledge system types ──────────────────────────
const DEDICATED_SYNC_UIDS = {
  PLAYBOOK:       'api::playbook.playbook',
  PLAYBOOK_PAGE:  'api::playbook-page.playbook-page',
  KNOWLEDGE_BASE: 'api::knowledge-base.knowledge-base',
  RAW_MATERIAL:   'api::raw-material.raw-material',
} as const;

type DedicatedSyncUid = typeof DEDICATED_SYNC_UIDS[keyof typeof DEDICATED_SYNC_UIDS];

const RENDERERS: Record<DedicatedSyncUid, (entry: StrapiEntry) => string> = {
  [DEDICATED_SYNC_UIDS.PLAYBOOK]:       renderPlaybookMarkdown,
  [DEDICATED_SYNC_UIDS.PLAYBOOK_PAGE]:  renderPlaybookPageMarkdown,
  [DEDICATED_SYNC_UIDS.KNOWLEDGE_BASE]: renderKnowledgeBaseMarkdown,
  [DEDICATED_SYNC_UIDS.RAW_MATERIAL]:   renderRawMaterialMarkdown,
};

const DEFAULT_PATH_PREFIXES: Record<DedicatedSyncUid, string> = {
  [DEDICATED_SYNC_UIDS.PLAYBOOK]:       '/playbook',
  [DEDICATED_SYNC_UIDS.PLAYBOOK_PAGE]:  '/playbook-page',
  [DEDICATED_SYNC_UIDS.KNOWLEDGE_BASE]: '/knowledge-base',
  [DEDICATED_SYNC_UIDS.RAW_MATERIAL]:   '/raw-material',
};

const syncDedicatedContent = async (
  entry: StrapiEntry,
  uid: DedicatedSyncUid,
  strapiInstance?: any,
): Promise<void> => {
  const wantSync = entry.syncToWiki === true || entry.sync_to_wiki === true;
  if (!entry || !wantSync) return;

  // playbook-page has an additional approval gate
  if (uid === DEDICATED_SYNC_UIDS.PLAYBOOK_PAGE) {
    if (entry.approval_status !== 'live' && entry.approval_status !== 'approved') return;
  }

  const config = getConfig();
  
  // Validate configuration
  if (!validateConfig(config, `syncDedicatedContent:${uid}`)) {
    // Write error status back to Strapi if possible
    if (strapiInstance && entry.id) {
      try {
        await strapiInstance.db.query(uid).update({
          where: { id: entry.id },
          data: { 
            lastSyncStatus: 'failed',
            lastSyncError: 'Wiki.js sync is disabled or misconfigured. Check environment variables.',
          },
        });
      } catch (err) {
        console.error(`[wiki-sync] Failed to write config error status for ${uid}:`, err);
      }
    }
    return;
  }

  const writeStatus = async (status: 'success' | 'failed' | 'pending', extra: Record<string, any> = {}) => {
    if (!strapiInstance || !entry.id) return;
    try {
      await strapiInstance.db.query(uid).update({
        where: { id: entry.id },
        data: { lastSyncStatus: status, ...extra },
      });
    } catch (dbErr) {
      console.error(`[wiki-sync] failed to write sync status back to Strapi for ${uid}:`, dbErr);
    }
  };

  const slug = entry.slug || entry.documentId;
  const pathPrefix = DEFAULT_PATH_PREFIXES[uid];
  const rawPath = entry.wikiPath || entry.wiki_path || `${pathPrefix}/${slug}`;
  const path = rawPath.startsWith('/') ? rawPath : `/${rawPath}`;

  const renderer = RENDERERS[uid];
  const content = renderer(entry);
  const description = entry.summary || entry.notes || '';
  const tags: string[] = entry.wikiTags
    ? String(entry.wikiTags).split(',').map((t: string) => t.trim()).filter(Boolean)
    : Array.isArray(entry.tags) ? entry.tags.map(String)
    : [];
  const title = entry.title || 'Untitled';

  await writeStatus('pending', { lastSyncError: null });

  try {
    const storedPageId: number | null = entry.wikiPageId || null;
    const existingId = storedPageId || await checkPageExists(path, config.defaultLocale, config);
    let returnedPageId: number | null = null;

    if (existingId) {
      const updateMutation = `
        mutation($id:Int!,$content:String!,$description:String!,$editor:String!,$isPrivate:Boolean!,$locale:String!,$path:String!,$tags:[String]!,$title:String!,$isPublished:Boolean!){
          pages{update(id:$id,content:$content,description:$description,editor:$editor,isPrivate:$isPrivate,locale:$locale,path:$path,tags:$tags,title:$title,isPublished:$isPublished){
            responseResult{succeeded message}
          }}
        }
      `;
      const result = await wikiGraphQLRequest(updateMutation, {
        id: existingId, content, description,
        editor: config.defaultEditor, isPrivate: config.defaultPrivate,
        locale: config.defaultLocale, path, tags, title, isPublished: true,
      }, config);

      if (!result?.data?.pages?.update?.responseResult?.succeeded) {
        throw new Error(result?.data?.pages?.update?.responseResult?.message || 'Wiki.js update failed');
      }
      returnedPageId = existingId;
      console.log(`[wiki-sync] ${uid} updated: ${path}`);
    } else {
      const createMutation = `
        mutation($content:String!,$description:String!,$editor:String!,$isPrivate:Boolean!,$isPublished:Boolean!,$locale:String!,$path:String!,$tags:[String]!,$title:String!){
          pages{create(content:$content,description:$description,editor:$editor,isPrivate:$isPrivate,isPublished:$isPublished,locale:$locale,path:$path,tags:$tags,title:$title){
            responseResult{succeeded message}
            page{id}
          }}
        }
      `;
      const result = await wikiGraphQLRequest(createMutation, {
        content, description,
        editor: config.defaultEditor, isPrivate: config.defaultPrivate,
        isPublished: true, locale: config.defaultLocale, path, tags, title,
      }, config);

      if (!result?.data?.pages?.create?.responseResult?.succeeded) {
        throw new Error(result?.data?.pages?.create?.responseResult?.message || 'Wiki.js create failed');
      }
      returnedPageId = result?.data?.pages?.create?.page?.id || null;
      console.log(`[wiki-sync] ${uid} created: ${path} (wikiPageId=${returnedPageId})`);
    }

    await writeStatus('success', {
      lastSyncedAt: new Date(),
      lastSyncError: null,
      ...(returnedPageId !== null ? { wikiPageId: returnedPageId } : {}),
    });
  } catch (err: any) {
    const errorMessage = err?.message || String(err);
    console.error(`[wiki-sync] error syncing ${uid} at ${path}:`, errorMessage);
    await writeStatus('failed', { lastSyncError: errorMessage });
  }
};

export const wikiSyncService = {
  createOrUpdatePage,
  deletePage,
  syncWikiJsContent,
  deletePageById,
  syncDedicatedContent,
  DEDICATED_SYNC_UIDS,
  renderMarkdown,
  renderWikiJsContentMarkdown,
  renderPlaybookMarkdown,
  renderPlaybookPageMarkdown,
  renderKnowledgeBaseMarkdown,
  renderRawMaterialMarkdown,
  normalizePath,
  wikiGraphQLRequest,
};

export default wikiSyncService;
