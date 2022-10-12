import BottomNavbar from "../components/BottomNavbar";
import TopNavbar from "../components/TopNavbar";
import { AuthContext } from "../context/auth.context";
import { useContext } from "react";
import { Link } from "react-router-dom";
import snippetImg from "../components/codeSnippet.svg";

function Home() {
  const currentUser = useContext(AuthContext);
  // console.log("currentUser:", currentUser);
  if (!currentUser.user) {
    return (
      <div className="HomeDisconnected">
        <h1>Welcome <span>to</span> <span id="name-app" >only.snippet</span> </h1>

        <img src={snippetImg} alt="snippet"/>
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
        <section>
          <h1>hello {currentUser.user.username}</h1>
          <img src={currentUser.user.avatarUrl} alt="avatar" />
          <p>
            Pikachu (ピカチュウ, Pikachū?) est une espèce de Pokémon, une
            créature de fiction issue de la franchise médiatique Pokémon de
            Nintendo. Il est apparu.
          </p>
        </section>
        <BottomNavbar />
      </div>
    );
  }
}

export default Home;
