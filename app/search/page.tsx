import { Box, Button, Checkbox, FormControl, InputLabel, ListItemText, MenuItem, OutlinedInput, Select, Stack, TextField } from '@mui/material';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import BasicCard from '../components/basic-card';
import { AutocompleteComponent } from '../components/autocomplete';
import { queryVerses } from '../services/bible-service';
import MultipleSelectCheckmarks from '../components/multiple-select-checkmarks';
import { Verse } from '../model/verse';
import '../styles.css'

interface SearchPageProps {
    searchParams: {
        text: string;
        bibleVersion: string;

        /** List of books to filter in, separated by comma. If empty, no filter */
        booksFilter: string;
    }
}

function filterVerses(versesArray: Verse[], booksArray: string[]) {
    // example: ['1JN', 'JHN'].includes('1JN') - true
    // example: ['1JN', 'JHN'].includes('poo') - false
    return versesArray.filter(verseObject => booksArray.includes(verseObject.bookId));
}

export default async function Search({ searchParams }: SearchPageProps) {

    const { text, bibleVersion, booksFilter } = searchParams;
    let versesArray = await queryVerses(text, bibleVersion);

    const bookIdSet = new Set<string>();
    function gettingLabels() {
        versesArray.length > 0 && versesArray.map((verse) => {
            if (!bookIdSet.has(verse.bookId)) {
                bookIdSet.add(verse.bookId)
            }
        })
    }
    gettingLabels();
    const bookIdArray = Array.from(bookIdSet);

    // we expect booksFilter to be a string like '1JN,JHN'
    const booksArray = booksFilter?.split(',').filter(x => !!x) || [];

    if (booksArray.length > 0) {
        versesArray = filterVerses(versesArray, booksArray);
    }

    return (
        <div className="h-100 d-flex flex-column p-0">
            <div style={{ border: "1px solid #c3b9b970" }}>
                <form action="/search" method="GET">
                    <div className="bg-brand row justify-content-center">
                        <div className="col-xs-12 col-sm-8 col-md-7 col-lg-6 col-xl-4">

                            <div className="d-flex p-3">
                                <TextField name="text" defaultValue={text} label="Search" variant="filled" className="me-2 w-100" />
                                <Button style={{ height: '56px' }} type="submit" variant="contained" color="primary">
                                    <SearchOutlinedIcon />
                                </Button>
                            </div>

                        </div>
                    </div>
                    <div className="row justify-content-center mx-0">
                        <div className="col-xs-12 col-md-6 col-lg-5 col-xl-3 px-3 pt-3">
                            <AutocompleteComponent />
                        </div>

                        <div className="col-xs-12 col-md-6 col-lg-5 col-xl-3 px-3 py-3">
                            <MultipleSelectCheckmarks booksArray={bookIdArray} initialSelectedBooks={booksArray} />
                        </div>
                    </div>
                </form>
            </div>

            <div className="ps-3 footer-text">Results: {versesArray.length.toString()}</div>


            <div style={{ overflowY: "scroll", flex: '2' }} >
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
    );
}

