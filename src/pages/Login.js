// src/pages/Login.js

import { useState, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

const API_URL = "http://localhost:5005";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();
  const { storeToken, authenticateUser } = useContext(AuthContext);

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email, password };

    axios
      .post(`${API_URL}/api/sessions`, requestBody)
      .then((response) => {
        // Request to the server's endpoint `/auth/login` returns a response
        // with the JWT string ->  response.data.authToken
        console.log("JWT token", response.data.authToken);
        storeToken(response.data.authToken);

        authenticateUser();

        navigate("/");
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div className="Login">
      <a href="/signup" id="arrow-back"><i class="fas fa-arrow-circle-left"></i></a>
     
      <h2>Welcome back!</h2>

      <form onSubmit={handleLoginSubmit}>

        <div className="googleAuth-btn">
          <a href="#">
            <img src="https://d3ptyyxy2at9ui.cloudfront.net/google-32ae27.svg" alt="" />
            Google Login
          </a>
        </div>

        <div>or</div>

        <label>
          Email <i className="fas fa-at"> :</i>
        </label>
        <input
          type="email"
          name="email"
          placeholder="Your email adress"
          value={email}
          onChange={handleEmail}
        />

        <label>Password :</label>
        <input
          type="password"
          name="password"
          placeholder="Your password"
          value={password}
          onChange={handlePassword}
        />
        <a className="pwd-reset" href="#">
          forgot my password...
        </a>

        <div className="btn-auth-div">
        <button id="auth-btn" type="submit">
          Login
        </button>
        </div>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <p>Don't have an account yet?</p>
      <Link to={"/signup"}> Sign Up</Link>

    </div>
  );
}

export default Login;
