import { useState, useEffect, useCallback } from "react"
import { useParams, useNavigate } from "react-router-dom"
import axios from "axios"

function ArticleEdit() {
    const [tag, setTag] = useState("")
    const [content, setContent] = useState("")
    const [snippet, setSnippet] = useState("")
    const { articleId } = useParams()
    const [myArticle, setMyArticle] = useState({})
    const API_URL = "http://localhost:5005";

    const navigate = useNavigate()

    const handleTagInput = e => setTag(e.target.value);
    const handleContentInput = e => setContent(e.target.value);
    const handleSnippetInput = e => setSnippet(e.target.value);

    const handleSubmit = (e) => {
        e.preventDefault();
        const storedToken = localStorage.getItem("authToken");
        const updatedArticle = { tag, content };
        const updatedSnippet = { snippet }
        axios
            .patch(`${API_URL}/api/articles/${articleId}`, updatedArticle, {
                headers: { Authorization: `Bearer ${storedToken}` },
            })
            .then(() => {
                if (myArticle.data.snippet) {
                    axios
                        .patch(`${API_URL}/api/articles/${articleId}/snippets`, updatedSnippet, {
                            headers: { Authorization: `Bearer ${storedToken}` },
                        })
                        .then(() => navigate(`/articles/${articleId}`))
                        .catch(err => console.log("err", err))
                } else {
                    navigate(`/articles/${articleId}`)
                }
            })
            .catch((err) => console.log("err", err));
    }


    const getArticle = useCallback(() => {
        const storedToken = localStorage.getItem("authToken");
        axios.get(`${API_URL}/api/articles/${articleId}`, {
            headers: { Authorization: `Bearer ${storedToken}` },
        })
            .then((article) => setMyArticle(article))
            .catch(err => console.log(err))
    }, [articleId])
    useEffect(() => { getArticle() }, [getArticle]);


    console.log("myArticle", myArticle)
    if (!myArticle) return "loading"

    return (
        <div className="ArticleEdit">
            <form onSubmit={handleSubmit}>
                <label>
                    Tag:<select value={tag} onChange={handleTagInput} placeholder={myArticle.data.tag}>
                        <option value=""></option>
                        <option value="HTML">HTML</option>
                        <option value="CSS">CSS</option>
                        <option value="JS">JS</option>
                    </select>
                </label>
                <label>
                    Content:<input type="text" value={content} onChange={handleContentInput} placeholder={myArticle.data.content} />
                </label>
                <label>
                    Snippet<input type="text" value={snippet} onChange={handleSnippetInput} placeholder={myArticle.data.snippet} />
                </label>
                <button type="submit">Edit Article</button>
            </form>
        </div>
    )
}

export default ArticleEdit