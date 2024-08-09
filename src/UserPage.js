import React, { useEffect, useState } from "react";
import "./Styles.css";
import { Paper } from "@mui/material/";
import { pink } from "@mui/material/colors";
import ColorCheckboxes from "./CheckBox";

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
                  <span style={{ flex: 10 }}>{todo.description}</span>
                  <input type="checkbox" checked={todo.completed} />
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
