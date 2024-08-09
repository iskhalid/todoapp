/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";

const CreateTodo = ({fetchTodos}) => {
    const [title,setTitle] = useState("");
    const [description,setDescription] = useState("");
    console.log('createtdo',title);
  return (
    <div>
      <input
        value={title}
        onChange={(e)=> {
            setTitle(e.target.value)
        }}
        style={{
          margin: 10,
          padding: 10,
        }}
        type="text"
        placeholder="title"
      />
      <br />
      <input
         value={description}
        onChange={(e)=> {
            setDescription(e.target.value)
        }}
        style={{
          margin: 10,
          padding: 10,
        }}
        type="text"
        placeholder="desciption"
      />
      <br />
      <button
      onClick={()=>{
        fetch("http://localhost:3000/todos",{
            method: "POST",
            body: JSON.stringify({
                title: title,
                description: description
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(response => response.json())
        .then(data => fetchTodos())
      }}
        style={{
          margin: 10,
          padding: 10,
        }}
      >
        Add Todo
      </button>
    </div>
  );
};

export default CreateTodo;
