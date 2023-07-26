//king james de4e12af7f28f599-02
import { ChangeEvent, useState } from "react";
import { Verse } from "../model/verse";
import BasicCard from "./basic-card";

export default function TestFetcher() {
    const [searchText, setTextSearch] = useState("love");
    const [versesArray, setVersesArray] = useState<Verse[]>([]);


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
        } catch (error) {
            console.error(error);
        }
    }

    function highlight (text) {
        const regex = new RegExp (searchText, 'gi');
        return text.replace(regex, (match) => `<span className="highlight">${match}</span>`);
    }

    return (
        <div>
            <h1>Key Word:</h1>
            <input type="text" placeholder="username" value={searchText} onChange={updateTextSearch} id="username" />
            <button onClick={fetchSomething}>Click</button>
            <h3>Results:</h3>
                {versesArray.map((verse) => {
                    // let text = verse.text
                    // let finalText = highlight(text);
                    return <BasicCard key={verse.id} match={searchText} text={verse.text} reference={verse.reference} searchText={searchText}/>
                }
                )}
        </div>
    )
}
