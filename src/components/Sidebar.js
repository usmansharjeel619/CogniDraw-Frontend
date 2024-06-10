import React, { useEffect, useState } from "react";
import "../components/styles/Sidebar.css";
import axios from "axios"; // or fetch if you prefer
import { useNavigate } from "react-router-dom";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const [history, setHistory] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      // Fetch history data from the server
      axios
        .get("http://127.0.0.1:3001/Diagrams") // Adjust the endpoint according to your backend
        .then((response) => setHistory(response.data))
        .catch((error) => console.error("Error fetching history:", error));
    }
  }, [isOpen]);

  const handleHistoryItemClick = (objectid) => {
    // Fetch the mycode corresponding to the objectid from the server
    console.log("clicked");
    axios
      .get(`http://127.0.0.1:3001/Diagrams/${objectid}`)
      .then((response) => {
        // Update localStorage with the retrieved mycode
        localStorage.setItem("generatedPsuedo", response.data.mycode);
        console.log("Mycode updated in localStorage:", response.data.mycode);
        navigate(`/OutputScreen/${response.data.title}`);
      })
      .catch((error) => console.error("Error fetching mycode:", error));
  };

  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      <button className="close-button" onClick={toggleSidebar}>
        X
      </button>
      <h2>History</h2>
      <ul>
        {history.map((item, index) => (
          <li key={index} onClick={() => handleHistoryItemClick(item.objectid)}>
            {item.title} -- {item.objectid}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
