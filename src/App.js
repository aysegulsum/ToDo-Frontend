// src/App.js
import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Appbar from "./Appbar";
import UserPage from "./UserPage";
import LoginPage from "./LoginPage";
import ProtectedRoute from "./ProtectedRoute";
import { PacmanLoader } from 'react-spinners';

function App() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1780);
  }, [isAuthenticated]);

  useEffect(() => {
    fetch("http://localhost:8080/welcome")
      .then((response) => response.text())
      .then((data) => setMessage(data))
      .catch((error) => console.error("Error fetching message:", error));
  }, []);

  return (
    <BrowserRouter>
      {loading ? (
        <div className="loader">
          <PacmanLoader color="#fcf892" loading size={32} speedMultiplier={2} />
        </div>
      ) : (
          <>
            <Appbar/>
            <Routes>
              <Route path="/" element={<LoginPage setIsAuthenticated={setIsAuthenticated}/>}/>
              <Route element={<ProtectedRoute/>}>
                <Route path="/userpage" element={<UserPage/>}/>
              </Route>
            </Routes>
            <div className={"welcome"} align="center">{message} </div>
          </>
      )}
    </BrowserRouter>
  );
}

export default App;