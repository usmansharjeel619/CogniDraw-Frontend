import { React, useEffect, useState } from "react";
import "./styles/DiagramType.css";
import diagramtyp from "./images/diagramtype.png";
import Navbar from "./navbar";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "./SharedStateContext";
import Mermaid from "./Mermaid";
import Sidebar from "./Sidebar";
export default function DiagramType() {
  const { logged, setlogged } = useAuth();
  const navigate = useNavigate();
  const { diagramData } = useParams();
  const [OutputPsuedocode, setOutputPsuedocode] = useState(null);
  const [data, setData] = useState("");

  useEffect(() => {
    if (!logged) {
      navigate("/login");
    }
  }, [logged, navigate]);

  const generateDiagram = async (diagramType) => {
    try {
      // Create a sentence combining diagram type and diagram data
      const sentence = `Generate a mermaid pseudocode for ${diagramType} diagram for the following: ${diagramData}`;
      // Assuming you have a Flask API endpoint for diagram generation
      const response = await fetch(
        `https://maan619.pythonanywhere.com/generate/${diagramType}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ input_text: sentence }),
        }
      );

      if (!response.ok) {
        throw new Error(
          `Failed to generate diagram. Status: ${response.status}`
        );
      }

      const data = await response.json();
      // Update the state with the received diagram data

      setOutputPsuedocode(data.response);
      console.log(data.response);
      localStorage.setItem("generatedPsuedo", data.response);

      // Navigate to the next screen with diagram type and response
      navigate(`/OutPutScreen/${diagramType}`);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <Navbar toggleSidebar={toggleSidebar} />
      <div id="mainDiagram">
        <div className="mainContent">
          <div className="items">
            <div className="select">
              <h3>Class Diagram</h3>
              <p>
                Click the view buttom below to generate the Class Diagram for
                your input
              </p>
            </div>
            <button className="button" onClick={() => generateDiagram("CD")}>
              View
            </button>
          </div>
          <div className="items">
            <div className="select">
              <h3>Sequence Diagram</h3>
              <p>
                Click the view buttom below to generate the System Sequence
                Diagram for your input
              </p>
            </div>
            <button className="button" onClick={() => generateDiagram("SSD")}>
              view
            </button>
          </div>
          <div className="items">
            <div className="select">
              <h3>Entity Relation Diagram</h3>
              <p>
                Click the view buttom below to generate the Entity Relation
                Diagram for your input
              </p>
            </div>
            <button className="button" onClick={() => generateDiagram("ERD")}>
              View
            </button>
          </div>
        </div>
        <div>
          <img src={diagramtyp} alt="CogniDraw Logo" width="500" height="500" />
        </div>
      </div>
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
    </>
  );
}
