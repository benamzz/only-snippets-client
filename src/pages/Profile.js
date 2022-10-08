import { AuthContext } from "../context/auth.context";
import { useCallback, useContext, useEffect, useState } from "react";
import BottomNavbar from "../components/BottomNavbar";
import TopNavbar from "../components/TopNavbar";
import axios from "axios";
import { useParams } from "react-router-dom";

function Profile() {
  const API_URL = "http://localhost:5005";
  const [user, setUser] = useState(null);
  const { userId } = useParams();
  const { isLoggedIn, currentUser, logOutUser } = useContext(AuthContext);

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
  useEffect(() => {
    getUser();
  }, [getUser]);


  if (!user) return "loading";

  return (
    <div className="Profile">
      <TopNavbar />
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
      <BottomNavbar />
    </div>
  );
}

export default Profile;
