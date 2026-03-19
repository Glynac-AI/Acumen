# Acumen Blog (Multi-Tenant)

A [Next.js](https://nextjs.org) blog application with a [Strapi CMS](https://strapi.io) backend, featuring a complete **Knowledge Management System** with Wiki.js integration.

**Supported Tenants:**
- **RegulateThis** - Financial advisory content with Articles and Pillars
- **Glynac AI** - Blog posts and knowledge base content
- **Sylvan** - Real estate investment platform content

## ✨ Key Features

### 🏢 Multi-Tenant Architecture
- **Tenant-scoped content** - Each tenant sees only their own data
- **Admin panel RBAC** - Role-based access control with per-tenant admin roles
- **Automatic tenant resolution** - Via headers, origin, or authenticated user

### 📚 Knowledge Management System
Four new content types for managing institutional knowledge:

| Content Type | Purpose | Wiki Sync |
|--------------|---------|-----------|
| **Playbook** | SOPs, procedures, step-by-step guides | ✅ Opt-in with status tracking |
| **Playbook Page** | Live knowledge pages with approval workflow | ✅ Only when `approval_status=live` |
| **Knowledge Base** | Reference docs, FAQs, how-to articles | ✅ Opt-in with status tracking |
| **Raw Material** | Source materials, meeting notes, research | ✅ Opt-in with status tracking |

### 🔗 Wiki.js Integration
- **Automatic sync** to Wiki.js when content is published
- **Status tracking** - `lastSyncStatus`, `lastSyncedAt`, `lastSyncError`, `wikiPageId`
- **Rich markdown renderers** with table of contents, metadata tables, and footers
- **Opt-in per document** via `syncToWiki` flag
- **Dedicated handling** for each content type with custom markdown templates

### 🔐 Enhanced Security
- **Tenant-scoped API policies** - All API routes filtered by tenant
- **Admin panel filtering** - Content types hidden based on tenant
- **Wiki.js Admin role** - Dedicated role for managing Wiki.js content

## Quick Start

### Prerequisites
- Node.js 20+ (required for Strapi v5)
- npm or yarn
- Docker (recommended for Windows users)

### Environment Variables

Create `.env` files for both frontend and backend:

**Frontend (.env.local):**
```env
NEXT_PUBLIC_STRAPI_URL=http://localhost:4002
```

**Backend (backend/.env):**
```env
# Database (choose one)
DATABASE_CLIENT=sqlite
DATABASE_FILENAME=.tmp/data.db

# Or PostgreSQL
# DATABASE_CLIENT=postgres
# DATABASE_HOST=localhost
# DATABASE_PORT=5432
# DATABASE_NAME=acumen
# DATABASE_USERNAME=postgres
# DATABASE_PASSWORD=password

# Wiki.js Sync (optional)
WIKI_SYNC_ENABLED=true
WIKI_BASE_URL=https://wiki.your-domain.com
WIKI_GRAPHQL_URL=https://wiki.your-domain.com/graphql
WIKI_API_TOKEN=your-wiki-api-token
WIKI_DEFAULT_EDITOR=markdown
WIKI_DEFAULT_LOCALE=en
WIKI_DEFAULT_PRIVATE=false
WIKI_SYNC_COLLECTIONS=article,blog-post

# Server
PORT=4002
HOST=0.0.0.0
```

### Running with Docker (Recommended)

1. Start the Strapi backend:
   ```bash
   cd backend
   docker compose up -d
   ```
2. Strapi will be available at [http://localhost:4002/admin](http://localhost:4002/admin).

### Running Natively

1. Install dependencies and start the Strapi backend:
   ```bash
   cd backend
   npm install
   npm run develop
   ```
2. In a new terminal, start the Next.js frontend:
   ```bash
   npm install
   npm run dev
   ```

## Setup & Configuration

### Initial Setup

After starting Strapi for the first time:

1. **Create an admin account** at `http://localhost:4002/admin`

2. **Default seeded data** (automatic on first run):
   - 3 tenants: RegulateThis, Glynac AI, Sylvan
   - Tenant-specific admin users and roles
   - Sample pillars (RegulateThis)
   - Site settings per tenant

3. **Public API permissions** (Settings → Users & Permissions → Roles → Public):
   - Enable `find` and `findOne` for content types
   - All content types are tenant-scoped by default

### Wiki.js Integration Setup

1. Install Wiki.js and get an API token
2. Add Wiki.js environment variables to `.env`
3. Create the "Wiki JS Admin" role in Strapi (auto-created on bootstrap)
4. Assign the `wikiadmin@glynac.ai` user (auto-created) to this role
5. In Strapi Admin, enable `syncToWiki` on any Playbook, Knowledge Base, Playbook Page, or Raw Material

## Content Types

### Legacy Types
| Type | Tenant | Description |
|------|--------|-------------|
| **Article** | RegulateThis | Rich blog articles with authors, categories, pillars |
| **Blog Post** | Glynac AI | Simpler blog posts for Glynac tenant |
| **Pillar** | RegulateThis | Content pillars for categorization |
| **Category** | All | Content categories |
| **Subcategory** | All | Structured subcategories |
| **Tag** | All | Article tags |
| **Author** | Shared | Blog post authors (many-to-many with tenants) |
| **Site Setting** | All | Per-tenant site configuration |

### New Knowledge System Types

#### Playbook
Operational playbooks with workflow support:
- **Fields**: title, slug, body (markdown), summary, product, persona, category, owner
- **Metadata**: priority (critical/high/medium/low), status (draft/in-review/approved/archived), reviewDate
- **Wiki Sync**: syncToWiki, wikiPath, wikiTags, sync status fields

#### Playbook Page
Live knowledge pages with approval workflow:
- **Fields**: title, slug, content, product, section, wiki_path
- **Workflow**: approval_status (draft/under-review/approved/live/unpublished)
- **Wiki Sync**: sync_to_wiki, visibility_groups, review_cadence, sync status fields
- **Special**: Only syncs when `approval_status=live` AND `sync_to_wiki=true`

#### Knowledge Base
Internal knowledge articles:
- **Fields**: title, slug, body, summary, product, persona, category, owner
- **Metadata**: confidentiality (public/internal/restricted/confidential), reviewDate
- **Wiki Sync**: Full sync support with status tracking

#### Raw Material
Source materials and research:
- **Fields**: title, type, product, file, external_url, notes
- **Workflow**: processed (boolean), resulting_pages, sections_to_update
- **Wiki Sync**: Full sync support with status tracking

## Architecture

### Multi-Tenant Flow
```
Request → Tenant Context Middleware → Tenant Resolution → Policy Enforcement → Controller
                                        ↓
                                    Headers: X-Tenant-Domain, X-Tenant-Slug
                                    Origin/Referer
                                    Authenticated User's Tenant
```

### Wiki.js Sync Flow
```
Document Saved → Document Service Middleware → Type Check → Sync Service → Wiki.js API
                                                    ↓
                                            playbook → syncDedicatedContent()
                                            knowledge-base → syncDedicatedContent()
                                            playbook-page → syncDedicatedContent()
                                            raw-material → syncDedicatedContent()
                                            wiki-js-content → syncWikiJsContent()
                                            other → createOrUpdatePage()
```

## Documentation
- **Backend Guide:** See [backend/README.md](./backend/README.md) for backend-specific details
- **Deployment:** See [DEPLOYMENT.md](./DEPLOYMENT.md) for deployment instructions

## Project Structure
```
├── app/                          # Next.js pages
├── components/                   # React components
├── lib/                          # Shared data fetching logic
├── backend/                      # Strapi CMS (v5)
│   ├── src/
│   │   ├── api/                  # Content types, controllers, services
│   │   │   ├── playbook/         # New: Playbook content type
│   │   │   ├── playbook-page/    # New: Playbook Page content type
│   │   │   ├── knowledge-base/   # New: Knowledge Base content type
│   │   │   ├── raw-material/     # New: Raw Material content type
│   │   │   └── ...               # Legacy content types
│   │   ├── services/
│   │   │   └── wiki-sync.ts      # Wiki.js integration service
│   │   ├── middlewares/
│   │   │   ├── tenant-context.ts # Tenant resolution
│   │   │   └── admin-tenant-filter.ts # Admin panel RBAC
│   │   ├── policies/
│   │   │   └── is-tenant-scoped.ts    # API tenant scoping
│   │   └── index.ts              # Bootstrap & register hooks
│   └── ...
└── types/                        # TypeScript types
```

## API Endpoints

All endpoints are tenant-scoped. Include `X-Tenant-Domain` or `X-Tenant-Slug` headers:

```bash
# Get playbooks for a tenant
curl "http://localhost:4002/api/playbooks" \
  -H "X-Tenant-Slug: glynac-ai"

# Get knowledge base articles
curl "http://localhost:4002/api/knowledge-bases" \
  -H "X-Tenant-Domain: glynac.ai"
```

## Recent Improvements

### Knowledge System (Latest)
- ✅ 4 new content types: Playbook, Playbook Page, Knowledge Base, Raw Material
- ✅ Wiki.js sync for all new types with dedicated renderers
- ✅ Approval workflow for Playbook Pages (only live content syncs)
- ✅ Enhanced tenant schema with inverse relations
- ✅ Updated RBAC to include new content types
- ✅ TypeScript compilation verified (zero errors)

### Previous
- ✅ Multi-tenant architecture with automatic resolution
- ✅ Admin panel RBAC with per-tenant content filtering
- ✅ Wiki.js integration for wiki-js-content type
- ✅ Document Service middleware for automatic sync

## License
Private - All rights reserved.
