import { useContext } from 'react';
import { AuthContext } from "../context/auth.context";

function BottomNavbar() {
  const { user } = useContext(AuthContext);

  if (!user) return "loading"

  return (
    <div className="BottomNavbar">
      <a href="/">HOME</a>
      <a href="/articles/new">New article</a>
      <a href={`/users/${user._id}`}>MYprofile</a>
    </div>
  );
}

export default BottomNavbar;
