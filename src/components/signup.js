import React from "react";
import "./styles/Signup.css";
import mainlogo from "../components/images/logomain.png";
import signup2 from "./images/signup2.png";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
export default function Signup() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post("http://127.0.0.1:3001/signup", { name, email, password })
      .then((result) => {
        console.log(result);
        if (result.data === "Already registered") {
          alert("E-mail already registered! Please Login to proceed.");
          navigate("/login");
        } else {
          alert("Registered successfully! Please Login to proceed.");
          navigate("/login");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="MainBody">
      <div className="logo">
        <img src={signup2} alt="CogniDraw Logo" width="500" height="500" />
      </div>
      <div className="signup-form">
        <div className="circle3"></div>
        <h2 className="form-title">Sign Up</h2>
        <form onSubmit={handleSubmit} action="#" method="post">
          <div className="input-field">
            <label htmlFor="username" className="input-label">
              Username
            </label>
            <input
              type="text"
              id="username"
              className="input"
              name="username"
              onChange={(event) => setName(event.target.value)}
            />
          </div>
          <div className="input-field">
            <label htmlFor="email" className="input-label">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="input"
              name="email"
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div className="input-field">
            <label htmlFor="password" className="input-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="input"
              name="password"
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <div className="input-field">
            <label htmlFor="confirm-password" className="input-label">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirm-password"
              className="input"
              name="confirmpassword"
            />
          </div>
          <button type="submit" className="signup-button">
            Sign Up
          </button>
        </form>
        <div id="acc">
          <Link to="/login"> Already an account</Link>
        </div>
        <div className="triangle3"></div>
      </div>
    </div>
  );
}
