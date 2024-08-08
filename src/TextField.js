import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, Paper, Container } from "@mui/material/";
//import Icon from "react-native-vector-icons/FontAwesome";

export default function Textfields() {
  const [username, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleClick = (e) => {
    e.preventDefault();
    const textField = { username, password };
    console.log(textField);
  };
  // <Icon name="users" size={20} />
  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} sx={{ padding: 2, margin: 2 }}>
        <h2 align="center">LOGIN</h2>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            id="outlined-basic"
            label="Name"
            variant="outlined"
            value={username}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="Password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="success"
            onClick={handleClick}
            sx={{ backgroundColor: "purple", color: "white" }}
          >
            Login
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

/*
export default function Textfields() {
  // const paperStyle={padding:'50px 20px', width:600, margin:"20px auto"}
  const [username, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleClick = (e) => {
    e.preventDefault();
    const textField = { username, password };
    console.log(textField);
  };

  return (
    <Container component="main" maxWidth="xs">
      <h2 align="center">LOGIN</h2>
      <TextField
        id="outlined-basic"
        label="Name"
        variant="outlined"
        value={username}
        onChange={(e) => setName(e.target.value)}
      />
      <TextField
        id="outlined-basic"
        label="Password"
        variant="outlined"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="success"
        onClick={handleClick}
      >
        Login
      </Button>
    </Container>
  );
}
*/
