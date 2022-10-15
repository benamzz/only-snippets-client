import { Link } from 'react-router-dom'
import { useContext, useState } from 'react'
import { AuthContext } from "../context/auth.context";

import styled from '@emotion/styled'

function Article(props) {
    const { user } = useContext(AuthContext);

    const [clr, setClr] = useState("red")

    let isMyArticle = false
    if (user._id === props.value.userId) { isMyArticle = true }
    if (!props.value) return "loading"
    return (
        <Styled clr={clr} className="Article">
            <Link to={`/articles/${props.value._id}`}>
                <img src={props.value.userId.avatarUrl} alt="avatar" />
                <p>{props.value.userId.username}</p>
                <p>{props.value.tag}</p>
                <p>{props.value.content}</p>
            </Link>
            <p onClick={e => setClr('yellow')}>coucou <a>ca</a> va ?</p>
            {props.value.snippet && <Link to={`/articles/${props.value._id}/snippet/${props.value.snippet._id}`}>Voir le Snippet</Link>}
            <Link to={`/articles/${props.value._id}/comment`}>Ajouter un commentaire</Link>
            {isMyArticle && <Link to={`/articles/${props.value._id}/edit`}>Editer mon article</Link>}
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
