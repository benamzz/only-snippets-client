import Article from "../components/Article"
import { useState, useEffect, useCallback } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"

function ArticleDetails() {
    const [article, setArticle] = useState(null)
    const [comments, setComments] = useState(null)
    const API_URL = "http://localhost:5005";
    const { articleId } = useParams()

    const getArticle = useCallback(() => {
        const storedToken = localStorage.getItem("authToken");
        axios.get(`${API_URL}/api/articles/${articleId}`, {
            headers: { Authorization: `Bearer ${storedToken}` },
        })
            .then(article => setArticle(article))
            .catch(err => console.log(err))
    }, [articleId])
    useEffect(() => { getArticle() }, [getArticle])

    const getComments = useCallback(() => {
        const storedToken = localStorage.getItem("authToken");
        axios.get(`${API_URL}/api/articles/${articleId}/comments`, {
            headers: { Authorization: `Bearer ${storedToken}` },
        })
            .then(comments => setComments(comments))
            .catch(err => console.log(err))
    }, [articleId])
    useEffect(() => { getComments() }, [getComments])

    console.log("article:", article)
    console.log("comments:", comments)

    if (!article) return "loading"

    return (
        <div className="ArticleDetails">
            <Article value={article.data} />
            {comments.data && comments.data.map(el => {
                return (
                    <Article value={el} />
                )
            })}
        </div>
    )
}

export default ArticleDetails