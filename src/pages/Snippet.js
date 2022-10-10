import BottomNavbar from "../components/BottomNavbar"
import TopNavbar from "../components/TopNavbar"
import { useCallback, useEffect, useState } from "react";
import axios from 'axios'
import { useParams } from 'react-router-dom'


function Snippet() {
    const [snippet, setSnippet] = useState(null)
    const API_URL = "http://localhost:5005";
    const { articleId, snippetId } = useParams()


    const getSnippet = useCallback(() => {
        const storedToken = localStorage.getItem("authToken");
        axios.get(`${API_URL}/api/articles/${articleId}/snippets/${snippetId}`, {
            headers: { Authorization: `Bearer ${storedToken}` },
        })
            .then(snippet => setSnippet(snippet))
            .catch(err => console.log(err))
    }, [snippetId])
    useEffect(() => { getSnippet() }, [getSnippet])


    console.log('snippet', snippet)

    if (!snippet) { return "snippet not found // loading" }
    else {
        const mySnippet = snippet.data.snippet
        return (
            <div className="Snippet">
                <TopNavbar></TopNavbar>
                <p>{mySnippet.content}</p>
                <BottomNavbar></BottomNavbar>
            </div>
        )
    }
}

export default Snippet