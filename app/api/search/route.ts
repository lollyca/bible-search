import { Verse } from '@/app/model/verse';
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {

    const u = new URL(request.url);
    const searchText = u.searchParams.get('query');

    const offset = 300;
    const limit = 100;

    const url = `https://api.scripture.api.bible/v1/bibles/de4e12af7f28f599-02/search?query=${searchText}&offset=${offset}&limit=${limit}`;
    const options = {
        method: 'GET',
        headers: {
            'api-key': process.env.BIBLE_API_KEY || ''
        }
    };

    const response = await fetch(url, options);
    const result = await response.json();

    const verses = result.data.verses as Verse[];
    console.log(`found ${verses?.length} verses`);
    
    return NextResponse.json({ verses });
} 