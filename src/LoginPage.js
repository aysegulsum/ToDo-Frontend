// src/LoginPage.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, Paper, Container, Typography } from "@mui/material/";
import "font-awesome/css/font-awesome.min.css";
import PeopleAltSharpIcon from "@mui/icons-material/PeopleAltSharp";
import { orange } from "@mui/material/colors";
import LockSharpIcon from "@mui/icons-material/LockSharp";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const Navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const response = await fetch("http://localhost:8080/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      const messageFromServer = await response.text();
      if (response.status === 200) {
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("username", username);
        console.log("User is authenticated.");
        console.log("Message from server: ", messageFromServer);
        try {
          Navigate("/userpage");
          console.log("Navigating to /userpage");
        } catch (error) {
          console.error("Error fetching message:", error);
        }
      } else {
        setMessage(messageFromServer);
        localStorage.setItem("isAuthenticated", "false");
      }
    } catch (error) {
      setMessage("An error occurred. Please try again.");
      localStorage.setItem("isAuthenticated", "false");
    }
  };

  return (
    // <Container component="main" maxWidth="xs">
    <div className="login-p">
      <div elevation={3} sx={{ padding: 2, margin: 2 }} className="login-paper">
        <h2 align="center" className="login-text">
          USER LOGIN
        </h2>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, size: 2 }}>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label>
                <PeopleAltSharpIcon
                  aria-hidden="true"
                  size="2x"
                  style={{ fontSize: 30, marginBottom: 4 }}
                  sx={{ color: orange[50] }}
                />
              </label>
              <TextField
                id="outlined-basic-name"
                variant="outlined"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="UserName"
              />
            </div>
            <div className="form-group">
              <LockSharpIcon
                aria-hidden="true"
                size="2x"
                style={{ fontSize: 30, marginBottom: 4 }}
                sx={{ color: orange[50] }}
              />
              <TextField
                id="outlined-basic-password"
                variant="outlined"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />
            </div>
            <div className="button">
              <Button
                align="center"
                type="submit"
                variant="contained"
                color="success"
                sx={{
                  backgroundColor: "purple",
                  color: "white",
                  align: "center",
                }}
              >
                SUBMIT
              </Button>
            </div>
          </form>
          {message && (
            <Typography color="textSecondary" variant="body2" align="center">
              {message}
            </Typography>
          )}
        </Box>
      </div>
    </div>
    //   </Container>
  );
}
