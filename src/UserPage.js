import React, { useEffect, useState } from "react";
import "./Styles.css";
import { Paper, Slide } from "@mui/material/";
import { pink } from "@mui/material/colors";
import ColorCheckboxes from "./CheckBox";
import DiscreteSlider from "./Slider";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

import Checkbox from "@mui/material/Checkbox";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const UserPage = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState("");
  /*useEffect(()=> {
    fetch("http://localhost:8080/getcategories")
    .then(response => response.json())
    .then(data => setCategories(data))
    
},[]);*/

  useEffect(() => {
    fetch("http://localhost:8080/category/getcategories")
      .then((response) => response.json())
      .then((data) => {
        setCategories(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <div>
      <Paper elevation={10} sx={{ padding: 5, margin: 3 }}>
        <flexbox>
          <h2 className="category-header"> CATEGORIES</h2>
        </flexbox>
        {categories.map((category) => (
          <div key={category.id}>
            <h2 className="category-text">{category.name}</h2>
            <ul>
              {category.todos.map((todo) => (
                <li key={todo.id}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        width: "100%",
                        padding: 10,
                        margin: 5,
                        border: "1px solid #ccc",
                        borderRadius: 5,

                        backgroundColor: "#f9f9f9",
                      }}
                    >
                      <span style={{ flex: 10 }}>{todo.description}</span>
                      <div style={{ marginRight: 30 }}>
                        {" "}
                        <DiscreteSlider />{" "}
                      </div>
                    </div>
                    <DeleteOutlineIcon
                      style={{ color: pink[800], marginRight: 10 }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </Paper>
    </div>
  );
};

export default UserPage;
/*
 <div>
      <h1>Welcome to the Dashboard!</h1>
      <p>This is a protected page.</p>
    </div>
    */

/*    <input type="checkbox" checked={todo.completed} />
                  <ColorCheckboxes />

                  <Checkbox
                    {...label}
                    checked={todo.started}
                    sx={{
                      color: pink[800],
                      "&.Mui-checked": {
                        color: pink[600],
                      },
                    }}
                  />
                  */
