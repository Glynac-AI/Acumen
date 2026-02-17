# 📝 How to Create a Blog Post in Strapi

## ⚠️ IMPORTANT: Understanding the Structure

Your Blog Post uses:
- ✅ **Author**: A **component** (embedded data) - NOT the "Glynac Author" collection
- ✅ **Category**: A **string field** - NOT the "Glynac Category" collection

The separate "Glynac Author" and "Glynac Category" collections you created are **different** and won't work with Blog Posts.

---

## 📋 Step-by-Step: Create Your First Blog Post

### 1. Navigate to Blog Posts

```
Content Manager (left sidebar) → Collection Types → Blog Post → Create new entry
```

### 2. Fill in Required Fields

#### **Title** (Required)
```
Example: "Top 5 AI Tools for Wealth Management in 2024"
```

#### **Slug** (Auto-generated)
- Will auto-fill as: `top-5-ai-tools-for-wealth-management-in-2024`
- You can edit it if needed

#### **Excerpt** (Required, 2-3 sentences)
```
Example: "Artificial intelligence is transforming how wealth managers serve clients. We've tested dozens of AI tools and identified the top 5 that deliver real ROI for advisory firms."
```
- Keep it between 120-160 characters for best SEO
- This appears on blog cards and meta descriptions

#### **Content** (Required, Markdown)
```markdown
Example:

## Introduction

The wealth management industry is rapidly adopting AI tools to improve client service and operational efficiency. But with so many options available, how do you choose?

## Top 5 AI Tools

### 1. Tool Name Here
Description of the tool and why it's valuable...

### 2. Another Tool
More details...

## Conclusion

These tools represent the best of what's available today...
```

#### **Cover Image** (Required)
1. Click "Browse files"
2. Upload an image (recommended: 1600x900px, under 500KB)
3. **IMPORTANT**: Add alt text for accessibility

#### **Category** (Required, String)
**Type the category name directly** (not a dropdown):
```
Examples:
- AI & Technology
- Compliance
- Technology
- Wealth Management
```

**Note**: This is a text field, NOT a relation. Just type the category name.

#### **Tags** (Optional, JSON Array)
Click the field and type a JSON array:
```json
["AI", "Technology", "Automation"]
```

**Format rules**:
- Must be valid JSON
- Each tag in quotes
- Separated by commas
- Wrapped in square brackets

#### **Read Time** (Required, String)
```
Examples: "5 min read", "8 min read", "12 min read"
```

---

### 3. Fill in Author Component

This is **embedded data**, not a relation to "Glynac Author" collection.

