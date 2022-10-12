import './App.css';
import Home from "./pages/Home"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Followers from './pages/Followers';
import Follows from './pages/Follows'
import Profile from './pages/Profile';
import Snippet from './pages/Snippet';
import ArticleDetails from './pages/ArticleDetails';
import ArticleNew from './pages/ArticleNew';
import Likes from './pages/Likes'
import { Routes, Route } from 'react-router-dom'


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/users/:userId/likes" element={<Likes />} />
        <Route path="/users/:userId/followers" element={<Followers />} />
        <Route path="/users/:userId/follows" element={<Follows />} />
        <Route path="/users/:userId" element={<Profile />} />
        <Route path="/" element={<Home />} />
        <Route path="/articles/new" element={<ArticleNew />} />
        <Route path="/articles/:articleId/snippet/:snippetId" element={<Snippet />} />
        <Route path="/articles/:articleId/comment" element={<ArticleNew />} />
        <Route path="/articles/:articleId" element={<ArticleDetails />} />
      </Routes>
    </div>
  );
}

export default App;
