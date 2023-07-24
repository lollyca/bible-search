//king james de4e12af7f28f599-02

export default function TestFetcher() {
    async function fetchSomething () {
        const searchText = "will";
        const offset = 10;
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
            console.log(result.data);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div>
            <h1>Pega o livro</h1>
            <button onClick={fetchSomething}>Click</button>
        </div>
    )
}