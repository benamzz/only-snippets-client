import { AuthContext } from "../context/auth.context";
import { useCallback, useContext, useEffect, useState } from "react";
import BottomNavbar from "../components/BottomNavbar";
import TopNavbar from "../components/TopNavbar";
import Article from "../components/Article";
import FollowButton from "../components/followButton";
import { Link, useParams } from "react-router-dom";
import api from "../api"

function Profile(props) {
  const [myUser, setMyUser] = useState(null);
  const [followers, setFollowers] = useState(null);
  const [myArticles, setMyArticles] = useState(null);
  const [myLikes, setMyLikes] = useState(null);
  const { userId } = useParams();
  const { isLoggedIn, logOutUser, user, refresh } = useContext(AuthContext);
  const [tab, setTab] = useState(0);

  const getMyUser = useCallback(() => {
    api().get(`/users/${userId}`)
      .then(userFromApi => setMyUser(userFromApi.data))
      .catch(err => console.log("err", err));
  }, [userId]);
  useEffect(() => {
    getMyUser();
  }, [getMyUser]);

  const getFollowers = useCallback(() => {
    api().get(`/users/${userId}/followers`)
      .then((followersFromAPI) => {
        setFollowers(followersFromAPI)
        refresh()
      })
      .catch((err) => console.log(err));
  }, [userId]);
  useEffect(() => {
    getFollowers();
  }, [getFollowers]);

  const getArticles = useCallback(() => {
    api().get(`/articles?userId=${userId}`)
      .then((articles) => {
        if (!props.value) { setTab(0) }
        const filteredArticles = articles.data.filter((el) => !el.parentId);
        setMyArticles(filteredArticles);
      })
      .catch((err) => console.log(err));
  }, [userId, props.value]);
  useEffect(() => {
    getArticles();
  }, [getArticles]);

  const getLikes = useCallback(() => {
    api().get(`/users/${userId}/likes`)
      .then((likes) => {
        if (props.value === "likes") { setTab(1) }
        setMyLikes(likes.data);
      })
      .catch((err) => console.log(err));
  }, [userId, props.value]);
  useEffect(() => {
    getLikes();
  }, [getLikes]);

  if (!myUser) return "loading";
  if (!myArticles) return "loading";
  if (!myLikes) return "loading";
  console.log("user", user)
  console.log("myUser", myUser)
  return (
    <div className="Profile">
      <TopNavbar />

      <div className="ProfileDetails">
        <section className="userTop">
          <div className="flex-child one">
            <img src={myUser.avatarUrl} id="avatar" alt="profile" />
          </div>

          <div className="flex-child two">
            <h2>@{myUser.username}</h2>
            {isLoggedIn && (
              (user._id === myUser._id ?
                <>
                  <Link to={`/users/${userId}/edit`}>
                    <i className="fas fa-user-edit"></i> Edit
                  </Link>
                  <button onClick={logOutUser}>
                    <i className="fas fa-sign-out-alt"></i> Logout
                  </button>
                </> : <FollowButton value={myUser} />
              )

            )}
          </div>
        </section>

        <div>
          <p id="bio">
            <i className="fas fa-coffee"></i> {myUser.bio}
          </p>
          <ul className="userInfo">
            <li>
              <i className="fas fa-map-marker-alt"></i> {myUser.location}
            </li>
            <li>
              <i className="fas fa-code"></i> {myUser.tags}
            </li>
            <a href={myUser.website} target="_blank">
              {myUser.website}
            </a>
            <Link to={myUser.linkedin} target="_blank">
              <i className="fab fa-linkedin"></i> {myUser.linkedin}
            </Link>
            <Link to={myUser.github} target="_blank">
              <i className="fab fa-github"></i> {myUser.github}
            </Link>
            <li>
              <Link id="fol-links" to={`/users/${userId}/follows`}>
                {myUser.following.length === 0 ? 0 : myUser.following.length} Follows
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
