# Wiki.js Sync - Environment Setup & Testing Guide

## 🔧 **Phase 1: Environment Variables Configuration**

### **Required Environment Variables**

Add these to your **Render.com** deployment:

```env
# ═══════════════════════════════════════════════════════════
# Wiki.js Synchronization Configuration
# ═══════════════════════════════════════════════════════════

# Enable Wiki.js sync globally
WIKI_SYNC_ENABLED=true

# Wiki.js instance URLs
WIKI_BASE_URL=https://wiki-js.ops.glynac.ai
WIKI_GRAPHQL_URL=https://wiki-js.ops.glynac.ai/graphql

# API Token (generated from Wiki.js Admin → API Access)
WIKI_API_TOKEN=eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGkiOjEsImdycCI6MSwiaWF0IjoxNzczNDQzNjc5LCJleHAiOjE4NjgxMTY0NzksImF1ZCI6InVybjp3aWtpLmpzIiwiaXNzIjoidXJuOndpa2kuanMifQ.e9HXO4nVjnZFdkgqUMxEvWxX4h3Ypo8PMjK6Qe79f-458OkrUmVHt4MHJ6iuTUbRwn_bQ4IA9FLz_lFt2F3iGNCrhr2esTMJJ0l0CNECPE0y1_wbYEaeqADFZQPXE4nqZK7QlrsoQMi9E7eYyIf4nZId_02gXNI5Xuokp55jw1FYRw3gQJrd5O5nfE5ItINsi1I0RO7ForS-apsACU-1ZvmDxp34CU8xsJH3wJ_HArsn8RNmonz0KlGRbdDo0iXmtWZbNkis5V68XV2dma4Lxj3oBol5PM7bQ5rAHU4rh549-i3bWPR_soSW-rGcI83-0bctviXn8Si0-RE_FD8f6Q

# Default page settings
WIKI_DEFAULT_EDITOR=markdown
WIKI_DEFAULT_LOCALE=en
WIKI_DEFAULT_PRIVATE=false

# Generic sync collections (optional - wiki-js-content uses dedicated sync)
# Leave empty or add other collection names if needed
WIKI_SYNC_COLLECTIONS=
```

### **How to Add Variables to Render.com**

