import { Link } from 'react-router-dom'
import { useCallback, useContext, useState } from 'react'
import { AuthContext } from "../context/auth.context";
import api from "../api"

function Article(props) {
    const { user, refresh } = useContext(AuthContext);
    const [liked, setLiked] = useState(false)
    const [deleted, setDeleted] = useState(false)

    const toggleLike = useCallback((e) => {
        e.preventDefault();
        if (user.likes.includes(props.value._id)) {
            return api().put(`/articles/${props.value._id}/unlike`)
                .then(() => {
                    setLiked(false)
                    refresh()
                })
                .catch(err => console.log(err))
        }
        if (!liked) {
            return api().put(`/articles/${props.value._id}/like`)
                .then(() => {
                    setLiked(true)
                    refresh()
                })
                .catch(err => console.log(err))
        }
    }, [props.value._id, refresh, user.likes])

    const deleteArticle = useCallback((e) => {
        e.preventDefault();
        return api().delete(`/articles/${props.value._id}`)
            .then(() => {
                setDeleted(!deleted)
                refresh()
            })
            .catch(err => console.log(err))
    })
    console.log("props.value:", props.value)
    let isMyArticle = false
    if (user._id === props.value.userId._id) { isMyArticle = true }
    if (!props.value) return "loading"
    return (
        <div className='Article'>
            {!props.value.deletedAt &&
                <>
                    <div className='articleContainer'>
                        <Link to={`/users/${props.value._id}`} id="userProfileLink">
                            <img src={props.value.userId.avatarUrl} alt="avatar" />
                        </Link>

                        <Link to={`/articles/${props.value._id}`} id="articleLink">
                            <h3>@{props.value.userId.username}</h3>
                            <p id='content'>{props.value.content}</p>
                            <p>{props.value.snippet.tag}</p>
                        </Link>
                        {isMyArticle && (
                            <div className='isMyArticle'>
                                <div className='deleteArticleBtn' onClick={deleteArticle}>{!deleted ? "Delete" : "Deleted"}</div>
                                <Link to={`/articles/${props.value._id}/edit`} id="editArticleLink">Edit</Link>
                            </div>)}

                    </div>
                    <div className='articleBtn'>
                        <Link to={`/articles/${props.value._id}/comment`}>{props.value.comments.length} comment(s)</Link>
                        <div className='likeBtn' onClick={toggleLike}>{user.likes.includes(props.value._id) ? <i class="fas fa-heart"></i>
                            : <i class="far fa-heart"></i>}</div>
                        {props.value.snippet.content !== "" && <Link to={`/articles/${props.value._id}/snippet/${props.value.snippet._id}`}>See the Snippet</Link>}
                    </div>
                </>
            }
        </div>
    );
}

export default Article;
