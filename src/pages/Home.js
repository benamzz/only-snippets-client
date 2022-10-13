import BottomNavbar from "../components/BottomNavbar";
import TopNavbar from "../components/TopNavbar";
import { AuthContext } from "../context/auth.context";
import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import snippetImg from "../components/codeSnippet.svg";
import axios from "axios"
import Article from "../components/Article";

function Home() {
  const API_URL = "http://localhost:5005";
  const { user } = useContext(AuthContext);
  const [myArticles, setMyArticles] = useState(null)

  console.log("user:", user)
  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");

    if (!user) return

    axios.get(`${API_URL}/api/articles`, {
      headers: { Authorization: `Bearer ${storedToken}` },
    })
      .then((articles) => {
        const noCommentsFilter = articles.data.filter(el => !el.parentId)
        const filteredArticles = noCommentsFilter.filter(el => {
          return user.following.includes(el.userId._id)
        })
        setMyArticles(filteredArticles)
      })
      .catch(err => console.log(err))
  }, [user])

  if (!myArticles) return "loading"

  if (!user) {
    return (
      <div className="HomeDisconnected">
        <h1>Welcome <span>to</span> <span id="name-app" >only.snippet</span> </h1>

        <img src={snippetImg} alt="snippet" />
        <p>an app for developers by developers </p>

        <div id="two-auth">
          <Link id="auth-btn" to={"/signup"}>Sign Up</Link>
          <Link to={"/login"} id="auth-btn">Log In</Link>
        </div>
      </div>
    );
  } else {
    return (
      <div className="Home">
        <TopNavbar />
        {myArticles && (myArticles.map(el => {
          return (<Article value={el} key={el._id} />)
        }))}
        <BottomNavbar />
      </div>
    );
  }
}

export default Home;
