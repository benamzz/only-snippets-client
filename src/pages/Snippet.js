import BottomNavbar from "../components/BottomNavbar"
import TopNavbar from "../components/TopNavbar"
import { useCallback, useEffect, useState } from "react";
import { useParams } from 'react-router-dom'
import api from "../api"
import hljs from "highlight.js"
import Highlight from "react-highlight"
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
                <TopNavbar />
                <Highlight classname="html">{mySnippet.content}</Highlight>
                <BottomNavbar />
            </div>
        )
    }
}

export default Snippet