import { useCallback, useContext, useState } from "react";
import { AuthContext } from "../context/auth.context";
import api from "../api";

function FollowButton(props) {
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
    }, [user])
    if (!props.value) return "loading"
    return (
        <div className="FollowButton">
            <div onClick={toggleFollow}>{user.following.includes(props.value._id) ? "Unfollow" : "Follow"}</div>
        </div>
    )
}

export default FollowButton;