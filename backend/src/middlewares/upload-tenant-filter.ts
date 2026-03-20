/**
 * Upload Tenant Filter Middleware - Strapi 5.35.0
 *
 * Enforces tenant-based isolation for Media Library:
 *   1. Filters GET /upload/files → show only user's folder files
 *   2. Filters GET /upload/folders → show only user's folder
 *   3. Enforces folder on POST /upload → force uploads to user's folder
 *   4. Blocks cross-folder access attempts (except superadmin)
 *
 * Folder Assignment:
 *   - Tenant-based: Resolved from user's tenant relation
 *   - Role-based: wiki-js-admin → /wiki-js folder
 *   - Email fallback: Hard-coded mapping
 *
 * Wiki.js Admin:
 *   - Access: /wiki-js folder only
 *   - Can upload, update, download, AND DELETE files
 *   - Cannot see other tenants' folders
 *
 * Superadmins bypass ALL restrictions.
 */

import type { Core } from '@strapi/strapi';

// ─── Configuration ──────────────────────────────────────────────────────────

/** Tenant slug to folder path mapping */
const TENANT_FOLDERS: Record<string, string> = {
  'glynac-ai': '/glynac-ai',
  'sylvan': '/sylvan',
  'regulatethis': '/regulatethis',
};

/** Role code to folder path mapping (for non-tenant roles) */
const ROLE_FOLDER_MAPPING: Record<string, string> = {
  'wiki-js-admin': '/wiki-js',
};

/** Email to folder path fallback */
const EMAIL_FOLDER_FALLBACK: Record<string, string> = {
  'wikiadmin@glynac.ai': '/wiki-js',
  'glynacadmin@glynac.ai': '/glynac-ai',
  'admin@sylvannotes.com': '/sylvan',
  'admin@regulatethis.com': '/regulatethis',
};

// ─── Helper Functions ───────────────────────────────────────────────────────

/** Resolve admin user with roles and tenant populated */
async function resolveAdminUser(ctx: any, strapi: Core.Strapi): Promise<any | null> {
  const userId = ctx.state?.user?.id;
  if (!userId) return null;
  try {
    return await strapi.db.query('admin::user').findOne({
      where: { id: userId },
      populate: ['tenant', 'roles'],
    });
  } catch (error) {
    strapi.log.error('[Upload RBAC] Error resolving admin user:', error);
    return null;
  }
}

/** Get allowed folder path for admin user */
function getAllowedFolderPath(adminUser: any): string | null {
  // Priority 1: Role-based folder (e.g., wiki-js-admin)
  for (const role of adminUser.roles || []) {
    if (ROLE_FOLDER_MAPPING[role.code]) {
      return ROLE_FOLDER_MAPPING[role.code];
    }
  }

  // Priority 2: Tenant-based folder
  const tenantSlug = adminUser.tenant?.slug;
  if (tenantSlug && TENANT_FOLDERS[tenantSlug]) {
    return TENANT_FOLDERS[tenantSlug];
  }

  // Priority 3: Email fallback
  if (adminUser.email) {
    const email = adminUser.email.toLowerCase().trim();
    if (EMAIL_FOLDER_FALLBACK[email]) {
      return EMAIL_FOLDER_FALLBACK[email];
    }
  }

  return null;
}

// ─── Middleware ─────────────────────────────────────────────────────────────

