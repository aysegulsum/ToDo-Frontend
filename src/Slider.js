import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

const marks = [
  {
    value: 0,
    label: "Preparation",
  },
  {
    value: 50,
    label: "Process",
  },
  {
    value: 100,
    label: "Completed",
  },
];

const DiscreteSlider = ({ started, completed, todoId, onSliderChange, onMouseUp }) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (completed) {
      setValue(100);
    } else if (started) {
      setValue(50);
    } else {
      setValue(0);
    }
  }, [started, completed]);

  const handleChange = (event, newValue) => {
    if ((newValue === 50) || (value === 50 && newValue === 100)) {
      setValue(newValue);
      onSliderChange(newValue, todoId);
    }
  };

  const handleMouseUp = () => {
    onMouseUp(value, todoId);
  };

  return (
    <Box sx={{ width: 150 }}>
      <Slider
        aria-label="Steps"
        value={value}
        onChange={handleChange}
        onMouseUp={handleMouseUp}
        step={50}
        marks={marks}
        min={0}
        max={100}
      />
    </Box>
  );
};

export default DiscreteSlider;
