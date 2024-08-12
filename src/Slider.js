import React from "react";
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
const DiscreteSlider = ({ started, completed }) => {
  let value = 0;
  if (completed) {
    value = 100;
  } else if (started) {
    value = 50;
  }

  return (
    <Box sx={{ width: 150 }}>
      <Slider
        aria-label="Steps"
        defaultValue={0}
        value={value}
        step={50}
        marks={marks}
        min={0}
        max={100}
      />
    </Box>
  );
};
export default DiscreteSlider;
