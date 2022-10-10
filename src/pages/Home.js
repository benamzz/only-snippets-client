import BottomNavbar from "../components/BottomNavbar";
import TopNavbar from "../components/TopNavbar";
import { AuthContext } from "../context/auth.context";
import { useContext } from "react";
import { Link } from "react-router-dom"

function Home() {
  const currentUser = useContext(AuthContext);
  console.log('currentUser:', currentUser)
  if (!currentUser.user) {
    return (
      <div className="Home">
        <p>Please log in</p>
        <Link to={"/signup"}>Sign Up</Link>
        <Link to={"/login"}>Log In</Link>
      </div>
    )
  }
  else {
    return (
      <div className="Home">
        <TopNavbar />
        <section>
          <h1>hello {currentUser.username}</h1>
          <img src={currentUser.avatarUrl} alt="avatar" />
          <p>
            Pikachu (ピカチュウ, Pikachū?) est une espèce de Pokémon, une créature
            de fiction issue de la franchise médiatique Pokémon de Nintendo. Il est
            apparu.
          </p>
        </section>
        <BottomNavbar />
      </div>
    );
  }


}

export default Home;
