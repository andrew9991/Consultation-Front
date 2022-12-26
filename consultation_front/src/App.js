import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Components/Auth/Login";
import Register from "./Components/Auth/Register";
import Home from "./Components/Home/Home";
import Match from "./Components/Match/Match";
import { UserContext } from "./UserContext";
import { useContext, useMemo, useState } from "react";
import Profile from "./Components/Profile/Profile";
import Reserve from "./Components/Match/Reserve";
import EditProfile from "./Components/Profile/EditProfile";

function App() {

  const userContext = useContext(UserContext);
  const user = JSON.parse(localStorage.getItem("user"));

  // console.log(userContext.isLoggedIn);
  return (
    <div>
      <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/home" element={<Home />} />
            <Route path="/" element={<Navigate to="/home" />} />

            <Route path="/match/:match_id" element={<Match />} />

            {userContext.isLoggedIn && <Route path="/profile/:user_id" element={<Profile />} />}
            {userContext.isLoggedIn && <Route path="/editProfile/:user_id" element={<EditProfile />} />}
            {userContext.isLoggedIn && user.type != 3 && <Route path="/reserve" element={<Reserve />} />}

            
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
