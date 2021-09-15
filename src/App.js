import React, { useState, useRef, useEffect } from 'react'
import TodoList from './TodoList'
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [todos, setTodos] = useState([]);
  const todoNameRef = useRef();

  const LOCAL_STORAGE_KEY = 'todos'

  useEffect(() => {
    const newTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    console.log(newTodos);
    if(newTodos){
      setTodos(newTodos)
    } else {
      setTodos([]);
    }
  }, [])

  // useEffect(() => {
  //   localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  // }, [todos])


  function add() {
    const name = todoNameRef.current.value;
    
    const newTodos = [...todos, { id: uuidv4(), name: name, completed: false }]
    setTodos(newTodos);
    todoNameRef.current.value = '';
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newTodos))
  }

  function clearItems(){
    setTodos([]);
    localStorage.removeItem('todos')
  }

  function toggleItem(id){
    const newTodos = [...todos];
    const myTodo = newTodos.find(todo => {
      return todo.id === id;
    })
    myTodo.completed = !myTodo.completed;
    setTodos(newTodos);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newTodos))
  }

  function key(event) {
    if (event.which === 13) {
      add();
    }
  }

  return (
    <div>
      <input ref={todoNameRef} type="text" onKeyDown={key} />
      <button onClick={add}>Add Todo</button>
      <button onClick={clearItems}>Clear Complete</button>
      <TodoList todos={todos} toggleItem={toggleItem} />
    </div>
  );
}

export default App;
