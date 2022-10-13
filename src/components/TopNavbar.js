import logoOnlySnippets from "../components/logoOnlySnippets.png";

function TopNavbar() {
  return (
    <div className="TopNavbar nav">
      <ul>
        <li>
          <a href="/search">
            <i class="fas fa-search"></i>
          </a>
        </li>
        <li>
         
          <a href="/">
            
            <img src={logoOnlySnippets} alt="snippet" />
          </a>
        </li>
        <li>
          <a href="/users/:id/love">
            <i class="fas fa-heart"></i>
          </a>
        </li>
      </ul>
    </div>
  );
}

export default TopNavbar;
