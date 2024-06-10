import React from "react";
import "./styles/login.css";
import mainlogo from "../components/images/logomain.png";
import login2 from "./images/login2.png";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "./SharedStateContext";

export default function Login() {
  const { logged, setlogged } = useAuth();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post("http://127.0.0.1:3001/login", { email, password })
      .then((result) => {
        console.log(result);

        alert("login successfully! .");
        navigate("/");
        setlogged(true);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="LoginMainBody">
      <div className="logo">
        <img src={login2} alt="CogniDraw Logo" width="500" height="500" />
      </div>
      <div className="login-form">
        <div className="circle2"></div>
        <h2 className="form-title">Log in </h2>
        <form onSubmit={handleSubmit} action="#" method="post">
          <div className="login-input-field">
            <label htmlFor="username" className="login-input-label">
              User Email
            </label>
            <input
              type="email"
              id="username"
              className="input"
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>

          <div className="login-input-field">
            <label htmlFor="password" className="login-input-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="input"
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>

          <button type="submit" className="login-button">
            Login{" "}
          </button>

          <div className="forgetpass">
            <Link to="/signup">Sign up</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
