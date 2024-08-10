import React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

function valuetext(value) {
  return `${value}`;
}

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

export default function DiscreteSlider() {
  return (
    <Box sx={{ width: 150 }}>
      <Slider
        aria-label="Steps"
        defaultValue={50}
        getAriaValueText={valuetext}
        step={50}
        marks={marks}
        min={0}
        max={100}
      />
    </Box>
  );
}
