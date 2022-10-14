import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

function BottomNavbar() {
  const { user } = useContext(AuthContext);

  if (!user) return "loading";

  return (
    <div className="BottomNavbar nav">
      <ul>
        <li>
          <Link to="/">
            <i className="fas fa-home"></i>
          </Link>
        </li>
        <li>
          <Link to="/articles/new">
            <i className="fas fa-plus-square"></i>
          </Link>
        </li>
        <li>
          <Link to={`/users/${user._id}`}>
            <img src={user.avatarUrl} id="avatarNav" alt="profile" />
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default BottomNavbar;
