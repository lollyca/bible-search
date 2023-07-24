//king james de4e12af7f28f599-02
import { useState } from "react";
export default function TestFetcher() {
    const [searchText, setTextSearch] = useState("love")
    
    const updateTextSearch = (evt) => {
        setTextSearch(evt.target.value);
    };
    console.log(searchText)

    async function fetchSomething() {
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
            <h1>Pega o livro</h1><input type="text" placeholder="username" valeu={searchText} onChange={updateTextSearch} id="username"/>
            <button onClick={fetchSomething}>Click</button>
        </div>
    )
}

// export default function UserNameForm() {
//     const [username, setUserName] = useState("lelo");
//     const updateUserName = (evt) => {
//       setUserName(evt.target.value);
//     } ;
//     return (
//       <div>
//         <label htmlFor="username">Enter a username</label>
//         <input type="text" placeholder="username" valeu={username} onChange={updateUserName} id="username"/>
//       </div>
//     )
//   }