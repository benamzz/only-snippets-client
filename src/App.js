import './App.css';
import Home from "./pages/Home"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Profile from './pages/Profile';
import Snippet from './pages/Snippet';
import ArticleDetails from './pages/ArticleDetails';

import { Routes, Route } from 'react-router-dom'


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/users/:userId" element={<Profile />} />
        <Route path="/" element={<Home />} />
        <Route path="/articles/:articleId/snippet/:snippetId" element={<Snippet />} />
        <Route path="/articles/:articleId" element={<ArticleDetails />} />
      </Routes>
    </div>
  );
}

export default App;
