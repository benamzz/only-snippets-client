import BottomNavbar from "../components/BottomNavbar";
import TopNavbar from "../components/TopNavbar";
import {AuthContext} from "../context/auth.context";
import { useContext } from "react";
import axios from "axios";

function Home() {
  const currentUser = useContext(AuthContext);
  return (
    <div className="Home">
      <TopNavbar />
      <section>
      <h1>hello {currentUser.user.username}</h1>
      <img src={currentUser.user.avatarUrl}/>
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

export default Home;