export default (config: Record<string, unknown>, { strapi }: { strapi: Core.Strapi }) => {
  return async (ctx: any, next: () => Promise<void>) => {
    const url: string = ctx.url || '';
    const method: string = ctx.request?.method || 'GET';

    // Only intercept upload plugin routes
    if (!url.startsWith('/upload/')) {
      return next();
    }

    // Resolve admin user
    const adminUser = await resolveAdminUser(ctx, strapi);
    if (!adminUser) {
      return next(); // Not authenticated or not admin user
    }

    // Superadmins bypass all restrictions
    const isSuperAdmin = adminUser.roles?.some((r: any) => r.code === 'strapi-super-admin');
    if (isSuperAdmin) {
      strapi.log.debug('[Upload RBAC] Superadmin access - no restrictions');
      return next();
    }

    // Get allowed folder for this user
    const allowedFolderPath = getAllowedFolderPath(adminUser);
    if (!allowedFolderPath) {
      strapi.log.warn(`[Upload RBAC] No folder assigned for user: ${adminUser.email}`);
      return next(); // Fail open - let Strapi handle it
    }

    strapi.log.info(
      `[Upload RBAC] ${method} ${url.substring(0, 60)} | user=${adminUser.email} | folder='${allowedFolderPath}'`
    );

    // ═══════════════════════════════════════════════════════════════════════
    // UPWARD CYCLE — Filter response after Strapi processes request
    // ═══════════════════════════════════════════════════════════════════════

    // Intercept GET requests to filter files/folders
    if (method === 'GET' && (url.includes('/files') || url.includes('/folders'))) {
      await next();

      if (ctx.response.status !== 200 || !ctx.body) return;

      try {
        // Handle different response structures
        let items: any[] = [];
        let itemsPath: 'root' | 'results' | 'data' = 'root';

        if (Array.isArray(ctx.body)) {
          items = ctx.body;
          itemsPath = 'root';
        } else if (Array.isArray(ctx.body.results)) {
          items = ctx.body.results;
          itemsPath = 'results';
        } else if (Array.isArray(ctx.body.data)) {
          items = ctx.body.data;
          itemsPath = 'data';
        }

        if (items.length === 0) return;

        const before = items.length;

        // Filter items: only show files/folders in allowed path
        const filtered = items.filter((item: any) => {
          const itemPath = item.folderPath || item.path || '';
          return itemPath.startsWith(allowedFolderPath);
        });

        // Write filtered array back to exact path
        if (itemsPath === 'root') {
          ctx.body = filtered;
        } else if (itemsPath === 'results') {
          ctx.body.results = filtered;
        } else {
          ctx.body.data = filtered;
        }

        strapi.log.info(`[Upload RBAC] Filtered: ${before} → ${filtered.length} items`);
      } catch (error) {
        strapi.log.error('[Upload RBAC] Error filtering upload response:', error);
      }
      return;
    }

    // ═══════════════════════════════════════════════════════════════════════
    // DOWNWARD CYCLE — Enforce folder on file uploads
    // ═══════════════════════════════════════════════════════════════════════

    if (method === 'POST' && url.startsWith('/upload')) {
      // Get folder ID for the allowed path
      const folder = await strapi.db.query('plugin::upload.folder').findOne({
        where: { path: allowedFolderPath },
      });

      if (!folder) {
        strapi.log.error(`[Upload RBAC] Folder not found for path: ${allowedFolderPath}`);
        ctx.status = 500;
        ctx.body = {
          error: {
            status: 500,
            name: 'ConfigurationError',
            message: 'Upload folder not configured. Please contact administrator.',
          },
        };
        return;
      }

      // Inject folder ID into the request body
      // This ensures all uploads go to the user's assigned folder
      if (!ctx.request.body) ctx.request.body = {};
      ctx.request.body.folder = folder.id;

      strapi.log.info(`[Upload RBAC] Forcing upload to folder: ${allowedFolderPath} (id=${folder.id})`);
    }

    // ═══════════════════════════════════════════════════════════════════════
    // DELETE PROTECTION - Verify user can only delete from their folder
    // ═══════════════════════════════════════════════════════════════════════

    if (method === 'DELETE' && url.includes('/files/')) {
      // Extract file ID from URL
      const fileIdMatch = url.match(/\/files\/(\d+)/);
      if (fileIdMatch) {
        const fileId = parseInt(fileIdMatch[1], 10);
        
        // Check if file belongs to user's folder
        const file = await strapi.db.query('plugin::upload.file').findOne({
          where: { id: fileId },
          populate: ['folder'],
        });

        if (file) {
          const fileFolderPath = file.folderPath || '';
          if (!fileFolderPath.startsWith(allowedFolderPath)) {
            strapi.log.warn(
              `[Upload RBAC] DELETE blocked: user=${adminUser.email} tried to delete file from ${fileFolderPath}`
            );
            ctx.status = 403;
            ctx.body = {
              error: {
                status: 403,
                name: 'ForbiddenError',
                message: 'You can only delete files from your assigned folder.',
              },
            };
            return;
          }
        }
      }
    }

    return next();
  };
};
