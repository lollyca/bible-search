//king james de4e12af7f28f599-02
import { ChangeEvent, KeyboardEvent, useEffect, useState } from "react";
import { Verse } from "../model/verse";
import BasicCard from "./basic-card";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

import "../styles.css"

import { Autocomplete } from '@mui/material';
import { BibleVersion, bibleVersionsList } from '../model/bible-versions';

const DEFAULT_BIBLE = bibleVersionsList.find(x => x.label.toLowerCase().includes('king james'));

export default function TestFetcher() {
    const [searchText, setTextSearch] = useState("");
    const [firstSearch, setFirstSearch] = useState(true);
    const [versesArray, setVersesArray] = useState<Verse[]>([]);
    const [bibleVersion, setBibleVersion] = useState(DEFAULT_BIBLE?.id);

    useEffect(() => {
        fetchSomething();
    }, [searchText, bibleVersion])

    const updateTextSearch = (e: ChangeEvent<HTMLInputElement>) => {
        setTextSearch(e.target.value);
    };

    function updateBibleVersion(_: any, value: BibleVersion | null) {
        setBibleVersion(value?.id);
    }

    async function fetchSomething() {
        setVersesArray([]);

        const url = `api/search?query=${searchText}&bibleId=${bibleVersion}`;
        try {
            const response = await fetch(url);
            const result = await response.json();
            const verses = result.verses as Verse[];
            setVersesArray(verses);
            setFirstSearch(false);
        } catch (error) {
            console.error(error);
        }
    }

    function onTextKeyDown(e: KeyboardEvent) {
        if (e.key === 'Enter') {
            e.preventDefault();
            fetchSomething();
        }
    }

    return (
        <div>
            <div className="bgBrand">
                <div className="d-flex justify-content-center pt-4 mainText" style={{ fontSize: "xxx-large" }}>Key Word:</div>

                <div className="d-flex justify-content-center align-items-center pb-3">

                    <Box

                        component="form"
                        sx={{
                            '& > :not(style)': { m: 1, width: '50ch' },
                        }}
                        noValidate
                        autoComplete="off"

                    >
                        <TextField id="outlined-basic" bibleversion={bibleVersion} onKeyDown={onTextKeyDown} value={searchText} onChange={updateTextSearch} label="Search" variant="filled" />
                    </Box>


                    <Stack direction="row" sx={{ height: "56px" }}>
                        <Button onClick={fetchSomething} variant="contained" color="primary">
                            <SearchOutlinedIcon />
                        </Button>
                    </Stack>
                </div>

            </div>

            <div>
                <Autocomplete
                    disablePortal
                    id="bible-choice-list"
                    options={bibleVersionsList}
                    defaultValue={DEFAULT_BIBLE}
                    sx={{ width: 400 }}
                    onChange={updateBibleVersion}
                    renderInput={(params) => <TextField {...params} label="Bible Version" />}
                />
            </div>
            {versesArray.length > 0 && versesArray.map((verse) => {
                return <BasicCard key={verse.id} match={searchText} text={verse.text} reference={verse.reference} />
            })}

            {!firstSearch && versesArray.length === 0 &&
                <div className="h-100 w-100 d-flex justify-content-center align-items-center">
                    <h5>Nothing here :(</h5>
                </div>
            }

        </div>
    )
}
