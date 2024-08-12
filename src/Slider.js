/*

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

const DiscreteSlider = ({ started, completed }) => {
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
    if ((value === 0 && newValue === 50) || (value === 50 && newValue === 100)) {
      setValue(newValue);
    }
  };

  return (
      <Box sx={{ width: 150 }}>
        <Slider
            aria-label="Steps"
            value={value}
            onChange={handleChange}
            step={50}
            marks={marks}
            min={0}
            max={100}
        />
      </Box>
  );
};

export default DiscreteSlider;*/

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

const DiscreteSlider = ({ started, completed, todoId }) => {
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
    if (value === 50 && newValue === 100) {
      setValue(newValue);

      fetch(`http://localhost:8080/todo/updatecomplete/${todoId}`, {

        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ str: newValue === 100 }),
      })
      .then(response => response.json())
      .then(data => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    }
    else if (value === 0 && newValue === 50)
    {
      setValue(newValue);
      fetch(`http://localhost:8080/todo/updatestart/${todoId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ str: newValue === 50 }),
      })
      .then(response => response.json())
      .then(data => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    }
  };

  return (
    <Box sx={{ width: 150 }}>
      <Slider
        aria-label="Steps"
        value={value}
        onChange={handleChange}
        step={50}
        marks={marks}
        min={0}
        max={100}
      />
    </Box>
  );
};

export default DiscreteSlider;
