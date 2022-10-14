import TopNavbar from "../components/TopNavbar";
import BottomNavbar from "../components/BottomNavbar";
import Article from "../components/Article"
import { useState, useEffect, useCallback } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
const storedToken = localStorage.getItem("authToken");

function ArticleDetails() {
    const [article, setArticle] = useState(null)
    const [comments, setComments] = useState(null)
    const API_URL = "http://localhost:5005";
    const { articleId } = useParams()

    const getArticle = useCallback(() => {
        axios.get(`${API_URL}/api/articles/${articleId}`, {
            headers: { Authorization: `Bearer ${storedToken}` },
        })
            .then(article => setArticle(article))
            .catch(err => console.log(err))
    }, [articleId])
    useEffect(() => { getArticle() }, [getArticle])

    const getComments = useCallback(() => {
        axios.get(`${API_URL}/api/articles/${articleId}/comments`, {
            headers: { Authorization: `Bearer ${storedToken}` },
        })
            .then(comments => setComments(comments.data))
            .catch(err => console.log(err))
    }, [articleId])
    useEffect(() => { getComments() }, [getComments])


    if (!article) return "loading"

    return (
        <div className="ArticleDetails">
            <TopNavbar />
            <Article value={article.data} />
            {comments && comments.map(el => {
                return (
                    <Article value={el} />
                )
            })}
            <BottomNavbar />
        </div>
    )
}

export default ArticleDetails