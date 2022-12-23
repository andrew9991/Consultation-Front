import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Components/Auth/Login";
import Register from "./Components/Auth/Register";
import Home from "./Components/Home/Home";
import Match from "./Components/Match/Match";
import { UserContext } from "./UserContext";
import { useContext, useMemo, useState } from "react";

function App() {

  const userContext = useContext(UserContext);
  return (
    <div>
      <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/home" element={<Home />} />
            <Route path="/" element={<Navigate to="/home" />} />

            <Route path="/match/:match_id" element={<Match />} />
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
