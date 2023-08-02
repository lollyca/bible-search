import { Verse } from '../model/verse';

/**
 * Sends an api request to api.scripture.api
 * @param searchText the text used for searching
 * @param bibleId example: de4e12af7f28f599-02
 */
export async function queryVerses(searchText: string, bibleId: string) {
    if (!searchText || !bibleId) {
        return [];
    }

    const offset = 0;
    const limit = 1000000;

    const url = `https://api.scripture.api.bible/v1/bibles/${bibleId}/search?query=${searchText}&offset=${offset}&limit=${limit}`;
    const options = {
        method: 'GET',
        headers: {
            'api-key': process.env.BIBLE_API_KEY || ''
        }
    };

    const response = await fetch(url, options);
    const result = await response.json();
    const verses = result.data?.verses as Verse[] || [];
    return verses;
}