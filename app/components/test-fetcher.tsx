//king james de4e12af7f28f599-02
import { ChangeEvent, useState } from "react";
import { Verse } from "../model/verse";
import BasicCard from "./basic-card";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function TestFetcher() {
    const [searchText, setTextSearch] = useState("love");
    const [versesArray, setVersesArray] = useState<Verse[]>([]);
    const [isClicked, setIsClicked] = useState(false);


    const updateTextSearch = (e: ChangeEvent<HTMLInputElement>) => {
        setTextSearch(e.target.value);
    };
    console.log(searchText)

    async function fetchSomething() {
        const url = `api/search?query=${searchText}&`
        try {
            const response = await fetch(url);
            const result = await response.json();
            const verses = result.verses as Verse[];
            console.log(verses)
            setVersesArray(verses);
            setIsClicked(true);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div>
            <h1>Key Word:</h1>
            <div className="d-flex align-items-center">

                <Box
                    component="form"
                    sx={{
                        '& > :not(style)': { m: 1, width: '35ch' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField id="outlined-basic" value={searchText} onChange={updateTextSearch} label="Search" variant="outlined" />
                </Box>


                <Stack direction="row" sx={{height: "56px"}}>
                    <Button onClick={fetchSomething} variant="contained">Search</Button>
                </Stack>
            </div>

            {isClicked && <h3>Results:</h3>}
            {versesArray.map((verse) => {
                // let text = verse.text
                // let finalText = highlight(text);
                return <BasicCard key={verse.id} match={searchText} text={verse.text} reference={verse.reference} />
            }
            )}
        </div>
    )
}
