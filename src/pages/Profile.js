import { AuthContext } from "../context/auth.context";
import { useCallback, useContext, useEffect, useState } from "react";
import BottomNavbar from "../components/BottomNavbar";
import TopNavbar from "../components/TopNavbar";
import Article from "../components/Article";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

function Profile() {
  const API_URL = "http://localhost:5005";
  const [user, setUser] = useState(null);
  const [followers, setFollowers] = useState(null);
  const [myArticles, setMyArticles] = useState(null);
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
  useEffect(() => {
    getUser();
  }, [getUser]);

  const getFollowers = useCallback(() => {
    const storedToken = localStorage.getItem("authToken");
    axios
      .get(`${API_URL}/api/users/${userId}/followers`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((followers) => setFollowers(followers))
      .catch((err) => console.log(err));
  }, [userId]);
  useEffect(() => {
    getFollowers();
  }, [getFollowers]);

  const getArticles = useCallback(() => {
    const storedToken = localStorage.getItem("authToken");
    axios
      .get(`${API_URL}/api/articles?userId=${userId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((articles) => {
        const filteredArticles = articles.data.filter((el) => !el.parentId);
        setMyArticles(filteredArticles);
      })
      .catch((err) => console.log(err));
  }, [userId]);

  useEffect(() => {
    getArticles();
  }, [getArticles]);

  if (!user) return "loading";

  return (
    <div className="Profile">
      <TopNavbar />

      <div className="ProfileDetails">
        
        <section class="userTop"> 
          
          <div class="flex-child one">
            <img src={user.avatarUrl} id="avatar" alt="profile" />
          </div>
          
          <div class="flex-child two">
            <h4>@{user.username}</h4>
            {isLoggedIn && (
              <>
                <a href={`/users/${userId}/edit`}>Edit</a>
                <button onClick={logOutUser}>Logout</button>
              </>
            )}
          </div>
          
        </section>
         
        <div >
          <ul class="userInfo">
            <li>
              <p>{user.bio}</p>
            </li>
            <li>
              <p>{user.location}</p>
            </li>
            <li>
              <p>{user.tags}</p>
            </li>
            <li>
              <p>{user.website}</p>
            </li>
            {/* <li>
              <p>{user.linkedin}</p>
            </li> */}
            <li>
              <p>{user.github}</p>
            </li>
            <li>
              <p>follows : {user.following.length} people</p>
            </li>
            <li>
              <p>followers: {!followers ? 0 : followers.data.length} people </p>
            </li>
          </ul>
        </div>

      

        {/* <img src={user.avatarUrl} id="avatar" alt="profile" />
        <h2>@{user.username}</h2>
        <p>{user.bio}</p>
        <p>{user.location}</p>
        <p>{user.tags}</p>
        <p>{user.website}</p>
        <p>{user.linkedin}</p>
        <p>{user.github}</p>
        <p>follows : {user.following.length} people</p>
        <p>followers: {!followers ? 0 : followers.data.length} people </p> */}
      </div>

      <Link to={`/users/${userId}`}>Articles</Link>
      <Link to={`/users/${userId}/likes`}>Likes</Link>
      <Link to={`/users/${userId}/follows`}>following</Link>
      <Link to={`/users/${userId}/followers`}>followers</Link>
      <div className="articlesList">
        {myArticles &&
          myArticles.map((el) => {
            return (
              <div key={el._id}>
                <Article value={el}></Article>
              </div>
            );
          })}
      </div>

      <BottomNavbar />
    </div>
  );
}

export default Profile;
