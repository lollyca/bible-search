import { Button, TextField } from '@mui/material';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { bibleVersionsList } from '../model/bible-versions';
import '../styles.css';

const DEFAULT_BIBLE = bibleVersionsList.find(x => x.label.toLowerCase().includes('king james'));

export default function LetsGoSearch() {

    return (

        <div className="d-flex justify-content-center align-items-center h-100">

            <div className="row w-100 justify-content-center">
                <div className="col-xs-12 col-sm-8 col-md-6 col-xl-5">
                    <div className="text-center pt-4 main-text" style={{ fontSize: "8vh" }}>Lelo</div>
                    <form action="/search">
                        <input className="d-none" type="text" name="bibleVersion" defaultValue={DEFAULT_BIBLE?.id} />

                        <div className="d-flex justify-content-center align-items-center pb-3">
                            <TextField id="outlined-basic" className="w-100 me-2" defaultValue="" label="Search" variant="filled" name="text" />
                            <Button type="submit" sx={{ height: "56px" }} variant="contained" color="primary">
                                <SearchOutlinedIcon />
                            </Button>

                        </div>
                    </form>
                </div>
            </div>

        </div>

    );
}