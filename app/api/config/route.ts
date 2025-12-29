import { NextResponse } from 'next/server';

/**
 * Runtime config endpoint
 * Returns environment variables that need to be available client-side at runtime
 * This bypasses Next.js's build-time inlining of NEXT_PUBLIC_* variables
 */
export async function GET() {
    return NextResponse.json({
        strapiUrl: process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:5603',
        strapiToken: process.env.NEXT_PUBLIC_STRAPI_API_TOKEN || '',
    });
}
