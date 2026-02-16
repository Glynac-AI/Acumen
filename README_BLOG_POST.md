# Glynac Blog Module

## Project Overview

This module implements the Blog functionality for the Glynac tenant within the Acumen/Strapi ecosystem. It provides a robust, SEO-optimized content management structure tailored for high-quality editorial content.

### File Structure

```
backend/
├── src/
│   ├── api/
│   │   └── blog-post/          # The Core Collection
│   │       ├── content-types/
│   │       │   └── blog-post/
│   │       │       └── schema.json  # Data Model
│   │       ├── controllers/    # Custom logic & Filtering
│   │       ├── routes/         # API Endpoints
│   │       └── services/       # Business Logic
│   └── components/
│       └── blog/
│           └── author.json     # Reusable Author Component
├── database/
│   └── setup-glynac-tenant.sql # Init Script
└── BLOG_POST_CONFIGURATION_GUIDE.md # Deep Dive Doc

lib/
└── blog-post-api.ts            # Frontend API Client

types/
└── blog-post.ts                # TypeScript Definitions
```

---

## Collection Schema Reference

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| title | String | Yes | Main headline (H1) |
| slug | UID | Yes | URL identifier |
| excerpt | Text | Yes | SEO description |
| content | RichText | Yes | Markdown content |
| coverImage | Media | Yes | Featured image |
| category | String | Yes | Topic category |
| tags | JSON | No | Array of keywords |
| readTime | String | Yes | "5 min read" |
| author | Component | Yes | Name & Role |
| tenant | Relation | Yes | Tenant ownership |

---

## Integration Examples

### Frontend (Next.js)

```typescript
import { getBlogPosts } from '@/lib/blog-post-api';

export async function getStaticProps() {
  const response = await getBlogPosts(1, 10);
  
  return {
    props: {
        posts: response.data
    }
  }
}
```

### Components

```tsx
// BlogPostCard.tsx
import { BlogPost } from '@/types/blog-post';
import { toBlogPostPreview } from '@/types/blog-post';

export default function BlogPostCard({ post }: { post: BlogPost }) {
  const preview = toBlogPostPreview(post);
  
  return (
    <div className="card">
        <img src={preview.coverImageUrl} alt={preview.title} />
        <h3>{preview.title}</h3>
        <p>{preview.excerpt}</p>
        <span>{preview.readTime}</span>
    </div>
  );
}
```

---

## Quality Assurance Checklist

- [ ] **Schema**: All fields present and typed correctly.
- [ ] **Permissions**: Public role has `find`/`findOne` access.
- [ ] **Tenant**: Tenant 'Glynac' exists and is linked to posts.
- [ ] **Images**: Cover images are optimized (WebP, proper size).
- [ ] **SEO**: Meta descriptions (excerpts) are populated.

## Security Features

1.  **Tenant Isolation**: Middleware ensures Glynac data never leaks to other tenants.
2.  **Input Validation**: Strict max lengths on text fields.
3.  **Role Based Access**: Only Admins can create/edit content.

## Deployment

1.  **Commit** changes to git.
2.  **Push** to repository (triggers CI/CD).
3.  **Verify** Strapi Admin on production has the new collection.
4.  **Configure** Permissions on Production (Settings > Roles > Public).

---
*Generated for Acumen Blog Project*
