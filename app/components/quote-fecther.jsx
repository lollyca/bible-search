const RANDOM_QUOTE_URL = "https://inspo-quotes-api.herokuapp.com/quotes/random";
import { useState, useEffect } from "react";

export default function QuoteFetcher () {
    const [quote, setQuote] = useState({});
    
    async function fetchQuote () {
        const response = await fetch(RANDOM_QUOTE_URL);
        const jsonResponse = await response.json();
        const randomQuote = jsonResponse.quote;
        setQuote(randomQuote);
    }
    useEffect(() => {
        fetchQuote();
    }, [])
    
    return (
        <div className="m-5">
            <button onClick={fetchQuote}>Get Verse</button>
            <h1>{quote.text}</h1>
            <h3>{quote.author}</h3>
        </div>
    )
}