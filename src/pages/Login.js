import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import logoOnlySnippets from "../components/logoOnlySnippets.png";
import api from "../api"

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

    api()
      .post(`/sessions`, requestBody)
      .then((response) => {
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
      <br />
      <img src={logoOnlySnippets} alt="snippet" id="logSignLogo" />

    </div>
  );
}

export default Login;
