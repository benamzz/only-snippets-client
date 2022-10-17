// import axios from "axios";
// import { useState } from "react"


// function Search() {
//     const [search, setSearch] = useState("")
//     const [results, setResults] = useState({})
//     const API_URL = "http://localhost:5005";


//     const handleSearchInput = e => setSearch(e.target.value)
//     const handleSearchSubmit = (e) => {
//         e.preventDefault();
//         const requestBody = { search };
//         axios
//             .get(`${API_URL}/users?username=${requestBody}`, requestBody)
//             .then((users) => {
//                 if (users) {
//                     setResults(users)
//                 }
//                 else {
//                     axios.get(`${API_URL}/articles?content=${search}`)
//                         .then((articles) => {
//                             if (articles) {
//                                 setResults(articles)
//                             }
//                         })
//                         .catch(err => console.log(err))
//                 }

//             })
//             .catch(err => console.log(err));
//     };

//     return (
//         < div className="Search" >
//             <form onSubmit={handleSearchSubmit}>
//                 <input type="text" name="search" value={search} onChange={handleSearchInput} />
//                 <button type="submit">Search</button>
//             </form>
//         </div >
//     )
// }

// export default Search
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";
import Article from "../components/Article";
import BottomNavbar from "../components/BottomNavbar";
import TopNavbar from "../components/TopNavbar";
import User from "../components/User";

function Search(props) {
    const [user, setUser] = useState(null);
    const [myArticles, setMyArticles] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    const HandleSearch = (e) => setSearchTerm(e.target.value)

    const getUser = useCallback(() => {
        api().get(`/users`)
            .then((users) => {
                console.log("users", users.data)
                setUser(users)
            })
            .catch(err => console.log("err", err));
    }, []);
    useEffect(() => {
        getUser();
    }, [getUser]);



    const getArticles = useCallback(() => {
        api().get(`/articles`)
            .then((articles) => {
                setMyArticles(articles);
            })
            .catch((err) => console.log(err));
    }, []);
    useEffect(() => {
        getArticles();
    }, [getArticles]);
    console.log("MYart", myArticles)
    console.log(searchTerm)
    if (!myArticles) {
        return "loading"
    }
    if (!user) { return "loading" }

    return (

        <div className="searchBar">
            <TopNavbar />
            <input
                type="text"
                name="searchBar"
                id="searchBar"
                placeholder="searchBar"
                onChange={HandleSearch}
                value={searchTerm}
            />

            {searchTerm.length > 0 &&
                <div className="searchResult">
                    <p>Articles</p>
                    {myArticles.data.filter((e) => {
                        const lower = e.content.toLowerCase()
                        return lower.includes(searchTerm.trim().toLowerCase())
                    }).map((e) => {
                        return (
                            <Link key={e._id} to={`/articles/${e._id}`}>
                                <Article value={e} />
                            </Link>
                        );
                    })}
                    <p>Users</p>
                    {user.data.filter((e) => {
                        const lower = e.username.toLowerCase()
                        return lower.includes(searchTerm.trim().toLowerCase())
                    })
                        .map((e) => {
                            return (
                                <Link key={e._id} to={`/users/${e._id}`}>

                                    <User value={e} />
                                </Link>
                            );
                        })}
                </div>}
            <BottomNavbar />
        </div>
    );
}

export default Search;