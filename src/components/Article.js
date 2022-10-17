import { Link } from 'react-router-dom'
import { useCallback, useContext, useState } from 'react'
import { AuthContext } from "../context/auth.context";
import api from "../api"

import styled from '@emotion/styled'

function Article(props) {
    const { user, refresh } = useContext(AuthContext);
    const [clr, setClr] = useState("red")
    const [liked, setLiked] = useState(false)


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
                console.log("Article deleted!", props.value._id)
                refresh()
            })
            .catch(err => console.log(err))
    })

    let isMyArticle = false
    if (user._id === props.value.userId._id) { isMyArticle = true }
    if (!props.value) return "loading"
    return (

        <Styled clr={clr} className="Article">
            <Link to={`/articles/${props.value._id}`}>
                <img src={props.value.userId.avatarUrl} alt="avatar" />
                <p>{props.value.userId.username}</p>
                <p>{props.value.tag}</p>
                <p>{props.value.content}</p>
            </Link>
            {/* <p onClick={e => setClr('yellow')}>coucou <a>ca</a> va ?</p> */}
            {props.value.snippet.content != "" && <Link to={`/articles/${props.value._id}/snippet/${props.value.snippet._id}`}>Voir le Snippet</Link>}
            <Link to={`/articles/${props.value._id}/comment`}>Ajouter un commentaire</Link>
            {isMyArticle && <Link to={`/articles/${props.value._id}/edit`}>Editer mon article</Link>}
            <div onClick={toggleLike}>{user.likes.includes(props.value._id) ? "Unlike" : "Like"}</div>
        </Styled>
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
