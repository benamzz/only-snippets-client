import { Link } from 'react-router-dom'
import { useCallback, useContext, useState } from 'react'
import { AuthContext } from "../context/auth.context";
import api from "../api"

import styled from '@emotion/styled'

function Article(props) {
    const { user, refresh } = useContext(AuthContext);
    const [clr, setClr] = useState("red")
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
    })
    const deleteArticle = useCallback((e) => {
        e.preventDefault();
        return api().delete(`/articles/${props.value._id}`)
            .then(() => {
                setDeleted(!deleted)
                console.log(deleted)
                console.log("Article deleted!", props.value._id)
                refresh()
            })
            .catch(err => console.log(err))
    })
    if (!props.value) return "loading"
    let isMyArticle = false
    console.log("user", user)
    console.log("props", props.value)
    if (user._id === props.value.userId) { isMyArticle = true }

    return (

        <Styled clr={clr} className="Article">
            {!props.value.deletedAt &&
                <>
                    <div className='articleDiv'>
                        <Link to={`/users/${props.value._id}`} id="userProfileLink">
                            <img src={props.value.userId.avatarUrl} alt="avatar" />
                        </Link>
                        {isMyArticle && (
                            <div className='isMyArticle'>
                                <div className='deleteArticleBtn' onClick={deleteArticle}>{!deleted ? "Delete" : "Deleted"}</div>
                                <Link to={`/articles/${props.value._id}/edit`} id="editArticleLink">Editer</Link>
                            </div>)}
                        <Link to={`/articles/${props.value._id}`} id="articleLink">
                            <p>{props.value.userId.username}</p>
                            <p>{props.value.content}</p>
                            <p>{props.value.tag}</p>
                        </Link>

                        {/* <p onClick={e => setClr('yellow')}>coucou <a>ca</a> va ?</p> */}

                    </div>
                    <div className='articleBtn'>
                        <Link to={`/articles/${props.value._id}/comment`}>commentaire</Link>
                        <div className='likeBtn' onClick={toggleLike}>{user.likes.includes(props.value._id) ? "Unlike" : "Like"}</div>
                        {props.value.snippet.content != "" && <Link to={`/articles/${props.value._id}/snippet/${props.value.snippet._id}`}>Voir le Snippet</Link>}
                    </div>
                </>
            }
        </Styled >
    );
}

const Styled = styled.div`

p {
    color:${(props) => props.clr};

    &:hover {font-size:2rem;}
    a {color:green;}
}
`

export default Article;
