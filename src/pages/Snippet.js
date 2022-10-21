import BottomNavbar from "../components/BottomNavbar"
import TopNavbar from "../components/TopNavbar"
import { useEffect, useState } from "react";
import { useParams, Link } from 'react-router-dom'
import api from "../api"
import Highlight from "react-highlight"

function Snippet() {
    const [snippet, setSnippet] = useState(null)
    const { articleId, snippetId } = useParams()

    //get snippet
    useEffect(() => {
        api().get(`/articles/${articleId}/snippets/${snippetId}`)
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
                <Link to={`/articles/${articleId}`} id="returnBtn">Revenir à l'article</Link>
                <BottomNavbar />
            </div>
        )
    }
}

export default Snippet