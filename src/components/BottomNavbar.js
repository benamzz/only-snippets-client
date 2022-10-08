function BottomNavbar() {
  return (
    <div className="BottomNavbar">
      <a href="/">HOME</a>
      <a href="/articles/new">New article</a>
      <a href="/users/:id">MYprofile</a>
    </div>
  );
}

export default BottomNavbar;
