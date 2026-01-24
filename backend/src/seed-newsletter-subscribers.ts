/**
 * Seed Newsletter Subscribers
 * 
 * This script creates sample newsletter subscribers in the database.
 * Run with: npm run strapi -- seed-newsletter-subscribers
 */

import fs from 'fs';
import path from 'path';

export default async ({ strapi }) => {
    console.log('🌱 Seeding newsletter subscribers...');

    try {
        // Get the first tenant (or create a default one if needed)
        const tenants = await strapi.entityService.findMany('api::tenant.tenant', {
            limit: 1,
        });

        if (!tenants || tenants.length === 0) {
            console.error('❌ No tenant found. Please create a tenant first.');
            return;
        }

        const defaultTenant = tenants[0];
        console.log(`📍 Using tenant: ${defaultTenant.name || defaultTenant.id}`);

        // Load sample data
        const sampleDataPath = path.join(__dirname, '..', 'sample-newsletter-subscribers.json');
        const sampleData = JSON.parse(fs.readFileSync(sampleDataPath, 'utf-8'));

        let created = 0;
        let skipped = 0;

        for (const subscriber of sampleData) {
            try {
                // Check if subscriber already exists
                const existing = await strapi.entityService.findMany(
                    'api::newsletter-subscriber.newsletter-subscriber',
                    {
                        filters: { email: subscriber.email },
                        limit: 1,
                    }
                );

                if (existing && existing.length > 0) {
                    console.log(`⏭️  Skipping ${subscriber.email} (already exists)`);
                    skipped++;
                    continue;
                }

                // Create the subscriber
                await strapi.entityService.create(
                    'api::newsletter-subscriber.newsletter-subscriber',
                    {
                        data: {
                            ...subscriber,
                            tenant: defaultTenant.id,
                        },
                    }
                );

                console.log(`✅ Created subscriber: ${subscriber.email}`);
                created++;
            } catch (error) {
                console.error(`❌ Failed to create ${subscriber.email}:`, error.message);
            }
        }

        console.log('\n📊 Summary:');
        console.log(`   ✅ Created: ${created}`);
        console.log(`   ⏭️  Skipped: ${skipped}`);
        console.log(`   📧 Total: ${sampleData.length}`);
        console.log('\n✨ Newsletter subscribers seeding completed!');

    } catch (error) {
        console.error('❌ Error seeding newsletter subscribers:', error);
        throw error;
    }
};
