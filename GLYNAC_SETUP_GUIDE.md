# Glynac Blog Post Configuration Guide

## 🎯 Overview
This guide will help you properly configure Strapi for Glynac blog posts according to the official configuration requirements.

---

## ✅ Current Status

### What's Already Configured:
- ✅ **Blog Post Collection Type** (`blog-post`) - All fields properly configured
- ✅ **Author Component** (`blog.author`) - With `name` and `role` fields
- ✅ **Tenant System** - Multi-tenant support with Glynac capability
- ✅ **Controllers, Routes & Services** - Created for blog-post API

### Blog Post Schema (Already Correct):
```
Blog Post Collection Type
├── title (Text, Required, max 200 chars)
├── slug (UID from title, Required)
├── excerpt (Text, Required, max 500 chars)
├── content (Rich Text - Markdown, Required)
├── coverImage (Media - Single, Required)
├── category (Text, Required, max 100 chars)
├── tags (JSON, Optional) - Array format
├── readTime (Text, Required, max 50 chars)
├── author (Component - Single, Required)
│   ├── name (Text, Required)
│   └── role (Text, Required)
├── publishedAt (DateTime - Built-in via Draft/Publish)
└── tenant (Relation to Tenant)
```

---

## 🔧 Required Configuration Steps

### Step 1: Configure API Permissions

1. **Start Strapi** (if not already running):
   ```bash
   cd backend
   npm run develop
   ```

2. **Access Admin Panel**: 
   - Open http://localhost:4002/admin
   - Create your admin account if this is first run

3. **Set Public Permissions for Blog Post**:
   - Go to **Settings** → **Users & Permissions Plugin** → **Roles**
   - Click on **Public** role
   - Scroll down to find **BLOG-POST** section
   - Enable these permissions:
     * ✅ `find` - List all published blog posts
     * ✅ `findOne` - Get single blog post by ID
   - Click **Save**

   **Important**: Strapi automatically filters by `publishedAt` status, so only published posts are returned to the public API.

---

### Step 2: Create Glynac Tenant

1. **Navigate to Tenants**:
   - In the Strapi admin panel, go to **Content Manager**
   - Select **Tenant** from the left sidebar

2. **Create New Tenant**:
   - Click **Create new entry**
   - Fill in:
     * **Name**: `Glynac`
     * **Slug**: `glynac-ai`
     * **Domain**: `glynac.com` (or your actual domain)
     * **Is Active**: ✅ Checked
     * **Primary Color**: `#49648C` (or your brand color)
     * **Secondary Color**: `#1a1a2e` (or your brand color)
     * **Description**: "Glynac - AI-powered wealth management platform"
     * **Logo**: Upload Glynac logo (optional)
   - Click **Save**

---

### Step 3: Create Glynac Author(s)

**Option A: Use Author Collection (For Reusable Authors)**

1. **Navigate to Authors**:
   - Go to **Content Manager** → **Author**

2. **Create New Author**:
   - Click **Create new entry**
   - Fill in:
     * **Name**: e.g., "Sarah Mitchell"
     * **Slug**: `sarah-mitchell` (auto-generated)
     * **Title**: e.g., "Head of Product, Glynac"
     * **Bio**: Write a short bio (max 1000 chars)
     * **Email**: Optional
     * **Photo**: Upload author photo (optional)
     * **LinkedIn**: Optional
     * **Twitter**: Optional
     * **Is Active**: ✅ Checked
     * **Tenant**: Select **Glynac** from dropdown
   - Click **Save** and **Publish**

**Option B: Use Inline Author Component (For One-Time Authors)**

When creating blog posts, you can add author information directly in the blog post using the `author` component:
- **Name**: Author's full name
- **Role**: Job title (e.g., "Head of Product, Glynac")

---

### Step 4: Create Your First Glynac Blog Post

1. **Navigate to Blog Posts**:
   - Go to **Content Manager** → **Blog Post**

2. **Create New Blog Post**:
   - Click **Create new entry**
   
3. **Fill in All Required Fields**:

   **Basic Information:**
   - **Title**: Keep under 70 characters for SEO
     * Example: "How AI Agents Are Transforming Wealth Management"
   - **Slug**: Auto-generated (editable if needed)
     * Example: `ai-agents-transforming-wealth-management`

   **Content:**
   - **Excerpt**: 2-3 sentences, 120-160 chars ideal for SEO
     * Example: "Discover how specialized AI agents are revolutionizing the way wealth advisors handle onboarding, compliance, and client management — reducing administrative work by 40%."
   - **Content**: Use Markdown formatting
     * Use ## for main sections
     * Use ### for subsections
     * Use **bold** for emphasis
     * Format lists properly

   **Media:**
   - **Cover Image**: 
     * Upload image (minimum 1600x900px, under 500KB recommended)
     * Professional image relevant to the topic

   **Classification:**
   - **Category**: Choose from:
     * "AI & Technology"
     * "Compliance"
     * "Technology"
     * Or create your own category
   - **Tags**: Enter as JSON array
     * Example: `["AI Agents", "Wealth Management", "Automation"]`

   **Metadata:**
   - **Read Time**: Calculate based on word count (200 words/min)
     * Format: "5 min read", "8 min read", etc.
   
   **Author (Component):**
   - Click **Add component**
   - Fill in:
     * **Name**: "Sarah Mitchell"
     * **Role**: "Head of Product, Glynac"

   **Tenant:**
   - Select **Glynac** from dropdown

4. **Save as Draft** or **Publish**:
   - Click **Save** to keep as draft
   - Click **Publish** when ready to make it public

---

## 🧪 Testing the API

### Test Public API Access:

