import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'

import { useState } from 'react'

import '../App.css'

const TodoForm = ({setTodos}) => {

  const [name, setName] = useState('')

  const handleChange = (e) =>{
    setName((name) => e.target.value)
  }

  const handleAdd = (e) =>{
    e.preventDefault();
    if(name === ''){
      window.alert("the input shouln't be empty")
    }
    else{
      const newTodo = {finished: false, name: name, id:Math.floor(Math.random() * 999999) }
      setTodos((todos) => [...todos, newTodo])
      setName((name) => '')
    }
  }
  return (

    <form >
      <input type="text" id='input' value={name} required onChange={handleChange} placeholder="New Task :D"/>
      <button type='submit' onClick={handleAdd}> <FontAwesomeIcon  icon={faPlusCircle} id="form-icon"/></button> 
    </form>
  )
}

export default TodoForm