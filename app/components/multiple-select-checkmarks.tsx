'use client';

import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { useState } from 'react';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

export type MultipleSelectProps = {
    booksArray: string[],
    initialSelectedBooks: string[]
};

export default function MultipleSelectCheckmarks({ booksArray, initialSelectedBooks }: MultipleSelectProps) {

    const [selectedBooks, setSelectedBooks] = useState<string[]>(initialSelectedBooks);

    // event is an object of type SelectChangeEvent, which carries data as a string[] (look at becobeco)
    function handleChange(event: SelectChangeEvent<string[]>) {
        setSelectedBooks(event.target.value as string[]);
    }

    function doSearch() {
        let address = new URL(window.location.href);
        let searchText = address.searchParams.get('text') || '';
        let bibleVersion = address.searchParams.get('bibleVersion') || '';

        // selectedBooks is an array (line 31) and that's why when we are putting back in the url we need to use join(',')
        const newUrl = `/search?text=${searchText}&bibleVersion=${bibleVersion}&booksFilter=${selectedBooks.join(',')}`;

        window.location.href = newUrl;
    }

    return (
        <FormControl sx={{ m: 1, width: 300 }}>
            <InputLabel>Filter</InputLabel>
            <Select
                multiple
                value={selectedBooks}
                onChange={handleChange}
                onClose={doSearch}
                input={<OutlinedInput name="booksFilter" label="Tag" />}
                renderValue={(selected) => selected.join(', ')}
                MenuProps={MenuProps}
            >
                {booksArray.map((book: string) => (
                    <MenuItem key={book} value={book}>
                        <Checkbox checked={selectedBooks.includes(book)} />
                        <ListItemText primary={book} />
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}