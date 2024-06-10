import "./styles/Navbar.css";
// import logo from "../components/images/logomain.png";
import facebook from "../components/images/facebook-50.png";
import twitter from "../components/images/twitter-50.png";
import profile from "../components/images/profile.png";
import { Link, useNavigate } from "react-router-dom";
import React, { createContext, useContext, useState } from "react";
import { useAuth } from "./SharedStateContext";
import logo from "./images/logo.png";

export default function Navbar({ toggleSidebar }) {
  const { logged, setlogged } = useAuth();
  const navigate = useNavigate();
  const logout = () => {
    navigate("/");
    setlogged(false);
  };
  return (
    <div id="mainNav">
      <div>
        <Link to="/" className="a">
          <img
            src={logo}
            alt="CogniDraw Logo"
            width="130"
            height="60"
            className="imglogo"
          />

          {/* Logo */}
        </Link>
      </div>
      <div className="socialicons">
        {logged ? (
          <div className="dropdown-content">
            <a href="#" onClick={toggleSidebar}>
              HISTORY
            </a>
            <a href="#">CHANGE PASSWORD</a>
            <a onClick={logout}>LOGOUT</a>
          </div>
        ) : (
          <>
            <Link to="/login" className="a">
              LOGIN
            </Link>
            <Link to="/signup" className="a">
              SIGNUP
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
