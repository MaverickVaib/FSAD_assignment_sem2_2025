import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.jsx";
import { Navigate } from "react-router-dom";
import Students from "./Students.jsx";
import Dashboard from "./Dashboard.jsx"; 
import Drives from "./Drives.jsx"; 
import Login from "./Login.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<App />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/students" element={<Students />} />
        <Route path="/drives" element={<Drives />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
