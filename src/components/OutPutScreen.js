import React, { useEffect, useState } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import Navbar from "./navbar";
import "./styles/OutPutScreen.css";
import Mermaid from "./Mermaid"; // Assuming you have a Mermaid component
import * as htmlToImage from "html-to-image";
import download from "downloadjs";
import Sidebar from "./Sidebar";

export default function OutPutScreen() {
  const navigate = useNavigate();
  const { diagramType, outPseudocode } = useParams();
  const [outputDiagram, setOutputDiagram] = useState("");
  const [data, setData] = useState("");
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [satisfactionLevel, setSatisfactionLevel] = useState("");

  var diagram;
  if (diagramType === "SSD" || diagramType === "Sequence Diagram") {
    diagram = "Sequence Diagram";
  } else if (diagramType === "ERD") {
    diagram = "ER Diagram";
  } else if (diagramType === "CD") {
    diagram = "Class Diagram";
  } else {
    diagram = "None";
  }

  useEffect(() => {
    // Retrieve data from local storage
    const storedData = localStorage.getItem("generatedPsuedo");
    setData(storedData || "Not Found"); // Set data to retrieved value or empty string if not found
  }, []);

  useEffect(() => {
    // Save diagram on component mount
    const handleSave = () => {
      const node = document.getElementById("mermaidChart");
      htmlToImage
        .toPng(node)
        .then((dataUrl) => {
          const image = dataUrl.split(",")[1]; // Extract base64 image data
          const mycode = localStorage.getItem("generatedPsuedo");
          fetch("http://127.0.0.1:3001/addDiagram", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ image, mycode, diagram }),
          })
            .then((response) => {
              if (!response.ok) {
                throw new Error("Failed to save diagram");
              }
              return response.json();
            })
            .then((data) => {
              console.log(data.message); // Log success message
            })
            .catch((error) => {
              console.error("Error saving diagram:", error);
            });
        })
        .catch((error) => {
          console.error("Failed to convert the diagram to image:", error);
        });
    };

    handleSave();
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  const handleDownload = () => {
    const node = document.getElementById("mermaidChart");
    htmlToImage
      .toPng(node)
      .then((dataUrl) => {
        download(dataUrl, "diagram.png");
      })
      .catch((error) => {
        console.error("Failed to convert the diagram to image:", error);
      });
  };

  const toggleSidebar = (event) => {
    event.preventDefault(); // Prevent default action to avoid any unexpected behavior
    setSidebarOpen(!isSidebarOpen);
  };

  const handleFeedbackSubmit = () => {
    // Prepare feedback data
    const feedbackData = satisfactionLevel;

    // Send feedback data to the server
    fetch("http://127.0.0.1:3001/feedback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ feedbackData: feedbackData }),
    })
      .then((response) => {
        if (response.ok) {
          console.log("Feedback submitted successfully");
          // Clear satisfaction level and close the feedback modal
          setSatisfactionLevel("");
          setShowFeedback(false);
        } else {
          console.error("Failed to submit feedback:", response.statusText);
        }
      })
      .catch((error) => {
        console.error("Error submitting feedback:", error);
      });
  };

  return (
    <>
      <Navbar toggleSidebar={toggleSidebar} />
      <div className="mainOutPut">
        <p className="diagramselected">Selected diagram is {diagram}.</p>
        <div className="innerOutPut">
          <Link to={`/OutputPsuedocode/${diagramType}`}>
            <button className="button">Pseudocode</button>
          </Link>
          <button className="button" onClick={handleDownload}>
            Download
          </button>
          <button className="button" onClick={() => setShowFeedback(true)}>
            Give Feedback
          </button>
        </div>
        <div id="mermaidChart" className="outputdiagram">
          <Mermaid chart={data} />
        </div>
      </div>
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      {showFeedback && (
        <div className="feedback-modal-popup">
          <div className="feedback-modal-content-popup">
            <span className="close" onClick={() => setShowFeedback(false)}>
              &times;
            </span>
            <h2>Give Feedback</h2>
            <div>
              <p>How much are you satisfied?</p>
              <label>
                <input
                  type="radio"
                  name="satisfaction"
                  value="Very Satisfied"
                  checked={satisfactionLevel === "Very Satisfied"}
                  onChange={(e) => setSatisfactionLevel(e.target.value)}
                />
                Very Satisfied
              </label>
              <label>
                <input
                  type="radio"
                  name="satisfaction"
                  value="Satisfied"
                  checked={satisfactionLevel === "Satisfied"}
                  onChange={(e) => setSatisfactionLevel(e.target.value)}
                />
                Satisfied
              </label>
              <label>
                <input
                  type="radio"
                  name="satisfaction"
                  value="Neutral"
                  checked={satisfactionLevel === "Neutral"}
                  onChange={(e) => setSatisfactionLevel(e.target.value)}
                />
                Neutral
              </label>
              <label>
                <input
                  type="radio"
                  name="satisfaction"
                  value="Dissatisfied"
                  checked={satisfactionLevel === "Dissatisfied"}
                  onChange={(e) => setSatisfactionLevel(e.target.value)}
                />
                Dissatisfied
              </label>
              <label>
                <input
                  type="radio"
                  name="satisfaction"
                  value="Very Dissatisfied"
                  checked={satisfactionLevel === "Very Dissatisfied"}
                  onChange={(e) => setSatisfactionLevel(e.target.value)}
                />
                Very Dissatisfied
              </label>
            </div>
            <button onClick={handleFeedbackSubmit}>Submit</button>
          </div>
        </div>
      )}
    </>
  );
}
