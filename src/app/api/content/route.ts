import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { Content } from '@/models';

// GET: Fetch all content
export async function GET(req: NextRequest) {
    try {
        await dbConnect();
        const content = await Content.find({});
        return NextResponse.json({ data: content });
    } catch (error) {
        console.error('Failed to fetch content:', error);
        return NextResponse.json({ data: [] });
    }
}

// POST: Update or Create content
export async function POST(req: NextRequest) {
    try {
        // Auth check should be done via middleware/cookies typically, 
        // but middleware handles the route protection.

        await dbConnect();
        const body = await req.json();
        const { section, title, body: contentBody } = body;

        const updated = await Content.findOneAndUpdate(
            { section },
            { title, body: contentBody, lastUpdated: new Date() },
            { upsert: true, new: true }
        );

        return NextResponse.json({ success: true, data: updated });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update content' }, { status: 500 });
    }
}
