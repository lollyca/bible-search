//king james de4e12af7f28f599-02
import { ChangeEvent, useState } from "react";
import { Verse } from "../model/verse";
import BasicCard from "./basic-card";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

import "../styles.css"


export default function TestFetcher() {
    const [searchText, setTextSearch] = useState("");
    const [versesArray, setVersesArray] = useState<Verse[]>([]);
    const [isClicked, setIsClicked] = useState(false);
    


    const updateTextSearch = (e: ChangeEvent<HTMLInputElement>) => {
        setTextSearch(e.target.value);
    };

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
        <div className="bgBrand">
            <div className="d-flex justify-content-center mt-4 mainText" style={{fontSize: "xxx-large"}}>Key Word:</div>

            <div className="d-flex justify-content-center align-items-center mb-3">

                <Box
                    component="form"
                    sx={{
                        '& > :not(style)': { m: 1, width: '50ch'},
                    }}
                    noValidate
                    autoComplete="off"
                    
                >
                    <TextField id="outlined-basic" value={searchText} onChange={updateTextSearch} label="Search" variant="filled" />
                </Box>


                <Stack direction="row" sx={{ height: "56px" }}>
                    <Button onClick={fetchSomething} variant="contained" color="primary">
                    <SearchOutlinedIcon />
                    </Button>
                </Stack>
            </div>




            {/* {isClicked && <h3>Results:</h3>} */}
            {versesArray.map((verse) => {
                // let text = verse.text
                // let finalText = highlight(text);
                return <BasicCard key={verse.id} match={searchText} text={verse.text} reference={verse.reference} />
            }
            )}
        </div>
    )
}
