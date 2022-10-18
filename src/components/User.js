import { Link } from 'react-router-dom'
import FollowButton from './followButton';


function User(props) {
    console.log(props.value)
    if (!props.value) return "loading"


    return (
        <div className="User">
            <Link to={`/users/${props.value._id}`} id="userLink">
                <img src={props.value.avatarUrl} alt="avatar" />
                <div>
                    <h3>@{props.value.username}</h3>
                    <p>{props.value.bio}</p>
                </div>
            </Link>
            <FollowButton value={props.value} />
        </div>
    );
}

export default User;