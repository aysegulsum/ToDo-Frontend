import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Appbar from "./Appbar";
import Textfields from "./TextField";
import UserPage from "./UserPage";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:8080/welcome")
      .then((response) => response.text())
      .then((data) => setMessage(data))
      .catch((error) => console.error("Error fetching message:", error));
  }, []);

  return (
    <BrowserRouter>
      <Appbar />
      <Routes>
        <Route path="/" element={<Textfields />} />
        <Route path="/userpage" element={<UserPage />} />
      </Routes>

      <p align="center">{message}</p>
    </BrowserRouter>
  );
}
export default App;
