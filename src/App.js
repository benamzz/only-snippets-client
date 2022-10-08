import './App.css';
import Home from "./pages/Home"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Profile from './pages/Profile';

import {Routes, Route} from 'react-router-dom'


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/Signup" element={ <Signup /> } />
        <Route path="/Login" element={ <Login /> } />
        <Route path="/users/:userId" element={ <Profile /> } />
        <Route path="/" element={ <Home />} />
      </Routes>
    </div>
  );
}

export default App;
