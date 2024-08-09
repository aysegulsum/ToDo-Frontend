import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, Paper, Container, Typography } from "@mui/material/";
import "font-awesome/css/font-awesome.min.css";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

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
        navigate("/userpage", { replace: true });
      } else {
        setMessage(messageFromServer);
      }
    } catch (error) {
      setMessage("An error occurred. Please try again.");
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} sx={{ padding: 2, margin: 2 }}>
        <Typography variant="h5" align="center">
          LOGIN
        </Typography>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <form onSubmit={handleLogin}>
            <label>
              <img
                src="logo192.png"
                alt="User Icon"
                width="40"
                height="40"
                align="center"
              />
            </label>
            <TextField
              id="outlined-basic"
              label="Name"
              variant="outlined"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
            />
            <label>
              <i
                className="fa fa-user"
                aria-hidden="true"
                size="2x"
                style={{ fontSize: 36, marginBottom: 10 }}
              />
            </label>
            <TextField
              id="outlined-basic"
              label="Password"
              variant="outlined"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="success"
              sx={{ backgroundColor: "purple", color: "white" }}
            >
              Login
            </Button>
          </form>
          {message && (
            <Typography color="textSecondary" variant="body2" align="center">
              {message}
            </Typography>
          )}
        </Box>
      </Paper>
    </Container>
  );
}
