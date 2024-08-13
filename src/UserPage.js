import React, {useEffect, useState} from "react";
import "./Styles.css";
import {Paper, Button} from "@mui/material/";
import {pink, grey} from "@mui/material/colors";
import AddCircleOutlineSharpIcon from '@mui/icons-material/AddCircleOutlineSharp';
import DiscreteSlider from "./Slider";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Checkbox from "@mui/material/Checkbox";
import {FormControlLabel} from "@mui/material";


const label = {inputProps: {"aria-label": "Checkbox demo"}};

const UserPage = () => {
    const [categories, setCategories] = useState([]);


   /* useEffect(() => {
        fetch("http://localhost:8080/category/getcategories")
            .then((response) => response.json())
            .then((data) => {
                setCategories(data);
                console.log(data);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }, []);*/
    useEffect(() => {
        const intervalId = setInterval(() => {
            fetch("http://localhost:8080/category/getcategories")
                .then((response) => response.json())
                .then((data) => {
                    setCategories(data);
                    console.log(data);
                })
                .catch((error) => {
                    console.error("Error:", error);
                });
        }, 1000);

        return () => clearInterval(intervalId); // Temizleme
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
              //  window.location.reload();
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
               // window.location.reload();
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


    const handleSliderChange = (newValue, todoId) => {


    };

    const confirmSliderChange = (newValue, todoID) => {
        const confirmUpdate = window.confirm("Slider değeri değişti. Bilgileri güncellemek istiyor musunuz?");
        if (confirmUpdate) {
            updateTodoCompletion(newValue, todoID).then(console.log);
        }

    };

    const updateTodoCompletion = async (newValue, todoID) => {
        fetch(`http://localhost:8080/todo/updatecomplete/${todoID}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                str: newValue === 100,
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
    };

    return (
        <div>
            <Paper elevation={10} sx={{padding: 5, margin: 3}}>

                <h2 className="category-header"> CATEGORIES</h2>
                <div style={{
                    display: "flex",
                    justifyContent: "flex-end"
                }}
                >
                    <Button style={{marginRight: 10}} onClick={() => handleAddCategory()}>
                        <AddCircleOutlineSharpIcon style={{color: pink[800]}}/>
                        Add Category
                    </Button>
                </div>
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
                            }}>
                                <FormControlLabel
                                    control={
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
                                    }
                                    label="Completed"
                                />

                                <Button style={{marginRight: 10}} onClick={() => handleAddTodo(category.id)}>
                                    <AddCircleOutlineSharpIcon
                                        style={{color: pink[800]}}
                                    />
                                    Add Todo
                                </Button>


                                <Button
                                    onClick={() => confirmDeleteCategory(category)}
                                    style={{marginRight: 10}}

                                >

                                    <DeleteOutlineIcon
                                        style={{color: pink[800], marginRight: 10}}
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
                                                    onSliderChange={handleSliderChange}
                                                    onMouseUp={confirmSliderChange}/>{" "}
                                            </div>
                                        </div>
                                        <Button onClick={() => confirmDeleteTodo(todo)}>
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
                <div style={{
                    display: "flex"
                }
                }>
                    <Button
                        type="submit"
                        variant="contained"
                        color="success"
                        sx={{
                            marginRight: 70,
                            marginLeft: 70,
                            width: 300, backgroundColor: "purple", color: "white"
                        }}
                        fullWidth
                    >
                        SUBMIT
                    </Button>
                </div>


            </Paper>
        </div>
    );
};

export default UserPage;
