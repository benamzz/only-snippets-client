import BottomNavbar from "../components/BottomNavbar"
import TopNavbar from "../components/TopNavbar"
import { useEffect, useState } from "react";
import { useParams, Link } from 'react-router-dom'
import api from "../api"
import Highlight from "react-highlight"

function Snippet() {
    const [snippet, setSnippet] = useState(null)
    const API_URL = "http://localhost:5005";
    const { articleId, snippetId } = useParams()

    //get snippet
    useEffect(() => {
        api().get(`${API_URL}/api/articles/${articleId}/snippets/${snippetId}`)
            .then(snippet => setSnippet(snippet))
            .catch(err => console.log(err))
    }, [snippetId, articleId])

    if (!snippet) { return "snippet not found" }
    else {
        const mySnippet = snippet.data.snippet
        return (
            <div className="Snippet">
                <TopNavbar />
                <Highlight classname={mySnippet.tag}>{mySnippet.content}</Highlight>
                <Link to={`/articles/${articleId}`} >Revenir à l'article</Link>
                <BottomNavbar />
            </div>
        )
    }
}

export default Snippet