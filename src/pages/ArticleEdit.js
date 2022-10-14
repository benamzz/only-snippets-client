function ArticleEdit() {
    return (
        <div className="ArticleEdit">
            <label>
                Tag:<select>
                    <option>""</option>
                    <option>"HTML"</option>
                    <option>"CSS"</option>
                    <option>"JS"</option>
                </select>
            </label>
            <label>
                Content:<input />
            </label>
            <label>
                Snippet<input />
            </label>
        </div>
    )
}

export default ArticleEdit