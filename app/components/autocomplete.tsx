'use client';

import { Autocomplete, TextField } from '@mui/material';
import { BibleVersion, bibleVersionsList } from '../model/bible-versions';
import { useEffect, useState } from 'react';

const DEFAULT_BIBLE = bibleVersionsList.find(x => x.label.toLowerCase().includes('king james'));

export function AutocompleteComponent() {

    const [bibleVersion, setBibleVersion] = useState<BibleVersion | undefined>(DEFAULT_BIBLE);

    useEffect(() => {
        let address = new URL(window.location.href);
        let id = address.searchParams.get('bibleVersion') || '';
        const bibleObject = bibleVersionsList.find(x => x.id === id);

        if (bibleObject) {
            setBibleVersion(bibleObject);
        }
    }, []);

    function updateBibleVersion(_: any, value: BibleVersion | null) {
        if (value) {
            let address = new URL(window.location.href);
            let searchText = address.searchParams.get('text') || '';

            const newUrl = `/search?text=${searchText}&bibleVersion=${value.id}`;

            window.location.href = newUrl;
        }
    }

    return (
        <div>
            <Autocomplete
                disablePortal
                id="bible-choice-list"
                options={bibleVersionsList}
                value={bibleVersion}
                onChange={updateBibleVersion}
                renderInput={(params) => (<TextField {...params} label="Bible Version" />)}
                renderOption={(props, option) => (<li {...props} key={option.id}>{option.label}</li>)}
            />
            <input className="d-none" name="bibleVersion" defaultValue={bibleVersion?.id} />
        </div>
    );
}