function TopNavbar() {
  return (
    <div className="TopNavbar">
      <nav>
        <a href="/search">Search</a>
        <a href="/">Home</a>
        <a href="/users/:id/love">♥️</a>
      </nav>
    </div>
  );
}

export default TopNavbar;
