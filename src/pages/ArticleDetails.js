
import Article from "../components/Article"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import TopNavbar from "../components/TopNavbar";
import BottomNavbar from "../components/BottomNavbar";
import api from "../api"

function ArticleDetails() {
    const [article, setArticle] = useState(null)
    const [comments, setComments] = useState(null)
    const { articleId } = useParams()

    //get article
    useEffect(() => {
        api().get(`/articles/${articleId}`)
            .then(articleFromApi => setArticle(articleFromApi))
            .catch(err => console.log(err))
    }, [articleId])

    //get comments
    useEffect(() => {
        api().get(`/articles/${articleId}/comments`)
            .then(commentsFromApi => setComments(commentsFromApi.data))
            .catch(err => console.log(err))
    }, [articleId])
    if (!article) return "loading"

    return (
        <div className="ArticleDetails">
            <TopNavbar />
            <Article value={article.data} />
            {comments && comments.map(el => {
                return (
                    <Article value={el} key={el._id} />
                )
            })}
            <BottomNavbar />
        </div>
    )
}

export default ArticleDetails