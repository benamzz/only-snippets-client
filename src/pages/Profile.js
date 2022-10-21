import { AuthContext } from "../context/auth.context";
import { useContext, useEffect, useState } from "react";
import BottomNavbar from "../components/BottomNavbar";
import TopNavbar from "../components/TopNavbar";
import Article from "../components/Article";
import FollowButton from "../components/followButton";
import { Link, useParams } from "react-router-dom";
import api from "../api";

function Profile(props) {
  const [myUser, setMyUser] = useState(null);
  const [followers, setFollowers] = useState(null);
  const [myArticles, setMyArticles] = useState(null);
  const [myLikes, setMyLikes] = useState(null);
  const { userId } = useParams();
  const { isLoggedIn, logOutUser, user, refresh } = useContext(AuthContext);
  const [tab, setTab] = useState(0);

  //get User
  useEffect(() => {
    api()
      .get(`/users/${userId}`)
      .then((userFromApi) => setMyUser(userFromApi.data))
      .catch((err) => console.log("err", err));
  }, [userId]);

  //get followers
  useEffect(() => {
    api()
      .get(`/users/${userId}/followers`)
      .then((followersFromAPI) => {
        setFollowers(followersFromAPI);
        refresh();
      })
      .catch((err) => console.log(err));
  }, [userId]);

  //get articles
  useEffect(() => {
    api()
      .get(`/articles?userId=${userId}`)
      .then((articles) => {
        if (!props.value) {
          setTab(0);
        }
        const filteredArticles = articles.data.filter((el) => !el.parentId);
        setMyArticles(filteredArticles);
      })
      .catch((err) => console.log(err));
  }, [userId]);

  //get likes
  useEffect(() => {
    api()
      .get(`/users/${userId}/likes`)
      .then((likes) => {
        if (props.value === "likes") {
          setTab(1);
        }
        setMyLikes(likes.data);
      })
      .catch((err) => console.log(err));
  }, [userId, props.value]);

  if (!myUser) return "loading";
  if (!myArticles) return "loading";
  if (!myLikes) return "loading";

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
            {isLoggedIn &&
              (user._id === myUser._id ? (

                <div className="EditLogoutContainer">

                  <Link id="edit-btn" to={`/users/${userId}/edit`}>
                    <i className="fas fa-user-edit">
                      <p>Edit</p>
                    </i>
                  </Link>

                  <button onClick={logOutUser}>
                    <i className="fas fa-sign-out-alt">
                      <p>Logout</p>
                    </i>
                  </button>
                </div>
              ) : (
                <FollowButton value={myUser} />
              ))}
          </div>
        </section>

        <div className="userInfo">
          {myUser.location && (
            <p className="bio">
              <i className="fas fa-map-marker-alt"></i> {myUser.location}
            </p>
          )}

          {myUser.bio && (
            <p className="bio">
              <i className="fas fa-coffee"></i> {myUser.bio}
            </p>
          )}

          {myUser.tags.length > 0 && <p className="bio">
            <i className="fas fa-code"></i> {myUser.tags.map(e => { return `${e} || ` })}
          </p>}
        </div>

        <div>
          <ul className="userInfoLink">
            {myUser.website && (
              <li>
                <i className="fas fa-desktop"> </i>
                <a
                  href={`https://www.${myUser.website}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  {myUser.website}
                </a>
              </li>
            )}
            <li>
              {myUser.linkedin && (
                <a
                  href={`https://www.${myUser.linkedin}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <i className="fab fa-linkedin"></i>
                </a>
              )}
            </li>
            <li>
              {myUser.github && (
                <a
                  href={`http://www.${myUser.github}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <i className="fab fa-github"></i>
                </a>
              )}
            </li>
          </ul>
          <div className="FollowsLink">
            <Link id="fol-links" to={`/users/${userId}/follows`}>
              {myUser.following.length === 0 ? 0 : myUser.following.length}{" "}
              Followings
            </Link>
            <Link id="fol-links" to={`/users/${userId}/followers`}>
              {!followers ? 0 : followers.data.length} Followers
            </Link>
          </div>
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
        {tab === 0 &&
          myArticles.map((el) => {
            return (
              <div key={el._id}>
                <Article value={el}></Article>
              </div>
            );
          })}
        {tab === 1 &&
          myLikes.map((el) => {
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
