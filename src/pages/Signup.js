// src/pages/Signup.js

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logoOnlySnippets from "../components/logoOnlySnippets.png";
import api from "../api"

const API_URL = "http://localhost:5005";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email, password };
    api().post(`${API_URL}/api/users`, requestBody)
      .then(() => navigate("/login"))
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div className="Signup">
      <a href="/" id="arrow-back">
        <i class="fas fa-arrow-circle-left"></i>
      </a>

      <h2>Create your account</h2>

      <form onSubmit={handleSignupSubmit}>

        <label>Email <i className="fas fa-at"> :</i></label>
        <input type="email" name="email" value={email} onChange={handleEmail} placeholder="Your email adress"
        />

        <label>Password :</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handlePassword}
          placeholder="Your password"

        />

        <div className="btn-auth-div">
          <button type="submit" id="auth-btn">Sign Up</button>
        </div>
      </form>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <p>Already have account?</p>
      <Link to={"/login"}> Login</Link>
      <br />
      <img src={logoOnlySnippets} alt="snippet" id="logSignLogo" />

    </div>
  );
}

export default Signup;
