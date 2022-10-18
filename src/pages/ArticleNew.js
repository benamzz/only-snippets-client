import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BottomNavbar from "../components/BottomNavbar";
import TopNavbar from "../components/TopNavbar";
import api from "../api"
import languages from "../languages";

function ArticleNew() {
    const [tag, setTag] = useState("")
    const [content, setContent] = useState("")
    const [snippet, setSnippet] = useState("")
    const navigate = useNavigate()
    const { articleId } = useParams()

    const handleTagInput = e => setTag(e.target.value);
    const handleContentInput = e => setContent(e.target.value);
    const handleSnippetInput = e => setSnippet(e.target.value);

    const handleSubmit = (e) => {
        e.preventDefault();
        const newArticle = { content };
        const newSnippet = { snippet: snippet, tag }
        if (!articleId) {
            return api().post(`/articles`, newArticle)
                .then((response) => {
                    api().post(`/articles/${response.data._id}/snippets`, newSnippet)
                        .then(() => navigate(`/articles/${response.data._id}`))
                        .catch(err => console.log("err", err))
                })
                .catch((err) => console.log("err", err));
        }
        api().post(`/articles?parentId=${articleId}`, newArticle)
            .then((response) => {
                api().post(`/articles/${response.data._id}/snippets`, newSnippet)
                    .then(() => navigate(`/articles/${response.data._id}`))
                    .catch(err => console.log("err", err))
            })
            .catch((err) => console.log("err", err));
    }

    return (
        <div className="ArticleNew">
            <TopNavbar />
            <form id="articleForm" onSubmit={handleSubmit}>
                <label>
                    Tag: <select name="tag" onChange={handleTagInput}>
                        {languages.map(elem => {
                            return (<option key={elem} value={elem}>{elem}</option>)
                        })}
                    </select>
                </label>
                <label>
                    Content : <textarea type="text" name="content" value={content} onChange={handleContentInput} />
                </label>
                <label>
                    Snippet:<textarea type="text" name="snippet" value={snippet} onChange={handleSnippetInput} />
                </label>
                <button type="submit">Send Article</button>
            </form>
            <BottomNavbar />
        </div>
    )
}

export default ArticleNew