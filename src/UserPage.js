import React, {useEffect, useState} from "react";
import "./Styles.css";
import {Paper, Button} from "@mui/material/";
import {pink, grey} from "@mui/material/colors";
import AddCircleOutlineSharpIcon from '@mui/icons-material/AddCircleOutlineSharp';
import DiscreteSlider from "./Slider";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";

const label = {inputProps: {"aria-label": "Checkbox demo"}};

const UserPage = () => {
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState("");
    const [sliderValue, setSliderValue] = useState(null);

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


    const handleSliderChange = (newValue, todoId) => {
        setSliderValue({newValue, todoId});
    };

    const handleSubmit = async (e) => {
        console.log("Submitting changes");
        e.preventDefault();
        if (sliderValue) {
            const {newValue, todoId} = sliderValue;
            fetch(`http://localhost:8080/todo/updatecomplete/${todoId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    str: newValue === 100
                }),
            })
                .then(response => response.text())
                .then(data => {
                    console.log("Success:", data);
                })
                .catch((error) => {
                    console.error("Error:", error);
                });
        } else {
            console.log("No changes to save");
        }
    };
    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }
    return (
        <div>
            <Paper elevation={10} sx={{padding: 5, margin: 3}}>
                <form onSubmit={handleSubmit}>
                        <h2 className="category-header"> CATEGORIES</h2>

                    {categories.map((category) => (
                        <div style={{marginTop: 85}} key={category.id}>
                            <div style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "baseline",
                            }}>
                                <h2 className="category-text">{category.name}</h2>
                                <div style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    width:510,
                                }}>
                                    <Button style={{marginRight: 10}}>
                                        <AddCircleOutlineSharpIcon
                                            style={{color: pink[800]}}
                                        />
                                        Add Todo
                                    </Button>

                                    <Box>
                                        <Checkbox
                                            {...label}
                                            checked={category.completed}
                                            sx={{
                                                color: pink[800],
                                                "&.Mui-checked": {
                                                    color: pink[600],
                                                },
                                            }}
                                        />
                                        Completed
                                    </Box>
                                        <Button
                                            style={{marginRight: 10}}
                                        >


                                        Delete category
                                        <DeleteOutlineIcon
                                            style={{color: pink[800], marginRight: 10}}
                                        />
                                    </Button>
                                </div>

                            </div>

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
                                                <span style={{flex: 10}}>{todo.description}</span>
                                                <div style={{marginRight: 30}}>

                                                    <DiscreteSlider
                                                        started={todo.started}
                                                        completed={todo.completed}
                                                        todoId={todo.id}
                                                        onSliderChange={handleSliderChange}/>{" "}
                                                </div>
                                            </div>
                                        <Button onClick={() => handleDeleteTodo(todo.id)}>
                                                <DeleteOutlineIcon
                                                    style={{color: grey[400], marginRight: 10}}

                                                />

                                            </Button>

                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                    <Button
                        type="submit"
                        variant="contained"
                        color="success"
                        sx={{backgroundColor: "purple", color: "white"}}
                        fullWidth
                    >
                        SUBMIT
                    </Button>
                </form>
            </Paper>
        </div>
    );
};

export default UserPage;
