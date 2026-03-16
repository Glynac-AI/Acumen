import { factories } from '@strapi/strapi';

const ARTICLE_POPULATE = {
  author: {
    populate: {
      photo: {
        fields: ['url', 'alternativeText', 'width', 'height', 'formats'],
      },
    },
  },
  featuredImage: {
    fields: ['url', 'alternativeText', 'width', 'height', 'formats'],
  },
  category:     { fields: ['name', 'slug'] },
  pillar:       { fields: ['name', 'slug'] },
  tags:         { fields: ['name', 'slug'] },
  subcategories:{ fields: ['name', 'slug'] },
  tenant:       { fields: ['name', 'slug'] },
  seo: {
    populate: {
      ogImage: { fields: ['url', 'alternativeText', 'width', 'height'] },
    },
  },
} as const;

// @ts-ignore
export default factories.createCoreController('api::article.article', () => ({
  async find(ctx: any) {
    ctx.query.populate = ARTICLE_POPULATE;
    return super.find(ctx);
  },
  async findOne(ctx: any) {
    ctx.query.populate = ARTICLE_POPULATE;
    return super.findOne(ctx);
  },
}));
