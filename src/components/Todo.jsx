import React, { useEffect, useState } from "react";
import "../App.css";
import { todo } from "../hooks/usetodo";

function Todo() {
  const [title, setTitle] = useState("");
  const [todos, setTodos] = useState([]);
  const [editedTodo, setEditedTodo] = useState(null);
  const [submitButtonText, setSubmitButtonText] = useState("ADD");

  useEffect(() => {
    async function fetchTodos() {
      try {
        const url = "https://nest-socket-server.onrender.com/todo";
        const method = "GET";
        const response = await fetch(url, { method });
        if (!response.ok) {
          throw new Error('Failed to fetch todos');
        }
        const data = await response.json();
        setTodos(data); // Assuming data is an array of todos
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    }
    fetchTodos();
  }, []);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editedTodo) {
        const url = `https://nest-socket-server.onrender.com/todo/${editedTodo.id}`;
        const method = "PATCH";
        await todo(url, method, { title });
        const updatedTodos = todos.map((todo) =>
          todo.id === editedTodo.id ? { ...todo, title } : todo
        );
        setTodos(updatedTodos);
        setEditedTodo(null);
      } else {
        const url = "https://nest-socket-server.onrender.com/todo/add";
        const method = "POST";
        const data = await todo(url, method, title);
        setTodos([...todos, data]);
      }
      setTitle("");
      setSubmitButtonText("ADD");
    } catch (error) {
      console.error("Error adding or updating todo:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const url = `https://nest-socket-server.onrender.com/todo/${id}`;
      const method = "DELETE";
      await todo(url, method);
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const handleEdit = (id, title) => {
    setEditedTodo({ id, title });
    setTitle(title);
    setSubmitButtonText("SUBMIT");
  };

  const handleCheckboxChange = (id, checked) => {
    const updatedTodos = todos?.map((todo) =>
      todo.id === id ? { ...todo, completed: checked } : todo
    );
    setTodos(updatedTodos);
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Todo List</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Add todo"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button className="btn btn-primary" type="submit">
            {submitButtonText}
          </button>
        </div>
      </form>

      <ul className="list-group">
        {todos && todos?.map((todo) => (
          <li
            key={todo.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <div>
              <input
                type="checkbox"
                className="m-1"
                checked={todo.completed || false}
                onChange={(e) => handleCheckboxChange(todo.id, e.target.checked)}
              />
              <span className="ml-2">{todo.title}</span>
            </div>
            <div>
              <button
                type="button"
                className="btn btn-danger btn-sm m-1"
                onClick={() => handleDelete(todo.id)}
              >
                Delete
              </button>
              <button
                type="button"
                className="btn btn-success btn-sm"
                onClick={() => handleEdit(todo.id, todo.title)}
              >
                Edit
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Todo;
