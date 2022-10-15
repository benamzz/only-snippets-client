import BottomNavbar from "../components/BottomNavbar"
import TopNavbar from "../components/TopNavbar"
import { useCallback, useEffect, useState } from "react";
import { useParams } from 'react-router-dom'
import api from "../api"

function Snippet() {
    const [snippet, setSnippet] = useState(null)
    const API_URL = "http://localhost:5005";
    const { articleId, snippetId } = useParams()

    const getSnippet = useCallback(() => {
        api().get(`${API_URL}/api/articles/${articleId}/snippets/${snippetId}`)
            .then(snippet => setSnippet(snippet))
            .catch(err => console.log(err))
    }, [snippetId, articleId])

    useEffect(() => { getSnippet() }, [getSnippet])

    if (!snippet) { return "snippet not found" }
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