import { useState, useEffect, useContext } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import api from "../api"
import languages from "../languages"
import TopNavbar from "../components/TopNavbar"
import BottomNavbar from "../components/BottomNavbar"
import { AuthContext } from '../context/auth.context'

function ArticleEdit() {
    const [tag, setTag] = useState("")
    const [content, setContent] = useState("")
    const [snippet, setSnippet] = useState("")
    const { articleId } = useParams()
    const [myArticle, setMyArticle] = useState()
    const navigate = useNavigate()
    const { isLoggedIn } = useContext(AuthContext)

    const handleTagInput = e => setTag(e.target.value);
    const handleContentInput = e => setContent(e.target.value);
    const handleSnippetInput = e => setSnippet(e.target.value);

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedArticle = { content: content };
        const updatedSnippet = { content: snippet, tag: tag }

        api().patch(`/articles/${articleId}`, updatedArticle)
            .then(() => {
                api().patch(`/articles/${articleId}/snippets/${myArticle.snippet._id}`, updatedSnippet)
                    .then(() => navigate(`/articles/${articleId}`))
                    .catch(err => console.log("err", err))
            })
            .catch((err) => console.log("err", err));
    }

    useEffect(() => {
        api().get(`/articles/${articleId}`)
            .then((article) => setMyArticle(article.data))
            .catch(err => console.log(err))
    }, [articleId]);
    if (!isLoggedIn) return (
        <>
            <p>You must login to access this page</p>
            <Link to="/login">Login</Link>
        </>
    )
    if (!myArticle) return "loading"

    return (
        <div className="ArticleEdit">
            <TopNavbar />
            <form onSubmit={handleSubmit}>
                <label>
                    Tag : <select onChange={handleTagInput}
                    >
                        {languages.map(elem => {
                            return (<option key={elem} value={elem} selected={elem === myArticle.snippet.tag}>{elem}</option>)
                        })}
                    </select>
                </label>
                <label>
                    Content : <textarea type="text" name="content" value={content} onChange={handleContentInput}
                        placeholder={myArticle.content}
                    />
                </label>
                <label>
                    Snippet : <textarea type="text" name="snippet" value={snippet} onChange={handleSnippetInput}
                        placeholder={myArticle.snippet?.content} // optional chaining
                    />
                </label>
                <button type="submit">Edit Article</button>
            </form>
            <BottomNavbar />
        </div>
    )
}

export default ArticleEdit