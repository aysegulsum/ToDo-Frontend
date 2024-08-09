import React, { useEffect, useState } from "react";

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
      {categories.map((category) => (
        <div key={category.id}>
          <h2>{category.name}</h2>
          <ul>
            {category.todos.map((todo) => (
              <li key={todo.id}>{todo.description}</li>
            ))}
          </ul>
        </div>
      ))}
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
