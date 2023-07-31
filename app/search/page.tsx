import { Box, Button, Stack, TextField } from '@mui/material';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import BasicCard from '../components/basic-card';
import { queryVerses } from '../services/bible-service';
import '../styles.css'
import { AutocompleteComponent } from '../components/autocomplete';

interface SearchPageProps {
    searchParams: {
        text: string;
        bibleVersion: string;
    }
}

export default async function Search({ searchParams }: SearchPageProps) {

    const { text, bibleVersion } = searchParams;
    const versesArray = await queryVerses(text, bibleVersion);

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

                <div>
                    <AutocompleteComponent />
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
