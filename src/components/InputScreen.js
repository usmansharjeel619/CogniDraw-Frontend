import React from "react";
import { useState } from "react";
import "./styles/InputScreen.css";
import Navbar from "./navbar";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "./SharedStateContext";
import Sidebar from "./Sidebar";
export default function InputScreen() {
  const { logged, setlogged } = useAuth();
  const navigate = useNavigate();
  const [userInput, setUserInput] = useState("");
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  if (!logged) {
    return <Navigate to="/login" />;
  }
  const MIN_LENGTH = 250;
  const toNextScreen = () => {
    if (userInput.length >= MIN_LENGTH) {
      const diagramData = userInput;
      navigate(`/DiagramType/${diagramData}`);
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };
  return (
    <>
      <Navbar toggleSidebar={toggleSidebar} />
      <div className="mainInputscreen">
        <div className="star"></div>

        {/* <div className="inputinner1">
          <button className="newinput-button">New Input</button>
        </div> */}
        <div className="inputinner2">
          <div className="generate">
            <textarea
              id="inputtext"
              rows="35"
              cols="140"
              minlength="10"
              placeholder="Enter text here..."
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
            />{" "}
            <button className="button InputButton2" onClick={toNextScreen}>
              Generate
            </button>
          </div>
          <h3>OR</h3>
          <button className="button">Upload Document</button>
        </div>
      </div>
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
    </>
  );
}
