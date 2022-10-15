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
  const [myLikes, setMyLikes] = useState(null);
  const { userId } = useParams();
  const { isLoggedIn, logOutUser } = useContext(AuthContext);
  const [tab, setTab] = useState(0);


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

  const getLikes = useCallback(() => {
    const storedToken = localStorage.getItem("authToken");
    axios
      .get(`${API_URL}/api/users/${userId}/likes`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((likes) => {
        setMyLikes(likes.data);
      })
      .catch((err) => console.log(err));
  }, [userId]);
  useEffect(() => {
    getLikes();
  }, [getLikes]);

  if (!user) return "loading";
  if (!myArticles) return "loading";
  if (!myLikes) return "loading";
 
  return (
    <div className="Profile">
      <TopNavbar />

      <div className="ProfileDetails">
        <section className="userTop">
          <div className="flex-child one">
            <img src={user.avatarUrl} id="avatar" alt="profile" />
          </div>

          <div className="flex-child two">
            <h2>@{user.username}</h2>
            {isLoggedIn && (
              <>
                <a href={`/users/${userId}/edit`}>
                  <i className="fas fa-user-edit"></i> Edit
                </a>
                <button onClick={logOutUser}>
                  <i className="fas fa-sign-out-alt"></i> Logout
                </button>
              </>
            )}
          </div>
        </section>

        <div>
          <p id="bio">
            <i className="fas fa-coffee"></i> {user.bio}
          </p>
          <ul className="userInfo">
            <li>
              <i className="fas fa-map-marker-alt"></i> {user.location}
            </li>
            <li>
              <i className="fas fa-code"></i> {user.tags}
            </li>
            <li>{user.website}</li>
            <li>
              <i className="fab fa-linkedin"></i> {user.linkedin}
            </li>
            <li>
              <i className="fab fa-github"></i> {user.github}
            </li>
            <li>
              <Link id="fol-links" to={`/users/${userId}/follows`}>
                {user.following.length} Follows
              </Link>
            </li>
            <li>
              <Link id="fol-links" to={`/users/${userId}/followers`}>
                {!followers ? 0 : followers.data.length} Followers 
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="containerSlider">
        <section className="colorSlider">
          <div className="effectSlider">
            <h3 onClick={() => setTab(0)}>Articles</h3>
            <h3 onClick={() => setTab(1)}>Likes</h3>
          </div>
        </section>
      </div>

      <div className="articlesList">
        {tab === 0 && myArticles.map((el) => {
          return (
            <div key={el._id}>
              <Article value={el}></Article>
            </div>
          );
        })}
    
        {tab === 1 && myLikes.map((el) => {
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
