'use client';

import { Autocomplete, TextField } from '@mui/material';
import { BibleVersion, bibleVersionsList } from '../model/bible-versions';
import { useEffect, useState } from 'react';

const DEFAULT_BIBLE = bibleVersionsList.find(x => x.label.toLowerCase().includes('king james'));

export function AutocompleteComponent() {

    const [bibleVersionId, setBibleVersionId] = useState<string | undefined>(DEFAULT_BIBLE?.id);
    const [bibleVersion, setBibleVersion] = useState<BibleVersion | undefined>(DEFAULT_BIBLE);

    useEffect(() => {
        let address = new URL(window.location.href);
        let id = address.searchParams.get('bibleVersion') || '';
        const bible = bibleVersionsList.find(x => x.id === id);

        setBibleVersionId(bible?.id);
        setBibleVersion(bible);
    }, []);

    function updateBibleVersion(_: any, value: BibleVersion | null) {
        if (value) {
            setBibleVersionId(value.id);
            setBibleVersion(value);
        }
    }

    return (
        <div>
            <Autocomplete
                disablePortal
                id="bible-choice-list"
                options={bibleVersionsList}
                value={bibleVersion}
                sx={{ width: 400 }}
                onChange={updateBibleVersion}
                renderInput={(params) => <TextField {...params} label="Bible Version" />}
            />
            <input className="d-none" name="bibleVersion" defaultValue={bibleVersionId} />
        </div>
    );
}