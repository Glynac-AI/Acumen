# 🚀 Strapi Blog CMS Backend

A pre-configured Strapi CMS template for blog platforms with content types for Articles, Authors, Tags, and Pillars.

## 📋 Content Types

| Content Type | Description |
|--------------|-------------|
| **Articles** | Blog posts with title, content, SEO, featured images, and relationships |
| **Authors** | Content creators with bio, photo, social links |
| **Tags** | Article categorization |
| **Pillars** | Main content categories/themes |

## 🛠 Customization Guide

### Modifying Seed Data

Edit `src/index.ts` to customize the pre-populated data:

```typescript
// Pillars - Edit this array to change your main categories
const pillarsData = [
  {
    name: 'Your Pillar Name',
    slug: 'your-pillar-slug',
    subtitle: 'Your Tagline',
    description: 'Description of this pillar...',
    color: '#YOUR_HEX_COLOR',
    order: 1,
    details: [
      { detail: 'First detail point' },
      { detail: 'Second detail point' },
      { detail: 'Third detail point' },
    ],
  },
  // Add more pillars...
];

// Tags - Edit this array to customize your tags
const tagsData = [
  'Your Tag 1',
  'Your Tag 2',
  // Add more tags...
];
```

### Modifying Content Types

Content type schemas are located in `src/api/[content-type]/content-types/[content-type]/schema.json`:

- **Articles**: `src/api/article/content-types/article/schema.json`
- **Authors**: `src/api/author/content-types/author/schema.json`
- **Tags**: `src/api/tag/content-types/tag/schema.json`
- **Pillars**: `src/api/pillar/content-types/pillar/schema.json`

### Modifying Components

Reusable components are in `src/components/shared/`:

- **SEO**: `src/components/shared/seo.json` - Meta title, description, keywords, OG image
- **Pillar Details**: `src/components/shared/pillar-details.json` - Repeatable detail points

### CORS Configuration

Edit `config/middlewares.ts` to add your domains:

```typescript
{
  name: 'strapi::cors',
  config: {
    origin: [
      'http://localhost:3000',
      'https://your-domain.com',
    ],
  },
},
```

## 🚀 Quick Start

### Development

```bash
npm install
npm run develop
```

### Production Build

```bash
npm run build
npm run start
```

## ⚙️ First Run Setup

1. **Start Strapi**: `npm run develop`
2. **Create Admin User**: Follow the setup wizard at `http://localhost:1337/admin`
3. **Auto-Seed**: Pillars and Tags are automatically created on first startup
4. **Set Permissions**: 
   - Go to Settings → Roles → Public
   - Enable `find` and `findOne` for Articles, Authors, Tags, Pillars
5. **Create API Token**: Settings → API Tokens → Create read-only token

## 📡 API Endpoints

```
GET /api/articles?populate=*
GET /api/articles?filters[slug][$eq]=your-slug
GET /api/authors?populate=articles
GET /api/tags
GET /api/pillars?populate=details,articles
```

## 📚 Learn more

- [Strapi documentation](https://docs.strapi.io)
- [Strapi tutorials](https://strapi.io/tutorials)
- [Strapi blog](https://strapi.io/blog)
