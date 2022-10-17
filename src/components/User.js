import { Link } from 'react-router-dom'
import { useCallback, useContext, useState } from "react";
import { AuthContext } from "../context/auth.context";
import api from "../api"
import FollowButton from './followButton';


function User(props) {

    if (!props.value) return "loading"


    return (
        <div className="User">
            <Link to={`/users/${props.value._id}`}>
                <img src={props.value.avatarUrl} alt="avatar" />
                <p>{props.value.username}</p>

            </Link>
            <FollowButton value={props.value} />
        </div>
    );
}

export default User;