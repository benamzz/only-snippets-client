import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

function BottomNavbar() {
  const { user } = useContext(AuthContext);

  if (!user) return "loading";

  return (
    <div className="BottomNavbar nav">
      <ul>
        <li>
          <a href="/">
            <i class="fas fa-home"></i>
          </a>
        </li>
        <li>
          <a href="/articles/new">
            <i class="fas fa-plus-square"></i>
          </a>
        </li>
        <li>
          <a href={`/users/${user._id}`}>
            <img src={user.avatarUrl} id="avatarNav" alt="profile" />
          </a>
        </li>
      </ul>
    </div>
  );
}

export default BottomNavbar;
