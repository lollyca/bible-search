//king james de4e12af7f28f599-02
import { useState } from "react";
export default function TestFetcher() {
    const [searchText, setTextSearch] = useState("love");
    const [versesArray, setVersesArray] = useState([]);


    const updateTextSearch = (evt) => {
        setTextSearch(evt.target.value);
    };
    console.log(searchText)

    async function fetchSomething() {
        const offset = 300;
        const url = `https://api.scripture.api.bible/v1/bibles/de4e12af7f28f599-02/search?query=${searchText}&offset=${offset}`;
        const options = {
            method: 'GET',
            headers: {
                'api-key': 'bf3a8b1c3880ddc6f61cfd9e1ead8fe9'
            }
        };

        try {
            const response = await fetch(url, options);
            const result = await response.json();
            const verses = result.data.verses
            console.log(verses);
            setVersesArray(verses);
        } catch (error) {
            console.error(error);
        }
    }


    return (
        <div>
            <h1>Key Word:</h1>
            <input type="text" placeholder="username" value={searchText} onChange={updateTextSearch} id="username" />
            <button onClick={fetchSomething}>Click</button>
            <h3>Results:</h3>
            <ul>
                {versesArray.map((verse) => (
                    <li key={verse.id}>{verse.text}</li>
                ))}
            </ul>
        </div>
    )
}
