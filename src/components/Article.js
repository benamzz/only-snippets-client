import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from "../context/auth.context";

function Article(props) {
    const { user } = useContext(AuthContext);
    let isMyArticle = false
    if (user._id === props.value.userId) {
        console.log("isMyArticle:", props.value._id)
        isMyArticle = true
    }
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
            {isMyArticle && <Link to={`/articles/${props.value._id}/edit`}>Editer mon article</Link>}

        </div>
    );
}

export default Article;
