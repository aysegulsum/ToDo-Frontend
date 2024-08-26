import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import RestoreIcon from "@mui/icons-material/Restore";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import DoneIcon from "@mui/icons-material/Done";

const DiscreteBottomNavigation = ({
  started,
  completed,
  todoId,
  onSliderChange,
  onMouseUp,
}) => {
  const [value, setValue] = useState("");

  useEffect(() => {
    if (completed) {
      setValue(2);
    } else if (started) {
      setValue(1);
    } else {
      setValue(0);
    }
  }, [started, completed]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    onSliderChange(newValue, todoId);
    // onMouseUp(newValue, todoId);
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
