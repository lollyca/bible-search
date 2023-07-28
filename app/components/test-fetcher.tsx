//king james de4e12af7f28f599-02
import { ChangeEvent, KeyboardEvent, useState } from "react";
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


export default function TestFetcher() {
    const [searchText, setTextSearch] = useState("");
    const [firstSearch, setFirstSearch] = useState(true);
    const [versesArray, setVersesArray] = useState<Verse[]>([]);
    // const [isClicked, setIsClicked] = useState(false);
    const [bibleVersion, setBibleVersion] = useState("de4e12af7f28f599-02");

    const updateTextSearch = (e: ChangeEvent<HTMLInputElement>) => {
        setTextSearch(e.target.value);
    };

    function updateBibleVersion(_: any, value: BibleVersion | null) {
        //get bible id from Combo-Box Component
        //send the ID to the Search
        console.log('bleeh', value);
    }

    async function fetchSomething() {
        const url = `api/search?query=${searchText}&`
        try {
            const response = await fetch(url);
            const result = await response.json();
            const verses = result.verses as Verse[];
            console.log(verses)
            setVersesArray(verses);
            // setIsClicked(true);
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




                {/* {isClicked && <h3>Results:</h3>} */}
                {versesArray.length > 0 && versesArray.map((verse) => {
                    // let text = verse.text
                    // let finalText = highlight(text);
                    return <BasicCard key={verse.id} match={searchText} text={verse.text} reference={verse.reference} />
                })}


            </div>
            {!firstSearch && versesArray.length === 0 &&
                <div className="h-100 w-100 d-flex justify-content-center align-items-center">
                    <h5>Nothing here :(</h5>
                </div>
            }
            <div>
                <Autocomplete
                    disablePortal
                    id="bible-choice-list"
                    options={bibleVersionsList}
                    sx={{ width: 400 }}
                    onChange={updateBibleVersion}
                    renderInput={(params) => <TextField {...params} label="Bible Version" />}
                />
            </div>
        </div>
    )
}
