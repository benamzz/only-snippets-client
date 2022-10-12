import { Link } from 'react-router-dom'

function Article(props) {
    if (!props.value) return "loading"
    return (
        <div className="Article">
            <Link to={`/articles/${props.value._id}`}>
                <img src={props.value.userId.avatarUrl} alt="avatar" />
                <p>{props.value.userId.username}</p>
                <p>{props.value.tag}</p>
                <p>{props.value.content}</p>
            </Link>
            <Link to={`/articles/${props.value._id}/snippet/${props.value.snippet}`}>Voir le Snippet</Link>
            <Link to={`/articles/${props.value._id}/comment`}>Ajouter un commentaire</Link>

        </div>
    );
}

export default Article;
