import './App.css';
import Home from "./pages/Home"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Profile from './pages/Profile';
import Snippet from './pages/Snippet';
import ArticleDetails from './pages/ArticleDetails';
import ArticleNew from './pages/ArticleNew';

import { Routes, Route } from 'react-router-dom'


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/users/:userId" element={<Profile />} />
        <Route path="/" element={<Home />} />
        <Route path="/articles/new" element={<ArticleNew />} />
        <Route path="/articles/:articleId/snippet/:snippetId" element={<Snippet />} />
        <Route path="/articles/:articleId/comment" element={<ArticleNew />}></Route>
        <Route path="/articles/:articleId" element={<ArticleDetails />} />
      </Routes>
    </div>
  );
}

export default App;