1. Go to [Render.com Dashboard](https://dashboard.render.com)
2. Select your `acumen-strapi-beta` service
3. Navigate to **Environment** tab
4. Click **Add Environment Variable**
5. Add each variable listed above
6. Click **Save Changes**
7. Render will automatically redeploy your service

### **Verification After Deployment**

Once deployment completes (5-10 minutes), the sync service will automatically activate when:
- Creating wiki-js-content entries with `syncToWiki=true`
- Updating wiki-js-content entries with `syncToWiki=true`
- Publishing wiki-js-content entries with `syncToWiki=true`

---

## 🧪 **Phase 2: Testing the Wiki.js Sync**

### **Test 1: Connection Test**

**Purpose:** Verify Wiki.js is accessible and API token works

**Method:** API Request
```bash
curl -X GET https://acumen-strapi-beta.onrender.com/api/wiki-js-contents/test-connection \
  -H "Authorization: Bearer YOUR_STRAPI_TOKEN"
```

**Expected Success Response:**
```json
{
  "status": "connected",
  "message": "Successfully connected to Wiki.js",
  "wikiUrl": "https://wiki-js.ops.glynac.ai",
  "graphqlUrl": "https://wiki-js.ops.glynac.ai/graphql",
  "pages": {
    "total": 3,
    "sample": [
      {"id": 1, "title": "Homepage", "path": "home"},
      {"id": 2, "title": "test", "path": "test"}
    ]
  },
  "config": {
    "editor": "markdown",
    "locale": "en",
    "private": false
  }
}
```

**If Failed - Check:**
- Environment variables are set correctly on Render.com
- WIKI_API_TOKEN is valid (not expired)
- Wiki.js instance is accessible

---

### **Test 2: Automatic Sync (Create)**

**Purpose:** Test automatic synchronization when creating new content

**Steps:**
1. Login to Strapi Admin Panel: `https://acumen-strapi-beta.onrender.com/admin`
2. Navigate to: **Content Manager** → **Wiki JS Contents**
3. Click **"Create new entry"**
4. Fill in the form:
   - **Title:** "Test Wiki Sync - Automatic"
   - **Slug:** Auto-generated (e.g., `test-wiki-sync-automatic`)
   - **Summary:** "Testing automatic sync to Wiki.js"
   - **Body:** "This page was created automatically via Strapi sync."
   - **syncToWiki:** ✓ **Enabled** (toggle ON)
   - **wikiPath:** Leave empty (will auto-generate as `/wiki-js-content/test-wiki-sync-automatic`)
   - **wikiTags:** Optional (e.g., "test,strapi")
5. Click **Save** (draft)
6. Click **Publish**

**Expected Logs (Check Render.com Logs):**
```
[wiki-sync] syncing page /wiki-js-content/test-wiki-sync-automatic
[wiki-sync] Found existing page: /wiki-js-content/test-wiki-sync-automatic (id=4) [if updating]
[wiki-sync] wiki-js-content created: /wiki-js-content/test-wiki-sync-automatic (wikiPageId=4)
```

**Verify in Strapi (same entry):**
- ✅ `lastSyncStatus` = **"success"**
- ✅ `lastSyncedAt` = recent timestamp (e.g., "2024-03-20T10:30:00Z")
- ✅ `wikiPageId` = number (e.g., 4)
- ✅ `lastSyncError` = null or empty

**Verify in Wiki.js:**
1. Navigate to: `https://wiki-js.ops.glynac.ai/e/en/wiki-js-content/test-wiki-sync-automatic`
2. Page should exist with content matching Strapi
3. Should include:
   - Title: "Test Wiki Sync - Automatic"
   - Table of contents `[[toc]]`
   - Source link to Strapi
   - Last sync timestamp
   - Summary and content sections

---

### **Test 3: Manual Sync Trigger**

**Purpose:** Test manual sync endpoint for debugging

**Method:** API Request
```bash
curl -X POST https://acumen-strapi-beta.onrender.com/api/wiki-js-contents/DOCUMENT_ID/sync \
  -H "Authorization: Bearer YOUR_STRAPI_TOKEN" \
  -H "Content-Type: application/json"
```

Replace `DOCUMENT_ID` with the documentId from Strapi (visible in URL when editing entry).

**Expected Success Response:**
```json
{
  "success": true,
  "message": "Sync triggered successfully",
  "syncStatus": {
    "lastSyncStatus": "success",
    "lastSyncedAt": "2024-03-20T10:35:00Z",
    "lastSyncError": null,
    "wikiPageId": 4
  }
}
```

**Use Cases:**
- Re-sync an entry after Wiki.js manual edits
- Force sync when automatic sync fails
- Testing sync after configuration changes

---

### **Test 4: Update Sync**

**Purpose:** Verify updates are synced to existing Wiki.js pages

**Steps:**
1. Open the wiki-js-content entry created in Test 2
2. Edit the **Body** field (e.g., add "Updated content!")
3. Click **Save**
4. Check logs for sync confirmation

**Expected Logs:**
```
[wiki-sync] syncing page /wiki-js-content/test-wiki-sync-automatic
[wiki-sync] Found existing page: /wiki-js-content/test-wiki-sync-automatic (id=4)
[wiki-sync] wiki-js-content updated: /wiki-js-content/test-wiki-sync-automatic
```

**Verify:**
- Wiki.js page reflects new content
- `lastSyncedAt` updated in Strapi
- `wikiPageId` remains the same

---

### **Test 5: Sync Disabled**

**Purpose:** Ensure entries with `syncToWiki=false` are not synced

**Steps:**
1. Create new wiki-js-content entry
2. Set `syncToWiki` = **Disabled** (OFF)
3. Save and Publish

**Expected:**
- No sync logs appear
- No errors
- `lastSyncStatus`, `wikiPageId` remain empty

---

### **Test 6: Delete Sync**

**Purpose:** Test page deletion in Wiki.js when Strapi entry is deleted

**Steps:**
1. Delete the test entry from Test 2
2. Check logs

**Expected Logs:**
```
[wiki-sync] page deleted (wikiPageId=4)
```

**Verify in Wiki.js:**
- Page no longer exists at the path
- Returns 404 when accessed

---

## 🔍 **Troubleshooting**

### **Issue: Sync Status = "failed"**

**Solution:** Check `lastSyncError` field in Strapi entry for details

**Common Errors:**

| Error Message | Cause | Solution |
|---------------|-------|----------|
| "Wiki.js sync is disabled or misconfigured" | Missing env variables | Add WIKI_* variables on Render.com |
| "Wiki.js API token or GraphQL URL is missing" | Empty env variables | Check variable values |
| "GraphQL Error: ..." | Wiki.js API issue | Check API token permissions |
| "HTTP error! status: 401" | Invalid token | Regenerate API token in Wiki.js |
| "HTTP error! status: 403" | Permission denied | Grant `write:pages` permission to API key |

---

### **Issue: No Logs Appearing**

**Possible Causes:**
1. `WIKI_SYNC_ENABLED` not set to `"true"` (case-sensitive)
2. `syncToWiki` toggle is OFF in Strapi entry
3. Strapi backend hasn't restarted after env variable changes

**Solution:**
- Verify `WIKI_SYNC_ENABLED=true` on Render.com
- Manually restart service on Render.com
- Check Render.com logs for startup messages

---

### **Issue: Page Not Created in Wiki.js**

**Possible Causes:**
1. API token lacks `write:pages` permission
2. Path conflicts with existing page
3. GraphQL query failed

**Solution:**
1. Go to Wiki.js Admin → API Access
2. Verify API key has these permissions:
   - ✅ `read:pages`
   - ✅ `write:pages`
   - ✅ `manage:pages`
3. Check `lastSyncError` in Strapi for specific error
4. Try manual sync endpoint for more details

---

### **Issue: Connection Test Returns "disabled"**

**Response:**
```json
{
  "status": "disabled",
  "message": "WIKI_SYNC_ENABLED is not set to \"true\"",
  "config": {
    "WIKI_SYNC_ENABLED": "false",
    "WIKI_BASE_URL": "✗ Missing",
    ...
  }
}
```

**Solution:**
1. Go to Render.com → acumen-strapi-beta → Environment
2. Add or update `WIKI_SYNC_ENABLED=true`
3. Save and wait for redeploy
4. Test again after deployment completes

---

## 📊 **Success Criteria**

After completing all tests, you should have:

- ✅ Connection test returns `"status": "connected"`
- ✅ New wiki-js-content entries sync automatically
- ✅ Updates sync to existing Wiki.js pages
- ✅ Sync status fields populated correctly in Strapi
- ✅ No errors in Strapi logs
- ✅ Pages visible and correct in Wiki.js
- ✅ Manual sync endpoint works
- ✅ Preview URLs no longer return 404

---

## 🚀 **API Endpoints Reference**

### **1. Test Connection**
```
GET /api/wiki-js-contents/test-connection
Authorization: Bearer <strapi-token>
```

### **2. Manual Sync**
```
POST /api/wiki-js-contents/:documentId/sync
Authorization: Bearer <strapi-token>
```

### **3. List Wiki Content**
```
GET /api/wiki-js-contents
Authorization: Bearer <strapi-token>
```

### **4. Get Single Entry**
```
GET /api/wiki-js-contents/:documentId
Authorization: Bearer <strapi-token>
```

---

## 📝 **How Sync Works**

### **Automatic Sync Triggers:**

The Document Service Middleware in `backend/src/index.ts` watches for these actions:
- `create` - New entry created
- `update` - Entry modified
- `publish` - Entry published

### **Sync Flow:**

1. User creates/updates wiki-js-content with `syncToWiki=true`
2. Middleware intercepts the action
3. `syncWikiJsContent()` is called
4. Config validation runs
5. Query Wiki.js to check if page exists
6. If exists: Update page via GraphQL mutation
7. If new: Create page via GraphQL mutation
8. Write sync status back to Strapi:
   - `lastSyncStatus` = "success" or "failed"
   - `lastSyncedAt` = current timestamp
   - `wikiPageId` = Wiki.js page ID
   - `lastSyncError` = error message (if failed)

### **Path Generation:**

Default path: `/wiki-js-content/{slug}`

Custom path: Set `wikiPath` field in Strapi entry

---

## 🔐 **Security Notes**

- API token is stored in environment variables (not in code)
- Token has limited permissions (pages only)
- Token expires in ~3 years (check `exp` in JWT)
- Strapi enforces authentication on all endpoints
- Wiki.js pages can be set private via `WIKI_DEFAULT_PRIVATE=true`

---

## 📞 **Support**

If issues persist after following this guide:
1. Check Render.com deployment logs
2. Check Strapi server logs
3. Verify Wiki.js is accessible
4. Test API token with manual GraphQL query
5. Review `lastSyncError` field in failed entries

---

**Last Updated:** 2024-03-20
**Wiki.js Instance:** https://wiki-js.ops.glynac.ai
**Strapi Instance:** https://acumen-strapi-beta.onrender.com
