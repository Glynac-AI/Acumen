import { NextRequest, NextResponse } from 'next/server';

/**
 * Test endpoint to verify Strapi connection
 * GET /api/strapi/test
 */
export async function GET(request: NextRequest) {
    try {
        // Try to fetch from Strapi root endpoint
        const response = await fetch('http://strapi.bastion.glynac.ai:1337');

        if (!response.ok) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'Failed to connect to Strapi',
                    status: response.status,
                    statusText: response.statusText
                },
                { status: 500 }
            );
        }

        return NextResponse.json({
            success: true,
            message: 'Successfully connected to Strapi',
            strapiUrl: 'http://strapi.bastion.glynac.ai:1337',
            timestamp: new Date().toISOString(),
        });
    } catch (error) {
        console.error('Strapi connection test failed:', error);

        return NextResponse.json(
            {
                success: false,
                message: 'Error connecting to Strapi',
                error: error instanceof Error ? error.message : 'Unknown error'
            },
            { status: 500 }
        );
    }
}
