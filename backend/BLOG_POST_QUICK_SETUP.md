# Quick Setup Guide: Glynac Blog

## Overview
This document provides a rapid, 5-step process to get the Glynac Blog system up and running. It assumes the backend files have been deployed.

### Prerequisites
- Node.js v16+
- Strapi v4+
- PostgreSQL Database

---

## Step 1: Verification & Startup

First, ensure all new files are in place and the server starts without errors.

1.  **Navigate to Backend**:
    ```bash
    cd backend
    ```

2.  **Install Dependencies** (if new packages were added, though none were for this specific task):
    ```bash
    npm install
    ```

3.  **Start Strapi in Develop Mode**:
    ```bash
    npm run develop
    ```
    *Watch the console for any schema errors.*

---

## Step 2: Tenant Configuration

The blog system relies on the Tenant relation. You must ensure the "Glynac" tenant exists.

1.  Log in to the **Strapi Admin Panel** (`http://localhost:1337/admin`).
2.  Go to **Content Manager** > **Tenant**.
3.  Click **Create new entry**.
4.  Fill in:
    - **Name**: Glynac
    - **Slug**: `glynac` (Crucial! Must match exactly)
    - **Domain**: `glynac.com`
    - **Is Active**: True
    - **Primary Color**: `#49648C`
    - **Secondary Color**: `#1a1a2e`
5.  Click **Save**.

*Alternatively, run the provided SQL script `backend/database/setup-glynac-tenant.sql` directly in your database.*

---

## Step 3: API Permission Config

By default, new Collection Types are private. You must open them up.

1.  Go to **Settings** > **Users & Permissions Plugin** > **Roles**.
2.  Click **Public**.
3.  Scroll down to **Blog-post**.
4.  Check:
    - [x] `find`
    - [x] `findOne`
5.  Click **Save**.
6.  Repeat for **Authenticated** role if necessary, though usually Public is sufficient for a read-only blog.

---

## Step 4: Create Your First Post

1.  Go to **Content Manager** > **Blog Post**.
2.  Click **Create new entry**.
3.  Fill in the fields:
    - **Title**: "Welcome to Glynac"
    - **Slug**: `welcome-to-glynac`
    - **Excerpt**: "Our first official update."
    - **Content**: "Hello world..."
    - **Category**: "News"
    - **Read Time**: "1 min read"
    - **Cover Image**: Upload a test image.
4.  **Author Component**:
    - **Name**: "System Admin"
    - **Role**: "Administrator"
5.  **Tenant Relation** (Critical):
    - Select "Glynac" from the dropdown on the right.
6.  Click **Save** and then **Publish**.

---

## Step 5: Test the API

Use `curl` or Postman to verify.

**Request:**
```bash
GET http://localhost:1337/api/blog-posts?populate=*
```
*Note: Ensure your request simulates the tenant context used by your middleware, or simply rely on the fact that if you are running locally without domain mapping, the middleware might default or you might need to mock the tenant state.*

**Expected Output:**
```json
{
  "data": [
    {
      "id": 1,
      "attributes": {
        "title": "Welcome to Glynac",
        "slug": "welcome-to-glynac",
        ...
      }
    }
  ],
  "meta": { ... }
}
```

---

## Troubleshooting Tips

- **403 Forbidden**: Check Step 3 (Permissions).
- **Empty Data**: Check Step 4 (Did you Publish? Did you link the Tenant?).
- **500 Error**: Check server logs. Did you rebuild the admin panel (`npm run build`) after schema changes?

## Critical Notes

> [!IMPORTANT]
> Always link a post to a Tenant. Orphaned posts will be invisible to the API logic that relies on tenant filtering.

> [!WARNING]
> Changing the `slug` of a published post will break external links.

---
[End of Quick Setup]
