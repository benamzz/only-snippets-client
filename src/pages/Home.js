import BottomNavbar from "../components/BottomNavbar";
import TopNavbar from "../components/TopNavbar";
import { AuthContext } from "../context/auth.context";
import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import snippetImg from "../components/codeSnippet.svg";
import api from "../api"
import Article from "../components/Article";

function Home() {
  const { user } = useContext(AuthContext);
  const [myArticles, setMyArticles] = useState(null)

  useEffect(() => {
    api().get(`/articles`)
      .then((articles) => {
        console.log('articles', articles.data)
        const noCommentsFilter = articles.data.filter(el => !el.parentId)
        const followingArticles = noCommentsFilter.filter(el => {
          return user.following.includes(el.userId._id)
        })
        const userArticles = noCommentsFilter.filter(el => {
          return user._id === el.userId._id
        })
        const feedArticles = followingArticles.concat(userArticles)
        setMyArticles(feedArticles)
      })
      .catch(err => console.log(err))
  }, [user])

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
  }
  if (!myArticles) { return "loading" }
  return (
    <div className="Home">
      <TopNavbar />
      <h1>Feed</h1>
      {myArticles && (myArticles.map(el => {
        return (<Article value={el} key={el._id} />)
      }))}
      <BottomNavbar />
    </div>
  );
}

export default Home;
