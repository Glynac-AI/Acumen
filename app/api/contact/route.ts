import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        let body;
        try {
            body = await request.json();
        } catch (e) {
            return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
        }

        const requiredFields = ['companyName', 'contactName', 'role', 'email', 'firmSize', 'interest', 'message'];

        const trimmedBody: Record<string, any> = {};
        for (const [key, value] of Object.entries(body)) {
            if (typeof value === 'string') {
                trimmedBody[key] = value.trim();
            } else {
                trimmedBody[key] = value;
            }
        }

        for (const field of requiredFields) {
            if (!trimmedBody[field]) {
                return NextResponse.json(
                    { error: `Missing required field: ${field}` },
                    { status: 400 }
                );
            }
        }

        if (trimmedBody.sourcePage !== '/contact') {
            return NextResponse.json({ error: 'Invalid sourcePage' }, { status: 400 });
        }

        const consentMarketing = trimmedBody.consentMarketing;
        const consentNonMarketing = trimmedBody.consentNonMarketing;

        if (consentMarketing !== undefined && typeof consentMarketing !== 'boolean') {
            return NextResponse.json({ error: 'consentMarketing must be a boolean' }, { status: 400 });
        }

        if (consentNonMarketing !== undefined && typeof consentNonMarketing !== 'boolean') {
            return NextResponse.json({ error: 'consentNonMarketing must be a boolean' }, { status: 400 });
        }

        if ((consentMarketing === true || consentNonMarketing === true) && !trimmedBody.phone) {
            return NextResponse.json(
                { error: 'A phone number is required when opting into SMS messages.' },
                { status: 400 }
            );
        }

        const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
        const userAgent = request.headers.get('user-agent') || 'unknown';

        const serverLog = {
            companyName: trimmedBody.companyName,
            contactName: trimmedBody.contactName,
            role: trimmedBody.role,
            email: trimmedBody.email,
            phone: trimmedBody.phone || '',
            firmSize: trimmedBody.firmSize,
            interest: trimmedBody.interest,
            message: trimmedBody.message,
            meetingTimes: trimmedBody.meetingTimes || '',
            consentMarketing: Boolean(consentMarketing),
            consentNonMarketing: Boolean(consentNonMarketing),
            sourcePage: trimmedBody.sourcePage,
            submittedAt: new Date().toISOString(),
            userAgent,
            forwardedIp: ip,
        };

        console.log('New Contact Submission:', JSON.stringify(serverLog, null, 2));

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Contact API error:', error);
        return NextResponse.json(
            { error: 'Invalid request payload' },
            { status: 400 }
        );
    }
}
