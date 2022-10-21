
import Article from "../components/Article"
import { useState, useEffect, useContext } from "react"
import { Link, useParams } from "react-router-dom"
import TopNavbar from "../components/TopNavbar";
import BottomNavbar from "../components/BottomNavbar";
import api from "../api"
import { AuthContext } from '../context/auth.context'

function ArticleDetails() {
    const [article, setArticle] = useState(null)
    const [comments, setComments] = useState(null)
    const { articleId } = useParams()
    const { isLoggedIn } = useContext(AuthContext)
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

    if (!isLoggedIn) return (
        <>
            <p>You must login to access this page</p>
            <Link to="/login">Login</Link>
        </>
    )
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