import Home from "./components/Home";
import { Routes, Route } from "react-router-dom";
import Login from "./components/login";
import Signup from "./components/signup";
import InputScreen from "./components/InputScreen";
import DiagramType from "./components/DiagramType";
import OutPutScreen from "./components/OutPutScreen";
import OutPutPsuedocode from "./components/OutPutPsuedocode";
import Navbar from "./components/navbar";

import { AuthProvider } from "./components/SharedStateContext";
import React, { createContext, useContext, useState } from "react";
import { useAuth } from "./components/SharedStateContext";

export default function App() {
  // const{logged , setlogged} = useAuth();
  // console.log(logged);
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Home />} />
        <Route path="/InputScreen" element={<InputScreen />} />
        <Route path="/DiagramType" element={<DiagramType />} />
        <Route path="/DiagramType/:diagramData" element={<DiagramType />} />
        <Route path="/OutPutScreen/:diagramType" element={<OutPutScreen />} />

        <Route
          path="/OutPutPsuedocode/:diagramType"
          element={<OutPutPsuedocode />}
        />

        <Route element={<Navbar />} />
      </Routes>
    </AuthProvider>
  );
}
