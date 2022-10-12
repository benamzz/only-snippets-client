import { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

function ArticleNew() {
    const API_URL = "http://localhost:5005";
    const navigate = useNavigate();

    const handleArticleSubmit = (e) => {
        e.preventDefault();
        const requestBody = { tag, content };
        axios
            .post(`${API_URL}/api/sessions`, requestBody)
            .then((response) => {
                navigate("/");
            })
            .catch((error) => {
                const errorDescription = error.response.data.message;
                setErrorMessage(errorDescription);
            });
    };


    const handleSnippetSubmit = (e) => {
        e.preventDefault();
        const requestBody = { content };
        axios
            .post(`${API_URL}/api/sessions`, requestBody)
            .then((response) => {
                navigate("/");
            })
            .catch((error) => {
                const errorDescription = error.response.data.message;
                setErrorMessage(errorDescription);
            });
    };


    return (
        <div className="ArticleNew">
            <form id="articleForm" onSubmit={handleArticleSubmit}>
                <label>
                    Tag: <select>
                        <option value="HTML">HTML</option>
                        <option value="JS">JS</option>
                        <option value="CSS">CSS</option>
                    </select>
                </label>
                <label>
                    Content : <input />
                </label>
            </form>
            <form id="snippetForm" onSubmit={handleSnippetSubmit}>
                <label>
                    Snippet:<input />
                </label>
            </form>
        </div>
    )
}

export default ArticleNew