import { ChangeEvent, KeyboardEvent, useEffect, useState } from "react";
import { Box, Button, Stack, TextField } from '@mui/material';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import HomeIcon from '@mui/icons-material/Home';
import "../styles.css"

import { BibleVersion, bibleVersionsList } from '../model/bible-versions';
import { Verse } from "../model/verse";
import BasicCard from './basic-card';


const DEFAULT_BIBLE = bibleVersionsList.find(x => x.label.toLowerCase().includes('king james'));



export default function LetsGoSearch() {
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

    function onTextKeyDown(e: KeyboardEvent) {
        if (e.key === 'Enter') {
            e.preventDefault();
            fetchSomething();
        }
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

    return (
        <div>
            <div className="bg-brand">
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
                        <TextField id="outlined-basic" onKeyDown={onTextKeyDown} value={searchText} onChange={updateTextSearch} label="Search" variant="filled" />
                    </Box>


                    <Stack direction="row" sx={{ height: "56px" }}>
                        <Button onClick={fetchSomething} variant="contained" color="primary">
                            <SearchOutlinedIcon />
                        </Button>
                    </Stack>
                    <Stack direction="row">
                        <a href="/search"><Button sx={{ height: "56px" }} variant="contained" color="primary">
                            <HomeIcon />
                        </Button></a>
                    </Stack>
                </div>
                {versesArray.length > 0 && versesArray.map((verse) => {
                    return <BasicCard key={verse.id} match={searchText} text={verse.text} reference={verse.reference} />
                })}
            </div>
        </div>
    )
}