import { queryVerses } from '@/app/services/bible-service';
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {

    const u = new URL(request.url);

    const searchText = u.searchParams.get('query') || '';
    const bibleId = u.searchParams.get('bibleId') || '';

    const verses = await queryVerses(searchText, bibleId);

    return NextResponse.json({ verses });
}