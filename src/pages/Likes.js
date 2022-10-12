import { AuthContext } from "../context/auth.context";
import { useCallback, useContext, useEffect, useState } from "react";
import BottomNavbar from "../components/BottomNavbar";
import TopNavbar from "../components/TopNavbar";
import Article from "../components/Article";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

function Likes() {
    const API_URL = "http://localhost:5005";
    const [user, setUser] = useState(null);
    const [followers, setFollowers] = useState(null)
    const [myLikes, setMyLikes] = useState(null)
    const { userId } = useParams();
    const { isLoggedIn, logOutUser } = useContext(AuthContext);

    const getUser = useCallback(() => {
        const storedToken = localStorage.getItem("authToken");
        axios
            .get(`${API_URL}/api/users/${userId}`, {
                headers: { Authorization: `Bearer ${storedToken}` },
            })
            .then((userFromApi) => {
                setUser(userFromApi.data);
            })
            .catch((err) => console.log("err", err));
    }, [userId]);
    useEffect(() => { getUser() }, [getUser]);

    const getFollowers = useCallback(() => {
        const storedToken = localStorage.getItem("authToken");
        axios.get(`${API_URL}/api/users/${userId}/followers`, {
            headers: { Authorization: `Bearer ${storedToken}` },
        })
            .then(followers => setFollowers(followers))
            .catch(err => console.log(err))
    }, [userId])
    useEffect(() => { getFollowers() }, [getFollowers])

    const getLikes = useCallback(() => {
        const storedToken = localStorage.getItem("authToken");
        axios.get(`${API_URL}/api/users/${userId}/likes`, {
            headers: { Authorization: `Bearer ${storedToken}` },
        })
            .then((likes) => { setMyLikes(likes) })
            .catch(err => console.log(err))
    }, [userId])
    useEffect(() => { getLikes() }, [getLikes])

    if (!user) return "loading";

    return (
        <div className="Profile">
            <TopNavbar />
            <div className="ProfileDetails">
                {isLoggedIn && (
                    <>
                        <a href={`/users/${user.userId}/edit`}>Edit</a>
                        <button onClick={logOutUser}>Logout</button>
                    </>
                )}

                <img src={user.avatarUrl} alt="profile" />
                <h2>@{user.username}</h2>
                <p>{user.bio}</p>
                <p>{user.location}</p>
                <p>{user.tags}</p>
                <p>{user.website}</p>
                <p>{user.linkedin}</p>
                <p>{user.github}</p>
                <p>follows : {user.following.length} people</p>
                <p>followers: {!followers ? 0 : followers.data.length} people </p>
            </div>
            <Link to={`/users/${userId}`}>Articles</Link>
            <Link to={`/users/${userId}/likes`}>Likes</Link>
            <div className="articlesList">
                {myLikes && (myLikes.data.map(el => {
                    return (
                        <div key={el._id}>
                            <Article value={el}></Article>
                        </div>
                    )
                }))}
            </div>

            <BottomNavbar />
        </div>
    );
}

export default Likes;