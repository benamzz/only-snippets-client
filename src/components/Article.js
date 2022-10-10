import { Link } from 'react-router-dom'

function Article(props) {
    console.log("props.value", props.value)
    return (
        <div className="Article">
            <img src={props.value.userId.avatarUrl} alt="avatar" />
            <p>{props.value.userId.username}</p>
            <p>{props.value.content}</p>
            <Link to={`/articles/${props.value._id}/snippet/${props.value.snippet}`}>Voir le Snippet</Link>

        </div>
    );
}

export default Article;
