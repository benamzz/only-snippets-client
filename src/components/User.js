import { Link } from 'react-router-dom'
import { useContext, useState } from "react";
import { AuthContext } from "../context/auth.context";

function User(props) {
    const { user } = useContext(AuthContext);
    const [buttonValue, setButtonValue] = useState(true);
    if (!props.value) return "loading"

    const updateList = function () {
        user.following.filter(el => el === props.value._id)
        console.log(user.following)
        setButtonValue(el => !el)
        console.log(buttonValue)
    }

    // console.log("user:", user)

    // const storedToken = localStorage.getItem("authToken");
    // axios.put(`${API_URL}/api/users/${props.value._id}/unfollow`, {
    //     headers: { Authorization: `Bearer ${storedToken}` },
    // })
    //     .then(() => {
    //         const filteredList = user.following.filter(el => el === props.value._id)
    //         setMyFollowList(filteredList)
    //     })
    //     .catch(err => console.log(err))

    // () => setButtonValue(el => !el)


    return (
        <div className="User">
            <Link to={`/users/${props.value._id}`}>
                <img src={props.value.avatarUrl} alt="avatar" />
                <p>{props.value.username}</p>

            </Link>
            <button onClick={updateList} value={buttonValue}>{buttonValue ? "Delete" : "Follow"}</button>
        </div>
    );
}

export default User;