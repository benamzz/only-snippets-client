import { Link } from 'react-router-dom'
import { useCallback, useContext, useState } from "react";
import { AuthContext } from "../context/auth.context";
import api from "../api"


function User(props) {
    const { user, refresh } = useContext(AuthContext);
    const [followed, setFollow] = useState(false)


    const toggleFollow = useCallback((e) => {
        e.preventDefault();
        if (user.following.includes(props.value._id)) {
            return api().put(`/users/${props.value._id}/unfollow`)
                .then(() => {
                    console.log("unfollow!", props.value._id)
                    setFollow(false)
                    refresh()
                })
                .catch(err => console.log(err))
        }
        if (!followed) {
            return api().put(`/users/${props.value._id}/follow`)
                .then(() => {
                    console.log("follow!", props.value._id)
                    setFollow(true)
                    refresh()
                })
                .catch(err => console.log(err))
        }
    })
    if (!props.value) return "loading"


    return (
        <div className="User">
            <Link to={`/users/${props.value._id}`}>
                <img src={props.value.avatarUrl} alt="avatar" />
                <p>{props.value.username}</p>

            </Link>
            <div onClick={toggleFollow}>{user.following.includes(props.value._id) ? "Unfollow" : "Follow"}</div>
        </div>
    );
}

export default User;