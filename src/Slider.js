import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import RestoreIcon from "@mui/icons-material/Restore";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import DoneIcon from "@mui/icons-material/Done";

// This component is used to display the status of the todo item
const DiscreteBottomNavigation = ({
  started,
  completed,
  todoId,
  onSliderChange,
}) => {
  const [value, setValue] = useState("");

  // This useEffect hook is used to set the value of the slider based on the status of the todo item
  useEffect(() => {
    if (completed) {
      setValue(2);
    } else if (started) {
      setValue(1);
    } else {
      setValue(0);
    }
  }, [started, completed]);

  // This function is used to handle the change in the slider value
  const handleChange = (event, newValue) => {
    setValue(newValue);
    onSliderChange(newValue, todoId);
  };


  return (
    <Box sx={{ width: 300 }}>
      <BottomNavigation value={value} onChange={handleChange} showLabels
                        style={{ backgroundColor: "lightyellow", borderRadius: "15px" }}>
        <BottomNavigationAction label="Preparation" icon={<RestoreIcon />} />
        <BottomNavigationAction label="Process" icon={<HourglassEmptyIcon />} />
        <BottomNavigationAction label="Completed" icon={<DoneIcon />} />
      </BottomNavigation>
    </Box>
  );
};

export default DiscreteBottomNavigation;
