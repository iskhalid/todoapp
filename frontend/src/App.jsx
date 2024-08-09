/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import CreateTodo from './components/CreateTodo'
import Todo from './components/Todo'

const App = () => {
  const [todos,setTodos] = useState([]);

  const fetchTodos = () => {
      fetch("http://localhost:3000/todos")
      .then(response => response.json())
      .then(data => setTodos(data.todos))
  }

  useEffect(()=>{
       fetchTodos()
  },[])

  console.log(todos);
  return (
    <div>
      <CreateTodo fetchTodos={fetchTodos}/>
      <Todo fetchTodos={fetchTodos} todos={todos}/>
    </div>
  )
}

export default App