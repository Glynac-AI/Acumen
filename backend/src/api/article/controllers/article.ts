import { factories } from '@strapi/strapi';

const ARTICLE_POPULATE = {
  author: {
    fields: ['name', 'title', 'bio', 'slug', 'linkedin', 'twitter', 'email'],
    populate: {
      photo: {
        fields: ['url', 'alternativeText', 'width', 'height', 'formats'],
      },
    },
  },
  featuredImage: {
    fields: ['url', 'alternativeText', 'width', 'height', 'formats'],
  },
  category: {
    fields: ['name', 'slug', 'subtitle', 'description', 'order'],
    populate: {
      details: true, // component array — must be explicitly populated
    },
  },
  pillar:       { fields: ['name', 'slug'] },
  tags:         { fields: ['name', 'slug'] },
  subcategories: {
    fields: ['name', 'slug', 'description'],
    populate: {
      category: { fields: ['id', 'name', 'slug'] }, // needed for categoryId
    },
  },
  tenant:       { fields: ['name', 'slug'] },
  seo: {
    populate: {
      ogImage: { fields: ['url', 'alternativeText', 'width', 'height'] },
    },
  },
} as const;

/**
 * Log a warning for any article whose author relation is null.
 * This helps editors identify legacy articles that must be updated in Strapi Admin.
 */
function warnMissingAuthors(articles: any[]): void {
  for (const article of articles) {
    if (!article.author) {
      strapi.log.warn(
        `[ARTICLE MISSING AUTHOR] ` +
        `title="${article.title}" | id=${article.id} | documentId=${article.documentId} | slug="${article.slug}" — ` +
        `ACTION REQUIRED: Open Strapi Admin → Articles → find this article → assign an Author → Save & Publish.`
      );
    }
  }
}

// @ts-ignore
export default factories.createCoreController('api::article.article', () => ({
  async find(ctx: any) {
    ctx.query.populate = ARTICLE_POPULATE;
    const result = await super.find(ctx);
    if (result?.data && Array.isArray(result.data)) {
      warnMissingAuthors(result.data);
    }
    return result;
  },
  async findOne(ctx: any) {
    ctx.query.populate = ARTICLE_POPULATE;
    const result = await super.findOne(ctx);
    if (result?.data) {
      warnMissingAuthors([result.data]);
    }
    return result;
  },
}));
