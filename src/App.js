import './App.css';
import Home from "./pages/Home"
import Login from "./pages/Login"
import Signup from "./pages/Signup"


import {Routes, Route} from 'react-router-dom'


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={ <Home /> } />
        <Route path="/Signup" element={ <Signup /> } />
        <Route path="/Login" element={ <Login /> } />
      </Routes>
    </div>
  );
}

export default App;
