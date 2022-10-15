
import Article from "../components/Article"
import { useState, useEffect, useCallback } from "react"
import { useParams } from "react-router-dom"
import TopNavbar from "../components/TopNavbar";
import BottomNavbar from "../components/BottomNavbar";
import api from "../api"

function ArticleDetails() {
    const [article, setArticle] = useState(null)
    const [comments, setComments] = useState(null)
    const { articleId } = useParams()

    const getArticle = useCallback(() => {
        api().get(`/articles/${articleId}`)
            .then(article => setArticle(article))
            .catch(err => console.log(err))
    }, [articleId])
    useEffect(() => { getArticle() }, [getArticle])

    const getComments = useCallback(() => {
        api().get(`/articles/${articleId}/comments`)
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