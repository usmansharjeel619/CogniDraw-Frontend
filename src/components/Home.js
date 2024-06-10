import { React, useState } from "react";
import mainimg from "./images/nn.jpg";
import homepng from "./images/homepng.gif";
import Navbar from "./navbar";
import "./styles/Home.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./SharedStateContext";
import Sidebar from "./Sidebar";
export default function Home() {
  const { logged, setlogged } = useAuth();
  // console.log(logged);
  const navigate = useNavigate();
  const toNextScreen = () => {
    if (logged) {
      console.log(logged);
      navigate("/InputScreen");
    } else {
      console.log(logged);
      navigate("/login");
    }
  };
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };
  return (
    <>
      <Navbar toggleSidebar={toggleSidebar} />
      <div id="mainHome">
        <div className="Homeinner Homeinner1">
          <div className="hometext">
            <h1 className="homeheading">
              Stop Wasting Time on Diagrams. Generate Them with AI!
            </h1>
            <p>
              Struggling to create clear and concise software diagrams? Let AI
              take the wheel! Our platform automates the diagram generation
              process, saving you valuable time and effort. Simply describe your
              software or workflow, and our AI engine will instantly generate a
              professional-looking diagram.
            </p>
            <div>
              <button className="button" onClick={toNextScreen}>
                Get Started
              </button>
            </div>
          </div>
        </div>
        <div>
          <img
            src={homepng}
            alt="CogniDraw Logo"
            width="600"
            height="600"
            className="mainimg"
          />
        </div>
      </div>
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
    </>
  );
}
