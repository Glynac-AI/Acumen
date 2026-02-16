# Glynac Blog Post Configuration Guide

## 1. Introduction

This comprehensive guide details the configuration, schema, and usage of the `blog-post` collection type within the Glynac tenant architecture. It is designed for backend developers, frontend developers, and content managers to ensure a consistent and robust implementation of the blog feature.

The `blog-post` collection is a core content type designed to manage editorial content for the Glynac wealth management platform. It leverages Strapi's powerful content modeling capabilities to provide a flexible yet structured environment for creating SEO-friendly, visually appealing, and highly authorized blog posts.

### Purpose
The primary purpose of this collection type is to serve as the backend data structure for the "Insights" or "Blog" section of the Glynac website. It is strictly scoped to the Glynac tenant to ensure data isolation in the multi-tenant architecture.

### Key Features
- **Multi-tenant Isolation**: Native integration with the Tenant system to ensure posts are only visible to the correct tenant.
- **SEO Optimization**: dedicated fields for slugs, excerpts, and meta information.
- **Rich Content**: Full Markdown support via the Rich Text field.
- **Component-based Authorship**: Flexible author attribution without the need for a separate heavy relation, using a localized component.
- **Asset Management**: Optimized handling of cover images with size recommendations.

---

## 2. Schema Configuration (Deep Dive)

The following section provides a granular breakdown of every field in the `blog-post` schema.

### 2.1 Collection Settings
- **Kind**: `collectionType`
- **Collection Name**: `blog_posts` (Database table name)
- **Singular Name**: `blog-post` (API ID)
- **Plural Name**: `blog-posts` (API ID)
- **Display Name**: "Blog Post"
- **Draft & Publish**: `Enabled`. This is critical for editorial workflows, allowing content to be drafted, reviewed, and scheduled before going live.

### 2.2 Attributes Breakdown

#### `title`
- **Type**: String
- **Required**: Yes
- **Max Length**: 200 characters
- **Purpose**: The H1 of the blog post.
- **Validation**: Enforces a limit to ensure titles don't break UI layouts or SEO standards.
- **Best Practice**: Keep titles under 60 characters for optimal search engine display.
- **Frontend Handling**: Should be rendered as an `<h1>` tag.

#### `slug`
- **Type**: UID
- **Target Field**: `title`
- **Required**: Yes
- **Purpose**: Unique identifier for URL routing.
- **Behavior**: Auto-generated from the title. For example, "The Future of AI" becomes `the-future-of-ai`.
- **Immutability**: While editable, changing a slug after publication will break existing links. Use 301 redirects if a change is absolutely necessary.
- **Frontend Handling**: Used in the route path, e.g., `/blog/[slug]`.

#### `excerpt`
- **Type**: Text
- **Required**: Yes
- **Max Length**: 500 characters
- **Purpose**: A summary used for SEO meta descriptions, social media sharing previews (Open Graph), and blog listing cards.
- **Validation**: Strict length limit to prevent UI overflow on cards.
- **Best Practice**: Write 2-3 compelling sentences (approx. 150-160 characters) to maximize click-through rates from search engines.

#### `content`
- **Type**: Rich Text (Markdown)
- **Required**: Yes
- **Purpose**: The main body of the article.
- **Capabilities**: Supports H1-H6, bold, italic, lists, blockquotes, code blocks, and embedded images.
- **Frontend Handling**: Requires a Markdown renderer (e.g., `react-markdown` or `markdown-to-jsx`). Developers must style the output to match the Glynac design system typography.

#### `coverImage`
- **Type**: Media
- **Multiple**: No (Single file)
- **Required**: Yes
- **Allowed Types**: Images only (jpg, png, webp, avif)
- **Purpose**: The visual hook for the post. Used at the top of the article and as the thumbnail in listings.
- **Recommendations**:
  - **Dimensions**: 1600x900px (16:9 aspect ratio)
  - **File Size**: < 500KB (Use WebP for compression)
- **Frontend Handling**: Use `next/image` for optimization. Always provide `alt` text (mapped to `alternativeText` from Strapi).

#### `category`
- **Type**: String
- **Required**: Yes
- **Max Length**: 100 characters
- **Purpose**: High-level categorization.
- **Examples**: "Compliance", "Technology", "Wealth Management".
- **Usage**: Used for filtering posts in the API and grouping them on the frontend.
- **Note**: Currently a string field for simplicity. Consistency is enforced via editorial guidelines rather than a relation.

#### `tags`
- **Type**: JSON
- **Required**: No
- **Purpose**: Granular topics or keywords.
- **Format**: Array of strings, e.g., `["AI", "SaaS", "Q3 Update"]`.
- **Usage**: Enables "related posts" logic and nuanced filtering.
- **Frontend Handling**: Render as clickable pills/badges.

#### `readTime`
- **Type**: String
- **Required**: Yes
- **Max Length**: 50 characters
- **Purpose**: User expectation management.
- **Format**: "X min read".
- **Automation**: While this field is manually editable, the frontend or a Strapi lifecycle hook can calculate it based on word count (Avg 200-250 wpm).

