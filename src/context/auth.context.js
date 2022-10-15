// src/context/auth.context.js

import { getNextKeyDef } from "@testing-library/user-event/dist/keyboard/getNextKeyDef";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api"
const AuthContext = React.createContext();

function AuthProviderWrapper(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const navigate = useNavigate()
  const storeToken = (token) => {
    localStorage.setItem('authToken', token);
  }

  const authenticateUser = () => {
    // Get the stored token from the localStorage
    const storedToken = localStorage.getItem('authToken');

    // If the token exists in the localStorage
    if (storedToken) {
      // We must send the JWT token in the request's "Authorization" Headers
      api().get(`/session`)
        .then((response) => {
          // If the server verifies that JWT token is valid  
          const user = response.data;

          // Update state variables        
          setIsLoggedIn(true);
          setIsLoading(false);
          setUser(user);
        })
        .catch((error) => {
          // If the server sends an error response (invalid token) 
          // Update state variables         
          setIsLoggedIn(false);
          setIsLoading(false);
          setUser(null);
        });
    } else {
      // If the token is not available (or is removed)
      setIsLoggedIn(false);
      setIsLoading(false);
      setUser(null);
    }
  }

  const removeToken = () => {
    // Upon logout, remove the token from the localStorage
    localStorage.removeItem("authToken");
  }

  const logOutUser = () => {
    // To log out the user, remove the token
    removeToken();
    // and update the state variables    
    authenticateUser();
    navigate("/login")
  }

  function refresh() {
    api().get('/session')
      .then(response => {
        setUser(response.data)
      })
      .catch(err => console.log(err))
  }

  useEffect(() => {
    authenticateUser();
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, isLoading, user, storeToken, authenticateUser, logOutUser, refresh }}>
      {props.children}
    </AuthContext.Provider>
  )
}

export { AuthProviderWrapper, AuthContext };
