'use strict';

/**
 * blog-post controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::blog-post.blog-post', ({ strapi }) => ({
  // Custom controller methods can be added here
  
  // Override find to automatically populate relations
  async find(ctx) {
    const { data, meta } = await super.find(ctx);
    return { data, meta };
  },

  // Override findOne to automatically populate relations
  async findOne(ctx) {
    const { data, meta } = await super.findOne(ctx);
    return { data, meta };
  },
}));
