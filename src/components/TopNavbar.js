import { Link } from "react-router-dom";
import logoOnlySnippets from "../components/logoOnlySnippets.png";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

function TopNavbar() {
  const { user } = useContext(AuthContext);

  if (!user) return "loading";
  return (
    <div className="TopNavbar nav">
      <ul>
        <li>
          <Link to="/search">
            <i className="fas fa-search"></i>
          </Link>
        </li>
        <li>

          <Link to="/">
            <img src={logoOnlySnippets} alt="snippet" />
          </Link>
        </li>
        <li>
          <Link to={`/users/${user._id}/likes`}>
            <i className="fas fa-heart"></i>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default TopNavbar;