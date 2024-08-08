import React, { useEffect, useState } from "react";
import Appbar from "./Appbar";
import Textfields from "./TextField";

/*function WelcomeMessage() {
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetch('http://localhost:8080/welcome')
            .then(response => response.text())
            .then(data => setMessage(data))
            .catch(error => console.error('Error fetching message:', error));
    }, []);

    return (
        <div>
          <AppBar/>
            <h1>Hoş Geldiniz!</h1>
            <p>{message}</p>
        </div>
    );
}

export default WelcomeMessage;*/

function App() {
  return (
    <div classname="App">
      <Appbar />
      <Textfields />
    </div>
  );
}
export default App;

/*
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;*/
