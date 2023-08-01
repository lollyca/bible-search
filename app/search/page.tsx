import { Box, Button, Checkbox, FormControl, InputLabel, ListItemText, MenuItem, OutlinedInput, Select, Stack, TextField } from '@mui/material';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import BasicCard from '../components/basic-card';
import { AutocompleteComponent } from '../components/autocomplete';
import { queryVerses } from '../services/bible-service';
import '../styles.css'
import MultipleSelectCheckmarks from '../components/multiple-select-checkmarks';


interface SearchPageProps {
    searchParams: {
        text: string;
        bibleVersion: string;
    }
}

export default async function Search({ searchParams }: SearchPageProps) {

    const { text, bibleVersion } = searchParams;
    const versesArray = await queryVerses(text, bibleVersion);

    const bookIdSet = new Set();
    function gettingLabels() {
        versesArray.length > 0 && versesArray.map((verse) => {
            if (!bookIdSet.has(verse.bookId)) {
                bookIdSet.add(verse.bookId)
            }
        })
    }
    gettingLabels();
    const bookIdArray = [...bookIdSet];

    return (
        <div className="row justify-content-center p-0">
            <div className="row m-0 p-0 h-25">
                <img style={{ objectFit: "cover", height: "300px" }} src="/banner.jpeg" alt="" />
            </div>

            <form action="/search" method="GET">
                <div className="bgBrand">
                    <div className="d-flex justify-content-center pt-4 mainText" style={{ fontSize: "xxx-large" }}>Key Word:</div>
                    <div className="d-flex justify-content-center align-items-center pb-3">
                        <Box component="div"
                            sx={{
                                '& > :not(style)': { m: 1, width: '50ch' },
                            }}
                        >
                            <TextField name="text" defaultValue={text} label="Search" variant="filled" />
                        </Box>

                        <Stack direction="row" sx={{ height: "56px" }}>
                            <Button type="submit" variant="contained" color="primary">
                                <SearchOutlinedIcon />
                            </Button>
                        </Stack>
                    </div>
                </div>

                <div className="p-3">
                    <AutocompleteComponent />
                </div>

                <div className="p-3">
                    <MultipleSelectCheckmarks passedArray={bookIdArray}/>
                </div>
            </form>


            <div>
                {versesArray.length > 0 && versesArray.map((verse) => {
                    return <BasicCard key={verse.id} match={text} text={verse.text} reference={verse.reference} />
                })}
            </div>

            {text && versesArray.length === 0 &&
                <div className="h-100 w-100 d-flex justify-content-center align-items-center">
                    <h5>Nothing here :(</h5>
                </div>
            }
        </div>
    )
}
