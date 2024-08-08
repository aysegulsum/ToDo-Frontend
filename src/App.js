import React, { useEffect, useState } from "react";
import Appbar from "./Appbar";
import Textfields from "./TextField";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:8080/welcome")
      .then((response) => response.text())
      .then((data) => setMessage(data))
      .catch((error) => console.error("Error fetching message:", error));
  }, []);

  return (
    <div classname="App">
      <Appbar />
      <Textfields />
      <p align="center">{message}</p>
    </div>
  );
}
export default App;
