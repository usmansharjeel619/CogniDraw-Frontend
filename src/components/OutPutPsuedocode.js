import { React, useEffect, useState } from "react";
import download from "./images/download-30.png";
import { Navigate, useNavigate, Link, useParams } from "react-router-dom";
import { useAuth } from "./SharedStateContext";
import Navbar from "./navbar";
import "./styles/Pseudocode.css";
import Sidebar from "./Sidebar";
export default function OutPutPsuedocode() {
  const { logged, setlogged } = useAuth();
  const { diagramType, outputDiagram } = useParams();
  const [outDiagram, setOutDiagram] = useState("");
  const [data, setData] = useState("");
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (!logged) {
      navigate("/login");
    }
  }, [logged, navigate]);
  var diagram;
  if (diagramType == "SSD") {
    diagram = " Sequence Diagram";
  } else if (diagramType == "ERD") {
    diagram = "Entity Relation Diagram";
  } else if (diagramType == "CD") {
    diagram = "Class Diagram";
  } else {
    diagram = "None";
  }

  useEffect(() => {
    // Retrieve data from local storage
    const storedData = localStorage.getItem("generatedPsuedo");
    setData(storedData || "Not Found"); // Set data to retrieved value or empty string if not found
  }, []);

  const handleChange = (event) => {
    const newData = event.target.value;
    setData(newData);
    localStorage.setItem("generatedPsuedo", newData);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };
  return (
    <>
      <Navbar toggleSidebar={toggleSidebar} />
      <div className="mainOutPut">
        <p className="diagramselected">Seleceted diagram is {diagram}</p>
        <div className="innerOutPut">
          <Link to={`/OutPutscreen/${diagramType}`}>
            <button className="button">Diagram</button>
          </Link>
        </div>
        <div className="outputdiagram">
          <textarea
            id="outputtext"
            rows="40"
            cols="185"
            value={data}
            onChange={handleChange}
          />
        </div>
      </div>
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
    </>
  );
}
