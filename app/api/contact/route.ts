import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // Basic validation
        const requiredFields = ['companyName', 'contactName', 'role', 'email', 'firmSize', 'interest', 'message'];
        for (const field of requiredFields) {
            if (!body[field]) {
                return NextResponse.json(
                    { error: `Missing required field: ${field}` },
                    { status: 400 }
                );
            }
        }

        const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
        const userAgent = request.headers.get('user-agent') || 'unknown';

        const serverLog = {
            ...body,
            submittedAt: new Date().toISOString(),
            userAgent,
            forwardedIp: ip,
        };

        console.log('New Contact Submission:', JSON.stringify(serverLog, null, 2));

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Contact API error:', error);
        return NextResponse.json(
            { error: 'Invalid request' },
            { status: 400 }
        );
    }
}
