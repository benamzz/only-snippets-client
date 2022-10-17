import { Link } from 'react-router-dom'
import FollowButton from './followButton';


function User(props) {

    if (!props.value) return "loading"


    return (
        <div className="User">
            <Link to={`/users/${props.value._id}`} id="userLink">
                <img src={props.value.avatarUrl} alt="avatar" />
                <p>{props.value.username}</p>
            </Link>
            <FollowButton value={props.value} />
        </div>
    );
}

export default User;