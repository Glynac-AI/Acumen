# Strapi CMS Backend

Headless Strapi CMS (v5) for the Acumen multi-tenant blog platform with Knowledge Management System and Wiki.js integration.

## Architecture Overview

### Multi-Tenant System
- **3 Tenants**: RegulateThis, Glynac AI, Sylvan
- **Tenant Resolution**: User → Headers (X-Tenant-Domain, X-Tenant-Slug) → Origin → Referer
- **Data Isolation**: All queries filtered by tenant
- **Admin RBAC**: Per-tenant roles with content type filtering

### Key Files
- `src/index.ts` - Bootstrap, seeding, permissions
- `src/services/wiki-sync.ts` - Wiki.js GraphQL integration
- `src/middlewares/tenant-context.ts` - Tenant resolution
- `src/middlewares/admin-tenant-filter.ts` - Admin RBAC
- `src/policies/is-tenant-scoped.ts` - API tenant scoping

## Content Types

### Legacy
| Type | Tenant | Description |
|------|--------|-------------|
| Article | RegulateThis | Rich articles with pillars, categories, tags |
| Blog Post | Glynac AI | Simple blog posts |
| Pillar | RegulateThis | Content pillars |
| Category/Subcategory/Tag | All | Organization |
| Author | Shared | Multi-tenant authors |
| Site Setting | All | Per-tenant config |

### New Knowledge System
| Type | Description | Wiki Sync |
|------|-------------|-----------|
| Playbook | SOPs, procedures, workflows | Opt-in |
| Playbook Page | Live knowledge (approval workflow) | Approval-gated |
| Knowledge Base | Reference docs, FAQs | Opt-in |
| Raw Material | Source materials, research | Opt-in |
| Wiki JS Content | Direct Wiki.js management | Opt-in |

All knowledge types include: syncToWiki, wikiPath, wikiTags, lastSyncedAt, lastSyncStatus, lastSyncError, wikiPageId

## Wiki.js Integration

### How It Works
1. Document Service Middleware intercepts all CRUD operations
2. Routes to appropriate handler based on content type
3. Renders custom markdown for each type
4. Syncs via Wiki.js GraphQL API
5. Writes status back to Strapi (bypasses middleware to prevent loops)

### Markdown Renderers
- Playbook: Metadata table, priority, status
- Playbook Page: Approval info, review cadence
- Knowledge Base: Confidentiality level
- Raw Material: Source links, processing status
- Wiki JS Content: TOC, source banner

### Special Rules
- **Playbook Pages**: Only sync when `approval_status=live` AND `sync_to_wiki=true`
- **Others**: Sync when `syncToWiki=true`

### Environment Variables
```env
WIKI_SYNC_ENABLED=true
WIKI_BASE_URL=https://wiki.example.com
WIKI_GRAPHQL_URL=https://wiki.example.com/graphql
WIKI_API_TOKEN=your-token
WIKI_DEFAULT_EDITOR=markdown
WIKI_DEFAULT_LOCALE=en
WIKI_DEFAULT_PRIVATE=false
WIKI_SYNC_COLLECTIONS=article,blog-post
```

## Security

### Tenant Context Middleware
Resolves tenant from: Authenticated user → X-Tenant-Domain header → X-Tenant-Slug header → Origin → Referer

### Admin Tenant Filter Middleware
Enforces RBAC in Strapi Admin:
- Filters sidebar content types
- Filters frontend init state
- Hard-blocks forbidden types (403)
- Injects tenant filters on queries
- Enforces tenant on writes

### API Policy
All routes use `global::is-tenant-scoped` policy:
- GET: Injects tenant filter
- POST/PUT/PATCH: Enforces tenant
- Super-admins bypass

## Development

### Prerequisites
- Node.js 20+
- npm

### Commands
```bash
npm install          # Install dependencies
npm run develop      # Start dev server
npm run build        # Build for production
npx tsc --noEmit     # TypeScript check
```

### Database
**SQLite (dev):**
```env
DATABASE_CLIENT=sqlite
DATABASE_FILENAME=.tmp/data.db
```

**PostgreSQL (prod):**
```env
DATABASE_CLIENT=postgres
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=acumen
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=password
```

## Auto-Seeded Data

On first run, `bootstrap()` creates:

1. **Tenants**: RegulateThis, Sylvan, Glynac AI
2. **Pillars**: Practice Management, Wealth Management Tech, Compliance & Regulation
3. **Site Settings**: Per-tenant
4. **Admin Roles**: glynac-admin, sylvan-admin, regulatethis-admin, wiki-js-admin
5. **Admin Users**: admin@regulatethis.com, admin@sylvannotes.com, admin@glynac.ai, wikiadmin@glynac.ai
6. **Public Permissions**: blog-post find/findOne

## API Endpoints

All endpoints tenant-scoped. Use headers:
```bash
curl "http://localhost:4002/api/playbooks" \
  -H "X-Tenant-Slug: glynac-ai"
```

### Available Endpoints
- GET/POST `/api/playbooks`
- GET/POST `/api/playbook-pages`
- GET/POST `/api/knowledge-bases`
- GET/POST `/api/raw-materials`
- GET/POST `/api/wiki-js-contents`
- Plus legacy endpoints: articles, blog-posts, pillars, etc.

## Recent Updates

### Knowledge System (Latest)
- 4 new content types with full CRUD
- Wiki.js sync with status tracking
- Approval workflow for Playbook Pages
- Updated RBAC and tenant relations
- TypeScript verified (0 errors)

### Multi-Tenant (Previous)
- Automatic tenant resolution
- Admin panel RBAC
- Wiki.js integration foundation