1. **List All Blog Posts**:
   ```bash
   curl http://localhost:4002/api/blog-posts
   ```

2. **Get Single Blog Post**:
   ```bash
   curl http://localhost:4002/api/blog-posts/1
   ```

3. **With Population** (to include relations):
   ```bash
   curl "http://localhost:4002/api/blog-posts?populate=*"
   ```

### Expected Response Structure:
```json
{
  "data": [
    {
      "id": 1,
      "attributes": {
        "title": "How AI Agents Are Transforming Wealth Management",
        "slug": "ai-agents-transforming-wealth-management",
        "excerpt": "Discover how specialized AI agents are...",
        "content": "## Introduction\n\nWealth management...",
        "coverImage": { ... },
        "category": "AI & Technology",
        "tags": ["AI Agents", "Wealth Management", "Automation"],
        "readTime": "5 min read",
        "author": {
          "name": "Sarah Mitchell",
          "role": "Head of Product, Glynac"
        },
        "publishedAt": "2026-02-18T02:00:00.000Z",
        "createdAt": "2026-02-17T10:00:00.000Z",
        "updatedAt": "2026-02-18T02:00:00.000Z"
      }
    }
  ],
  "meta": { ... }
}
```

---

## 📝 Content Guidelines for Glynac Team

### Title Guidelines:
- Keep under 70 characters for SEO
- Use compelling, descriptive language
- Example: "How AI Agents Are Transforming Wealth Management Operations"

### Slug Guidelines:
- Auto-generated from title
- Can be manually edited if needed
- Use lowercase with hyphens only
- Example: `ai-agents-transforming-wealth-management`

### Excerpt Guidelines:
- 2-3 sentences summarizing the post
- Will appear in blog cards and meta descriptions
- 120-160 characters ideal for SEO

### Content (Markdown) Guidelines:
- Use H2 (`##`) for main sections
- Use H3 (`###`) for subsections
- Format lists with `-` or numbered lists
- **Bold** important points with `**text**`
- Use proper paragraph spacing

### Cover Image Guidelines:
- Minimum size: 1600x900px (16:9 ratio)
- Professional, relevant to topic
- Optimized file size (under 500KB)
- Upload to Strapi Media Library

### Category Options:
- "AI & Technology"
- "Compliance"
- "Technology"
- (Create new categories as needed - keep consistent!)

### Tags Format:
Enter as JSON array:
```json
["AI Agents", "Wealth Management", "Automation", "Productivity"]
```

### Read Time:
- Calculate based on word count (200 words/min average)
- Format: `"5 min read"`, `"8 min read"`, etc.

### Author Component:
- **Name**: Full name (e.g., "Sarah Mitchell")
- **Role**: Job title (e.g., "Head of Product, Glynac")

---

## 🔐 Security & Permissions Summary

### Public Role Permissions (Required):
- ✅ **blog-post.find** - List published posts
- ✅ **blog-post.findOne** - Get single post

### Authenticated Role Permissions (Optional):
- Can be configured for additional features like comments, likes, etc.

### Admin Permissions:
- Full CRUD access to all content types
- Manage tenants, authors, and all blog posts

---

## 🚀 Frontend Integration

### Environment Variables:
Make sure your frontend `.env.local` has:
```env
NEXT_PUBLIC_STRAPI_URL=http://localhost:4002
```

### Fetching Blog Posts in Next.js:
```typescript
// lib/strapi.ts
const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:4002';

export async function getBlogPosts() {
  const res = await fetch(`${STRAPI_URL}/api/blog-posts?populate=*`);
  const data = await res.json();
  return data.data;
}

export async function getBlogPost(slug: string) {
  const res = await fetch(
    `${STRAPI_URL}/api/blog-posts?filters[slug][$eq]=${slug}&populate=*`
  );
  const data = await res.json();
  return data.data[0];
}
```

---

## ✨ Differences Between Article and Blog Post

Your Strapi has two content types for blog content:

### **Article** (Original - For RegulateThis):
- More complex structure with subcategories, pillars
- Author as a relation (reusable author entities)
- Tenant: RegulateThis

### **Blog Post** (New - For Glynac):
- Simpler structure focused on blog posts
- Author as a component (inline author data)
- Tenant: Glynac
- Follows the configuration guide exactly

**Use Blog Post for all Glynac content.**

---

## 🆘 Troubleshooting

### Issue: "Forbidden" error when accessing API
**Solution**: Check API permissions in Settings → Users & Permissions → Public role

### Issue: Blog posts not showing up
**Solution**: Make sure the post is **Published** (not just saved as draft)

### Issue: Images not loading
**Solution**: Check CORS settings and ensure media upload is configured correctly

### Issue: Tenant filter not working
**Solution**: Add tenant filter in your API queries:
```
/api/blog-posts?filters[tenant][slug][$eq]=glynac-ai
```

---

## 📚 Additional Resources

- [Strapi Documentation](https://docs.strapi.io)
- [Strapi V5 Content Type Guide](https://docs.strapi.io/dev-docs/backend-customization/models)
- [Strapi API Permissions](https://docs.strapi.io/user-docs/users-roles-permissions/configuring-end-user-roles)

---

## ✅ Final Checklist

Before going to production:

- [ ] API permissions configured for blog-post (find, findOne)
- [ ] Glynac tenant created and active
- [ ] At least one Glynac author created (or use component)
- [ ] Test blog post created and published
- [ ] API responses tested and working
- [ ] Frontend integration verified
- [ ] Cover images optimized and uploaded
- [ ] Content follows guidelines
- [ ] SEO fields (title, excerpt) optimized

---

**Configuration Complete! Your Glynac blog is ready to use.** 🎉
