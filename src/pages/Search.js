import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";
import Article from "../components/Article";
import BottomNavbar from "../components/BottomNavbar";
import TopNavbar from "../components/TopNavbar";
import User from "../components/User";

function Search() {
    const [user, setUser] = useState(null);
    const [myArticles, setMyArticles] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const HandleSearch = (e) => setSearchTerm(e.target.value)

    //get users
    useEffect(() => {
        api().get(`/users`)
            .then((users) => {
                setUser(users)
            })
            .catch(err => console.log("err", err));
    }, []);
    //get articles
    useEffect(() => {
        api().get(`/articles`)
            .then((articles) => {
                setMyArticles(articles);
            })
            .catch((err) => console.log(err));
    }, []);

    if (!myArticles) return "loading"
    if (!user) return "loading"

    return (

        <div className="searchBar">
            <TopNavbar />
            <input
                type="text"
                name="searchBar"
                id="searchBar"
                placeholder="search by user, article, snippet or tag"
                onChange={HandleSearch}
                value={searchTerm}
            />

            {searchTerm.length > 0 &&
                <div className="searchResult">
                    <p>Articles</p>
                    {myArticles.data.filter(e => {
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
                    {user.data.filter(e => {
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
                    <p>Snippets</p>
                    {myArticles.data.filter(e => {
                        const lower = e.snippet.content.toLowerCase()
                        return lower.includes(searchTerm.trim().toLowerCase())
                    })
                        .map(e => {
                            return (<Link key={e._id} to={`/articles/${e._id}`}>
                                <Article value={e} />
                            </Link>)
                        })}
                    <p>Tags</p>
                    {myArticles.data.filter(e => {
                        const lower = e.snippet.tag.toLowerCase()
                        return lower.includes(searchTerm.trim().toLowerCase())
                    })
                        .map(e => {
                            return (<Link key={e._id} to={`/articles/${e._id}`}>
                                <Article value={e} />
                            </Link>)
                        })}
                </div>}
            <BottomNavbar />
        </div>
    );
}

export default Search;