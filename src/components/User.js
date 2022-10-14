import { Link } from 'react-router-dom'
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
function User(props) {
    const { user } = useContext(AuthContext);
    let buttonValue

    if (!props.value) return "loading"

    user.following.map(el => {
        console.log("el = ", el)
        console.log("props.value.following = ", props.value._id)
        { el === props.value._id ? buttonValue = "Delete" : buttonValue = "Follow" }
    })


    return (
        <div className="User">
            <Link to={`/users/${props.value._id}`}>
                <img src={props.value.avatarUrl} alt="avatar" />
                <p>{props.value.username}</p>
                <button>{buttonValue}</button>
            </Link>
        </div>
    );
}

export default User;
