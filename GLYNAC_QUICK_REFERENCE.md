# Glynac Blog - Quick Reference Card

## 🚀 Quick Start Checklist

### Initial Setup (Do Once):
1. ✅ Configure API Permissions: Settings → Users & Permissions → Public → Enable `find` and `findOne` for blog-post
2. ✅ Create Glynac Tenant: Content Manager → Tenant → Create (name: "Glynac", slug: "glynac")
3. ✅ Create Author (optional): Content Manager → Author → Create and link to Glynac tenant

### Creating a Blog Post:

**Go to**: Content Manager → Blog Post → Create new entry

**Required Fields:**
- **Title**: Max 70 chars (e.g., "How AI Agents Transform Wealth Management")
- **Excerpt**: 2-3 sentences, 120-160 chars for SEO
- **Content**: Markdown formatted (## for H2, ### for H3, **bold**)
- **Cover Image**: 1600x900px minimum, under 500KB
- **Category**: "AI & Technology", "Compliance", or "Technology"
- **Read Time**: "5 min read", "8 min read", etc.
- **Author Component**:
  - Name: "Sarah Mitchell"
  - Role: "Head of Product, Glynac"
- **Tenant**: Select "Glynac"

**Optional Fields:**
- **Tags**: JSON array `["AI", "Automation", "Compliance"]`

**Publishing:**
- Click **Save** (draft) or **Publish** (live)

---

## 📋 Content Templates

### Title Examples:
- "How AI Agents Are Transforming Wealth Management Operations"
- "5 Ways Automation Reduces Compliance Risk in Financial Services"
- "The Future of Wealth Advisory: AI-Powered Client Management"

### Excerpt Template:
```
Discover how [technology/approach] is [transforming/revolutionizing] 
[industry/process] — [key benefit/statistic].
```

### Tags Library:
```json
["AI Agents", "Wealth Management", "Automation", "Compliance", 
 "Productivity", "Financial Services", "Technology", "Innovation"]
```

### Category Guide:
- **AI & Technology**: AI, ML, automation, tech innovations
- **Compliance**: Regulatory, legal, risk management
- **Technology**: General tech, platforms, integrations

---

## 🔗 API Endpoints

### Local Development:
- List posts: `http://localhost:4002/api/blog-posts`
- Single post: `http://localhost:4002/api/blog-posts/{id}`
- With relations: `http://localhost:4002/api/blog-posts?populate=*`
- Filter by tenant: `http://localhost:4002/api/blog-posts?filters[tenant][slug][$eq]=glynac`

### Admin Panel:
- Access: `http://localhost:4002/admin`

---

## 📐 Image Specifications

### Cover Image:
- **Dimensions**: 1600x900px (16:9 ratio) minimum
- **File Size**: Under 500KB (optimize with TinyPNG or similar)
- **Format**: JPG or PNG
- **Style**: Professional, relevant to topic

### Author Photo (if using Author collection):
- **Dimensions**: 400x400px minimum (square)
- **File Size**: Under 200KB
- **Format**: JPG or PNG

---

## ✍️ Markdown Cheat Sheet

```markdown
## Main Section (H2)

### Subsection (H3)

**Bold text** for emphasis

*Italic text* for subtle emphasis

- Bullet point
- Another point
  - Nested point

1. Numbered item
2. Another item

[Link text](https://example.com)

> Blockquote for important notes

`inline code` for technical terms
```

---

## 🎨 Author Component vs Author Collection

### Use Author Component (Inline):
✅ Quick blog posts
✅ One-time guest authors
✅ Simple setup

**How**: Fill in author name and role directly in blog post

### Use Author Collection (Relation):
✅ Regular contributors
✅ Full author profiles with bio, photo, social links
✅ Reusable across multiple posts

**How**: Create author first, then select from dropdown

---

## 🐛 Common Issues & Fixes

| Issue | Solution |
|-------|----------|
| Can't see blog posts in API | Check API permissions (Public role → blog-post → find, findOne) |
| Post not showing up | Make sure it's **Published**, not just saved |
| Images not loading | Check file size (<500KB) and format (JPG/PNG) |
| "Forbidden" error | API permissions not configured for Public role |
| Wrong tenant | Select "Glynac" from tenant dropdown |

---

## 📞 Need Help?

- **Full Setup Guide**: See `GLYNAC_SETUP_GUIDE.md`
- **Strapi Docs**: https://docs.strapi.io
- **Project README**: See `README.md`

---

**Happy Blogging! 📝✨**
