import { ChangeEvent, KeyboardEvent, useEffect, useState } from "react";
import { Box, Button, Stack, TextField } from '@mui/material';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

import "../styles.css"

import { BibleVersion, bibleVersionsList } from '../model/bible-versions';
import { Verse } from "../model/verse";
import { redirect } from 'next/dist/server/api-utils';



const DEFAULT_BIBLE = bibleVersionsList.find(x => x.label.toLowerCase().includes('king james'));



export default function LetsGoSearch() {

    return (
        <div className="d-flex flex-column justify-content-center align-items-center h-100">
            <div className="text-center pt-4 main-text" style={{ fontSize: "xxx-large" }}>Lelo</div>

            <form action="/search">
                <input className="d-none" type="text" name="bibleVersion" defaultValue={DEFAULT_BIBLE?.id} />

                <div className="d-flex justify-content-center align-items-center pb-3">
                    <Box
                        component="div"
                        sx={{
                            '& > :not(style)': { m: 1, width: '50ch' },
                        }}
                    >
                        <TextField id="outlined-basic" defaultValue="" label="Search" variant="filled" name="text"/>
                    </Box>
                    <Stack direction="row">
                        <Button type="submit" sx={{ height: "56px" }} variant="contained" color="primary">
                            <SearchOutlinedIcon />
                        </Button>
                    </Stack>
                </div>
            </form>
        </div>

    )
}