#### `author` (Component)
- **Type**: Component (`blog.author`)
- **Required**: Yes
- **Repeatable**: No
- **Fields**:
  - `name`: String (Required, Max 100)
  - `role`: String (Required, Max 150)
- **Rationale**: Using a component instead of a relation allows for one-off authors or guest contributors without polluting a global "Authors" collection type. It keeps the data self-contained within the post.

#### `tenant` (Relation)
- **Type**: Relation (Many-to-One)
- **Target**: `api::tenant.tenant`
- **Inversed By**: `blogPosts`
- **Required**: Implicitly required for visibility.
- **Purpose**: SECURITY. This field determines which tenant owns the data.
- **Middleware**: The `api::tenant-context` middleware uses this field to filter data. A post WITHOUT a tenant will likely be invisible to tenant-scoped API requests.

---

## 3. Author Component Configuration

The `blog.author` component is a reusable data structure embedded within the blog post.

### Structure
Located at: `src/components/blog/author.json`

### Field Details
1.  **Name**: The display name of the human author.
    - *Example*: "Jane Doe"
2.  **Role**: The professional title or credential relevant to the article context.
    - *Example*: "Chief Compliance Officer"

### Why Component?
We avoided a strict Relation to a User or separate Author collection to maximize flexibility. Marketing teams often publish on behalf of executives, or guest writers contribute single articles. A component allows "ad-hoc" author attribution without account creation overhead.

---

## 4. API Configuration & Usage

The API is exposed via standard REST endpoints, enhanced with Glynac-specific middleware.

### Base Endpoint
`GET /api/blog-posts`

### Authentication & Permissions
- **Public Access**: `find` and `findOne` are open to the public (no JWT required) BUT are filtered by the `tenant` middleware.
- **Admin Access**: `create`, `update`, `delete` are restricted to Authenticated Admins.

### Middleware: `api::tenant-context`
This is the guardian of the galaxy. It intercepts every request.
1.  Checks if a tenant context exists (usually via header or domain mapping).
2.  If present, automatically injects a `filters` object into the request query: `{ tenant: { id: CURRENT_TENANT_ID } }`.
3.  This ensures that querying `/api/blog-posts` via `glynac.com` NEVER returns posts from `acume.com`.

### Example Requests

#### 1. Fetch All Posts for Glynac
```bash
GET /api/blog-posts?populate=*
```
*Response*:
```json
{
  "data": [
    {
      "id": 1,
      "attributes": {
        "title": "AI in 2026",
        "slug": "ai-in-2026",
        "author": {
          "name": "Dr. Smith",
          "role": "CTO"
        },
        "tenant": {
          "data": {
            "attributes": { "slug": "glynac" }
          }
        }
      }
    }
  ]
}
```

#### 2. Fetch Single Post by Slug
We implemented a custom service method `findOneBySlug` to handle this efficiently, but standard filtering also works:
```bash
GET /api/blog-posts?filters[slug][$eq]=my-post-slug&populate=*
```

#### 3. Filtering by Category
```bash
GET /api/blog-posts?filters[category][$eq]=Technology
```

---

## 5. Security & Best Practices

### Validation
- **Input Sanitization**: Strapi's Rich Text field automatically sanitizes HTML. However, the frontend should also use a sanitization library (like `dompurify` if rendering raw HTML, though Markdown avoids most XSS risks).
- **Image Uploads**: Restricted to image mime types only. This prevents uploading executables or PDFs into the cover image slot.

### Performance
- **Populate Strategy**: Do NOT use `populate=*` in production if possible. Be specific: `populate[0]=coverImage&populate[1]=author&populate[2]=tenant`.
- **Image Formats**: Strapi automatically generates formats (thumbnail, small, medium, large). The frontend should request the appropriate size (e.g., use `medium` for card grids and `large` for the hero banner).

### SEO Guidelines for Content Editors
1.  **Titles**: Include the primary keyword near the beginning.
2.  **Slugs**: Keep them short, lowercase, and hyphenated. Remove stop words (and, the, a).
3.  **Excerpts**: Treat this as your sales pitch to a Google searcher. Why should they click?
4.  **Alt Text**: Review every cover image. Alt text helps accessibility AND Google Image Search ranking.

---

## 6. Troubleshooting

### Issue: Post not showing up in API
- **Check 1**: Is `publishedAt` set? (Is it Published or Draft?)
- **Check 2**: Is the `tenant` field linked to "Glynac"? If the relation is empty, the middleware filters it out.
- **Check 3**: Did you remember to Publish the changes to the *Tenant* itself (if Tenant utilizes draft/publish, though currently it is disabled for Tenant)?

### Issue: Image not loading
- **Check**: Are you using the full URL? If using local provider, you need to prepend the Strapi URL (e.g., `http://localhost:1337`).

### Issue: "Forbidden" on POST/PUT
- **Reason**: Write operations are restricted to Admin users. You cannot post a blog via the public API. You must use the Strapi Admin Panel.

---

## 7. Future Roadmap Recommendations

- **Localization**: Enable i18n plugin if Glynac expands to non-English markets.
- **Comments**: Integrate a third-party comment system (Disqus/Giscus) or build a `Comment` collection type relation.
- **Versioning**: Content-versioning plugin to track changes to articles over time.

---

[End of Guide]
