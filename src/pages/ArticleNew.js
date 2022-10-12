import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ArticleNew() {
    const [tag, setTag] = useState("")
    const [content, setContent] = useState("")
    const [snippet, setSnippet] = useState("")
    const API_URL = "http://localhost:5005";
    const storedToken = localStorage.getItem("authToken");
    const navigate = useNavigate()

    const handleTagInput = e => setTag(e.target.value);
    const handleContentInput = e => setContent(e.target.value);
    const handleSnippetInput = e => setSnippet(e.target.value);

    const handleSubmit = (e) => {
        e.preventDefault();
        const newArticle = { tag, content };
        const newSnippet = { snippet }

        console.log("Article Submitted: ", newArticle);
        console.log("Snippet Submitted: ", newSnippet);

        axios
            .post(`${API_URL}/api/articles`, newArticle, {
                headers: { Authorization: `Bearer ${storedToken}` },
            })
            .then((response) => {
                console.log('response', response)
                navigate(`/articles/${response.data._id}`)
            })
            .catch((err) => console.log("err", err));
    }

    return (
        <div className="ArticleNew">
            <form id="articleForm" onSubmit={handleSubmit}>
                <label>
                    Tag: <select name="tag" value={tag} onChange={handleTagInput} placeholder="">
                        <option value="HTML">HTML</option>
                        <option value="JS">JS</option>
                        <option value="CSS">CSS</option>
                    </select>
                </label>
                <label>
                    Content : <input type="text" name="content" value={content} onChange={handleContentInput} />
                </label>
                <label>
                    Snippet:<input type="text" name="snippet" value={snippet} onChange={handleSnippetInput} />
                </label>
                <button type="submit">Send Article</button>
            </form>
        </div>
    )
}

export default ArticleNew