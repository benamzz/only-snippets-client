import { useState, useEffect, useCallback } from "react"
import { useParams, useNavigate } from "react-router-dom"
import api from "../api"


function ArticleEdit() {
    const [tag, setTag] = useState("")
    const [content, setContent] = useState("")
    const [snippet, setSnippet] = useState("")
    const { articleId } = useParams()
    const [myArticle, setMyArticle] = useState({ data: { tag: "", content: "", snippet: "" } })
    const navigate = useNavigate()

    const handleTagInput = e => setTag(e.target.value);
    const handleContentInput = e => setContent(e.target.value);
    const handleSnippetInput = e => setSnippet(e.target.value);

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedArticle = { tag, content };
        const updatedSnippet = { snippet }

        api().patch(`/articles/${articleId}`, updatedArticle)
            .then(() => {
                if (snippet === "") {
                    return navigate(`/articles/${articleId}`)
                }
                if (!myArticle.data.snippet) {
                    api().post(`/articles/${articleId}/snippets`, updatedSnippet)
                        .then(() => navigate(`/articles/${articleId}`))
                        .catch(err => console.log("err", err))
                } else {
                    api().patch(`/articles/${articleId}/snippets/${myArticle.data.snippet._id}`, updatedSnippet)
                        .then(() => navigate(`/articles/${articleId}`))
                        .catch(err => console.log("err", err))
                }
            })
            .catch((err) => console.log("err", err));
    }

    const getArticle = useCallback(() => {
        api().get(`/articles/${articleId}`)
            .then((article) => setMyArticle(article))
            .catch(err => console.log(err))
    }, [articleId])
    useEffect(() => { getArticle() }, [getArticle]);

    if (!myArticle) return "loading"

    return (
        <div className="ArticleEdit">
            <form onSubmit={handleSubmit}>
                <label>
                    Tag:<select value={tag} onChange={handleTagInput}
                    >
                        <option value="">Select your tag</option>
                        <option value="HTML">HTML</option>
                        <option value="CSS">CSS</option>
                        <option value="JS">JS</option>
                    </select>
                </label>
                <label>
                    Content:<textarea type="text" value={content} onChange={handleContentInput}
                        placeholder={myArticle.data.content}
                    />
                </label>
                <label>
                    Snippet<textarea type="text" value={snippet} onChange={handleSnippetInput}
                        //placeholder={myArticle.data.snippet && myArticle.data.snippet.content}
                        placeholder={myArticle.data.snippet?.content} // optional chaining
                    />
                </label>
                <button type="submit">Edit Article</button>
            </form>
        </div>
    )
}

export default ArticleEdit