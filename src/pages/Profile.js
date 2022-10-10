import { AuthContext } from "../context/auth.context";
import { useCallback, useContext, useEffect, useState } from "react";
import BottomNavbar from "../components/BottomNavbar";
import TopNavbar from "../components/TopNavbar";
import Article from "../components/Article";
import axios from "axios";
import { useParams } from "react-router-dom";

function Profile() {
  const API_URL = "http://localhost:5005";
  const [user, setUser] = useState(null);
  const [followers, setFollowers] = useState(null)
  const [myArticles, setMyArticles] = useState(null)
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
      .catch((err) => console.log("coucou err", err));
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

  const getArticles = useCallback(() => {
    const storedToken = localStorage.getItem("authToken");
    axios.get(`${API_URL}/api/articles?userId=${userId}`, {
      headers: { Authorization: `Bearer ${storedToken}` },
    })
      .then((articles) => { setMyArticles(articles) })
      .catch(err => console.log(err))
  }, [userId])
  useEffect(() => { getArticles() }, [getArticles])


  console.log('user:', user)
  console.log('followers', followers)
  console.log('articles:', myArticles)

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
      <div className="articlesList">
        {myArticles && (myArticles.data.map(el => {
          return (
            <Article value={el}></Article>
          )
        }))}
      </div>

      <BottomNavbar />
    </div>
  );
}

export default Profile;
