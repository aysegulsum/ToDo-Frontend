import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

export default function Appbar() {

  const [isButtonVisible, setButtonVisible] = useState(true);
  const Navigate = useNavigate();


  const toggleButtonVisibility = () => {
    setButtonVisible(false);
  };


  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: "black", opacity: 0.8 }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="white"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            color="white"
            sx={{ flexGrow: 1 }}
          >
            React Learning Project
          </Typography>
          { (localStorage.getItem("isAuthenticated") === "true") && isButtonVisible && (
          <Button

            onClick={() => {
              localStorage.clear();
              toggleButtonVisibility();
              Navigate("/");
            }}
            style={{
              backgroundColor: "grey",
              color: "white",
            }}
          >
            LOG OUT
          </Button>
              )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