Scroll down to the **Author** section (it's a component box):

**Author Name** (Required):
```
Example: Sarah Mitchell
```

**Author Role** (Required):
```
Example: Head of Product, Glynac AI
```

That's it! The author data is stored directly in the blog post.

---

### 4. Link to Tenant (CRITICAL!)

Scroll to the **Tenant** dropdown on the right sidebar.

**Select: Glynac**

⚠️ **THIS IS MANDATORY** - Without a tenant, the post won't appear in the API!

---

### 5. Save and Publish

1. Click **Save** (top right)
2. Click **Publish** (top right)

---

## ✅ Complete Example

Here's a fully filled blog post:

```
Title: Top 5 AI Tools for Wealth Management in 2024
Slug: top-5-ai-tools-for-wealth-management-in-2024
Excerpt: Artificial intelligence is transforming how wealth managers serve clients. We've tested dozens of AI tools and identified the top 5 that deliver real ROI.
Content: [Full markdown article]
Cover Image: [Uploaded image with alt text "AI tools dashboard"]
Category: AI & Technology
Tags: ["AI", "Technology", "Automation", "Wealth Management"]
Read Time: 8 min read
Author:
  - Name: Sarah Mitchell
  - Role: Head of Product, Glynac AI
Tenant: Glynac
Published: ✅
```

---

## 🔍 Why Didn't My "Glynac Author" / "Glynac Category" Work?

You created these as **separate collection types**, but blog posts don't use them.

### What You Created:
- ❌ Glynac Author (Collection) - Independent database table
- ❌ Glynac Category (Collection) - Independent database table

### What Blog Posts Use:
- ✅ Author (Component) - Embedded data inside each blog post
- ✅ Category (String) - Text field inside each blog post

### The Difference:

**Collection (What you created)**:
- Separate database table
- Requires relations to connect
- Reusable across multiple content types
- Example: One author record used by many articles

**Component (What blog-post uses)**:
- Embedded directly in the parent
- No separate table
- Data lives inside each blog post
- Example: Each blog post has its own author data

**String (What blog-post uses for category)**:
- Simple text field
- Just type the category name
- No relations needed

---

## 📊 Comparison Table

| Field | Your Creation | Blog Post Uses | How to Fill |
|-------|---------------|----------------|-------------|
| **Author** | Glynac Author (Collection) | Author (Component) | Fill Name + Role in the component box |
| **Category** | Glynac Category (Collection) | Category (String) | Type category name directly |
| **Tags** | Glynac Tag (Collection) | Tags (JSON) | Type JSON array: `["AI", "Tech"]` |

---

## 🎯 Quick Checklist

Before publishing, verify:

- [ ] Title filled (< 200 chars)
- [ ] Slug generated
- [ ] Excerpt written (2-3 sentences)
- [ ] Content added (Markdown)
- [ ] Cover image uploaded with alt text
- [ ] Category typed in (just text!)
- [ ] Tags added as JSON array (optional)
- [ ] Read time specified ("X min read")
- [ ] **Author component filled**:
  - [ ] Author Name
  - [ ] Author Role
- [ ] **Tenant selected: Glynac** ⚠️ CRITICAL
- [ ] Saved
- [ ] Published

---

## 🔄 What About My Existing Collections?

Your "Glynac Author" and "Glynac Category" collections can:

1. **Be deleted** if you don't need them
2. **Be kept for other purposes** (maybe future features)
3. **Be ignored** - they won't interfere with blog posts

Blog posts will work fine without touching them.

---

## 📸 Visual Guide

### Author Component (Correct)
```
┌─────────────────────────────┐
│ Author                      │
├─────────────────────────────┤
│ Name: Sarah Mitchell        │
│ Role: Head of Product       │
└─────────────────────────────┘
```

### Category Field (Correct)
```
┌─────────────────────────────┐
│ Category                    │
├─────────────────────────────┤
│ [Type here] AI & Technology │
└─────────────────────────────┘
```

### Tenant Dropdown (CRITICAL)
```
┌─────────────────────────────┐
│ Tenant                      │
├─────────────────────────────┤
│ [▼] Glynac                  │
└─────────────────────────────┘
```

---

## 🚀 After Creating Your First Post

Test the API:

```bash
curl --ssl-no-revoke "https://acumen-strapi-beta.onrender.com/api/blog-posts?populate=*"
```

**Expected Response:**
```json
{
  "data": [
    {
      "id": 1,
      "attributes": {
        "title": "Top 5 AI Tools...",
        "slug": "top-5-ai-tools...",
        "excerpt": "Artificial intelligence...",
        "category": "AI & Technology",
        "tags": ["AI", "Technology"],
        "readTime": "8 min read",
        "author": {
          "id": 1,
          "name": "Sarah Mitchell",
          "role": "Head of Product, Glynac AI"
        },
        "coverImage": { ... },
        "tenant": {
          "data": {
            "id": 1,
            "attributes": {
              "name": "Glynac",
              "slug": "glynac"
            }
          }
        },
        "publishedAt": "2024-02-17T..."
      }
    }
  ],
  "meta": {
    "pagination": {
      "total": 1
    }
  }
}
```

---

## ❓ Still Getting Empty Data?

If you still get `{"data":[],...}`, check:

1. **Did you publish the post?** (not just save)
2. **Did you select Glynac as tenant?**
3. **Are permissions enabled?** (Settings → Roles → Public → Blog-post → find & findOne)

---

## 💡 Pro Tips

1. **Draft first**: Save without publishing to review
2. **Preview images**: Use the cover image to attract readers
3. **SEO-friendly excerpts**: Make them compelling (users see this in search results)
4. **Consistent categories**: Use the same spelling/capitalization
5. **Author info**: Add credentials to build authority

---

**Need help?** The structure is:
- Author = Component (fill in the box)
- Category = String (type it in)
- Tenant = Dropdown (select Glynac)
- Then Publish!
