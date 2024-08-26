import React, { useEffect, useState } from "react";
import "./Styles.css";
import {
  Button,
  Card,
  TextField,
  Typography,
  Box,
} from "@mui/material/";
import { pink, grey, green } from "@mui/material/colors";
import AddCircleOutlineSharpIcon from "@mui/icons-material/AddCircleOutlineSharp";
import DiscreteBottomNavigation from "./Slider";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Checkbox from "@mui/material/Checkbox";
import { FormControlLabel } from "@mui/material";
import MessageIcon from "@mui/icons-material/Message";
import { v4 as uuidv4 } from "uuid";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const UserPage = () => {
  const [categories, setCategories] = useState([]);
  const [text, setText] = useState("");
  const [receiver, setReceiver] = useState("");
  const [detailsVisibility, setDetailsVisibility] = useState({});

  const toggleDetails = (todoId) => {
    setDetailsVisibility((prev) => ({
      ...prev,
      [todoId]: !prev[todoId],
    }));
  };

  useEffect(() => {
    // const intervalId = setInterval(() => {
    fetch("http://localhost:8080/category/getcategories")
      .then((response) => response.json())
      .then((data) => {
        setCategories(data);
        console.log(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    // }, 3000);

    // return () => clearInterval(intervalId);
  }, []);

  const handleDeleteTodo = (todoId) => {
    fetch(`http://localhost:8080/todo/delete/${todoId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          setCategories((prevCategories) =>
            prevCategories.map((category) => ({
              ...category,
              todos: category.todos.filter((todo) => todo.id !== todoId),
            }))
          );
        } else {
          console.error("Failed to delete todo");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const confirmDeleteTodo = (todo) => {
    const message = todo.completed
      ? "Do you want to delete this completed todo?"
      : "This todo is not completed. Do you still want to delete it?";

    const confirmDelete = window.confirm(message);
    if (!confirmDelete) {
      return;
    }

    handleDeleteTodo(todo.id);
  };

  const handleDeleteCategory = (categoryId) => {
    fetch(`http://localhost:8080/category/delete/${categoryId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          setCategories((prevCategories) =>
            prevCategories.filter((category) => category.id !== categoryId)
          );
        } else {
          console.error("Failed to delete category");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleAddComment = (id) => {
    fetch(`http://localhost:8080/comment/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sender: localStorage.getItem("username"),
        message: text,
        receiver: receiver,
        todoId: id,
      }),
    })
      .then((response) => response.text())
      .then((data) => {
        console.log("Success:", data);
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleAddTodo = (id) => {
    const newTodo = prompt("Enter the description for the new todo:");
    if (!newTodo) {
      return;
    }

    fetch(`http://localhost:8080/todo/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        description: newTodo,
        categoryId: id,
      }),
    })
      .then((response) => response.text())
      .then((data) => {
        console.log("Success:", data);
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleAddCategory = () => {
    const newName = prompt("Enter the name of new category:");
    if (!newName) {
      return;
    }

    fetch(`http://localhost:8080/category/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: newName,
      }),
    })
      .then((response) => response.text())
      .then((data) => {
        console.log("Success:", data);
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const confirmDeleteCategory = (category) => {
    const message = category.completed
      ? "Do you want to delete this completed category?"
      : "This category is not completed. Do you still want to delete it?";

    const confirmDelete = window.confirm(message);
    if (!confirmDelete) {
      return;
    }

    handleDeleteCategory(category.id);
  };

  const handleSliderChange = (newValue, todoId) => {};

  const confirmSliderChange = (newValue, todoID) => {
    console.log(newValue + "in confirm");
    const confirmUpdate = window.confirm(
      "ToDo status has changed. Do you want to save the changes??"
    );
    if (confirmUpdate) {
      updateTodoCompletion(newValue, todoID).then(console.log);
    }

  };

  const updateTodoCompletion = async (newValue, todoID) => {
    console.log(todoID);
    fetch(`http://localhost:8080/todo/updatecomplete/${todoID}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        str: newValue === 2,
      }),
    })
      .then((response) => response.text())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    fetch(`http://localhost:8080/todo/updatestart/${todoID}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        str: newValue !== 0,
      }),
    })
      .then((response) => response.text())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    window.location.reload();
  };

  return (
    <div className="paper">
      <h2 className="category-header"> TODO LIST</h2>

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Button
          style={{ marginRight: 10, backgroundColor: pink[50] }}
          onClick={() => handleAddCategory()}
        >
          <AddCircleOutlineSharpIcon style={{ color: pink[800] }} />
          Add Category
        </Button>
      </div>
      {categories.map((category) => (
        <div
          className="category-paper"
          style={{ marginTop: 85 }}
          key={category.id}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
            }}
          >
            <h2 className="category-text">{category.name}</h2>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <FormControlLabel
                sx={{ backgroundColor: pink[50], borderRadius: 1 }}
                control={
                  <Checkbox
                    {...label}
                    checked={category.completed}
                    sx={{
                      width: 32,
                      height: 33,
                      fontSize: 15,
                      color: grey[800],
                      "&.Mui-checked": {
                        color: green[600],
                      },
                    }}
                  />
                }
                label="Completed"
              />

              <Button
                style={{
                  marginRight: 10,
                  backgroundColor: pink[50],
                  height: 33,
                  fontSize: 15,
                }}
                onClick={() => handleAddTodo(category.id)}
              >
                <AddCircleOutlineSharpIcon style={{ color: pink[800] }} />
                Add Todo
              </Button>

              <Button
                onClick={() => confirmDeleteCategory(category)}
                style={{
                  marginRight: 10,
                  backgroundColor: pink[50],
                  height: 33,
                  fontSize: 15,
                  maxWidth: 188,
                }}
              >
                <DeleteOutlineIcon
                  style={{ color: pink[800], marginRight: 10 }}
                />
                Delete category
              </Button>
            </div>
          </div>

          <ul>
            {category.todos.map((todo) => (
              <li key={todo.id + "" + category.id}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div
                    key={uuidv4()}
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
                      <DiscreteBottomNavigation
                        started={todo.started}
                        completed={todo.completed}
                        todoId={todo.id}
                        onSliderChange={confirmSliderChange}
                      />
                    </div>
                  </div>
                  <Button
                    key={uuidv4()}
                    onClick={() => confirmDeleteTodo(todo)}
                  >
                    <DeleteOutlineIcon
                      style={{ color: grey[400], marginRight: 10 }}
                    />
                  </Button>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                  }}
                >
                  <Button
                    onClick={() => toggleDetails(todo.id)}
                    variant="contained"
                    sx={{
                      backgroundColor: grey[900],
                      width: "10%",
                      height: 25,
                      fontSize: 13,
                      marginRight: 10,
                    }}
                  >
                    {detailsVisibility[todo.id] ? "Hide" : "Comments"}
                  </Button>
                </div>

                {detailsVisibility[todo.id] && (
                  <div style={{ marginTop: "16px" }}>
                    {todo.comments.map((comment) => (
                      <li key={comment.id}>
                        <Card
                          variant="outlined"
                          sx={{
                            width: { xs: "50%", sm: "max(400px, 90%)" },
                            borderRadius: 7,
                            boxShadow: 10,
                            border: "1px solid #5116e6f9",
                            transition: "transform 0.3s ease-in-out",
                            "&:hover": {
                              transform: "scale(1.03)",
                              boxShadow: 20,
                            },
                            marginTop: 1,
                            padding: 2,
                            backgroundColor: "lightBlue",
                          }}
                        >
                          <Box sx={{ textAlign: "left" }}>
                            <div
                              style={{
                                display: "flex",
                              }}
                            >
                              <MessageIcon />

                              <Typography
                                variant="subtitle2"
                                color="text.secondary"
                                sx={{ marginLeft: 2 }}
                              >
                                From: {comment.sender}
                              </Typography>

                              <Typography
                                variant="subtitle2"
                                color="text.secondary"
                                sx={{ marginLeft: 2 }}
                              >
                                To: {comment.receiver}
                              </Typography>
                            </div>
                            <Typography variant="body1" sx={{ mt: 2 }}>
                              {comment.description}
                            </Typography>
                          </Box>
                        </Card>
                      </li>
                    ))}
                    <div
                      style={{
                        display: "flex",
                        marginTop: "10px",
                        marginBottom: "10px",
                        alignItems: "center",
                      }}
                    >
                      <TextField
                        id="outlined-basic-name"
                        variant="outlined"
                        type="text"
                        placeholder="Receiver"
                        onChange={(e) => setReceiver(e.target.value)}
                        style={{
                          width: "15%",
                          marginLeft: "5%",
                        }}
                      />

                      <TextField
                        id="outlined-basic"
                        variant="outlined"
                        type="text"
                        placeholder="Type your message here!"
                        onChange={(e) => setText(e.target.value)}
                        style={{
                          width: "60%",
                          marginRight: "2%",
                        }}
                      />
                      <Button
                        style={{
                          marginRight: 10,
                          backgroundColor: green[50],
                          height: 35,
                          fontSize: 15,
                          alignItems: "baseline",
                        }}
                        onClick={() => handleAddComment(todo.id)}
                      >
                        Send
                      </Button>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}
      <div
        style={{
          display: "flex",
        }}
      ></div>
    </div>
  );
}

export default UserPage;
