import { Link } from 'react-router-dom'
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth.context";
import axios from 'axios';
function User(props) {
    const { user } = useContext(AuthContext);
    const [buttonValue, setButtonValue] = useState(true);
    const API_URL = "http://localhost:5005";
    const [MyFollowList, setMyFollowList] = useState(null)
    if (!props.value) return "loading"

    const updateList = function () {
        user.following.filter(el => el === props.value._id)
        setButtonValue(el => !el)
        console.log(user.following)
        console.log(buttonValue)
    }

    return (
        <div className="User">
            <Link to={`/users/${props.value._id}`}>
                {/* {console.log("user = ", user)}
                {console.log("props.value.following = ", props.value._id)} */}
                <img src={props.value.avatarUrl} alt="avatar" />
                <p>{props.value.username}</p>

            </Link>
            <button onClick={updateList} value={buttonValue}>{buttonValue ? "Delete" : "Follow"}</button>
        </div>
    );
}

export default User;