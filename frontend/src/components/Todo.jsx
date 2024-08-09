/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

const Todo = ({ todos }) => {
  return (
    <div style={{ border: "1px solid black" }}>
      {todos.map((todo) => (
        <div key={todo._id}>
          <h1>{todo.title}</h1>
          <h2>{todo.description}</h2>
          <button
            onClick={() => {
              fetch("http://localhost:3000/completed", {
                method: "PUT",
                body: JSON.stringify({
                  id: todo._id,
                }),
                headers: {
                  "Content-Type": "application/json",
                },
              });
            }}
          >
            {todo.completed ? "Done" : "Mark as done"}
          </button>
          <button
            onClick={() => {
              fetch("http://localhost:3000/todos", {
                method: "DELETE",
                body: JSON.stringify({
                  id: todo._id,
                }),
                headers: {
                  "Content-Type": "application/json",
                },
              })
              .then((response) => alert("todo deleted"))
            }}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default Todo;
