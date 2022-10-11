import BottomNavbar from "../components/BottomNavbar";
import TopNavbar from "../components/TopNavbar";
import { AuthContext } from "../context/auth.context";
import { useContext } from "react";
import { Link } from "react-router-dom";
import snippetImg from "../components/codeSnippet.svg";

function Home() {
  const currentUser = useContext(AuthContext);
  console.log("currentUser:", currentUser);
  if (!currentUser.user) {
    return (
      <div className="Home">
        <h1>Welcome to only.snippet</h1>

        <img src={snippetImg} alt="snippet" />
        <Link to={"/signup"}>Sign Up</Link>
        <Link to={"/login"}>Log In</Link>
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
