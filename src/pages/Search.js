import axios from "axios";
import { useState } from "react"


function Search() {
    const [search, setSearch] = useState("")
    const [results, setResults] = useState({})
    const API_URL = "http://localhost:5005";


    const handleSearchInput = e => setSearch(e.target.value)
    const handleSearchSubmit = (e) => {
        e.preventDefault();
        const requestBody = { search };
        axios
            .get(`${API_URL}/users?username=${requestBody}`, requestBody)
            .then((users) => {
                if (users) {
                    setResults(users)
                }
                else {
                    axios.get(`${API_URL}/articles?content=${search}`)
                        .then((articles) => {
                            if (articles) {
                                setResults(articles)
                            }
                        })
                        .catch(err => console.log(err))
                }

            })
            .catch(err => console.log(err));
    };

    return (
        < div className="Search" >
            <form onSubmit={handleSearchSubmit}>
                <input type="text" name="search" value={search} onChange={handleSearchInput} />
                <button type="submit">Search</button>
            </form>
        </div >
    )
}

export default Search