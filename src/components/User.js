import { Link } from 'react-router-dom'

function User(props) {
    if (!props.value) return "loading"
    return (
        <div className="User">
            <Link to={`/users/${props.value._id}`}>
                <img src={props.value.avatarUrl} alt="avatar" />
                <p>{props.value.username}</p>
                <button>UnFollow</button>
            </Link>
        </div>
    );
}

export default User;
