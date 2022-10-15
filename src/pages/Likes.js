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
  const [followers, setFollowers] = useState(null);
  const [myLikes, setMyLikes] = useState(null);
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

  const getLikes = useCallback(() => {
    const storedToken = localStorage.getItem("authToken");
    axios
      .get(`${API_URL}/api/users/${userId}/likes`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((likes) => {
        setMyLikes(likes);
      })
      .catch((err) => console.log(err));
  }, [userId]);
  useEffect(() => {
    getLikes();
  }, [getLikes]);

  if (!user) return "loading";

  return (
    <div className="Profile">
      <TopNavbar />
      <div className="ProfileDetails">
        <section className="userTop">
          <div className="flex-child one">
            <img src={user.avatarUrl} id="avatar" alt="profile" />
          </div>

          <div className="flex-child two">
            <h3>@{user.username}</h3>
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
            <li>follows : {user.following.length} people</li>
            <li>
              {" "}
              followers: {!followers ? 0 : followers.data.length} people{" "}
            </li>
          </ul>
        </div>
        <Link to={`/users/${userId}/follows`}>following</Link>
        <Link to={`/users/${userId}/followers`}>followers</Link>
      </div>

      <nav className="slidemenu">
        <input
          type="radio"
          name="slideItem"
          id="slide-item-1"
          className="slide-toggle"
          checked
        />
        <label for="slide-item-1">
          <span>
            <Link to={`/users/${userId}`}>Articles</Link>
          </span>
        </label>

        <input
          type="radio"
          name="slideItem"
          id="slide-item-2"
          className="slide-toggle"
        />
        <label for="slide-item-2">
          <span>
            {" "}
            <Link to={`/users/${userId}/likes`}>Likes</Link>
          </span>
        </label>

        <div className="clear"></div>

        <div className="slider">
          <div className="bar"></div>
        </div>
      </nav>

      {/* <Link to={`/users/${userId}`}>Articles</Link>
      <Link to={`/users/${userId}/likes`}>Likes</Link> */}
      <div className="articlesList">
        {myLikes &&
          myLikes.data.map((el) => {
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

export default Likes;
