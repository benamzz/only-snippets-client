function TopNavbar() {
  return (
    <div className="TopNavbar">
      <a href="/search">search</a>
      <a href="/">Home</a>
      <a href="/users/:id/love">MY loves</a>
    </div>
  );
}

export default TopNavbar;
