import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDeleteLeft } from '@fortawesome/free-solid-svg-icons'
import TodoList from './TodoList'


const Todo = ({properties, setTodos}) => {

    const handleCheck = (e) =>{
        const todo = document.getElementById(properties.id);
        const check = document.getElementById(`checkbox${properties.id}`);
    
        if(check.checked){
            todo.classList.add('checked')
        }
        else{
            todo.classList.remove('checked')
        }
        properties.state = e.target.checked;
    }
    const  handleDelete = () =>{
        const todo = document.getElementById(properties.id);
        todo.classList.add('active');
        setTimeout(function(){
            setTodos((todos)=> todos.filter((each) => each.id !== properties.id) )
        }, 800);
        todo.classList.remove('.active');
        
    }
  return (
    <div className='todo-item' id={properties.id}>
        <p>{properties.name}</p>
        <div className='todo-actions'>
            <input type='checkbox' id={`checkbox${properties.id}`} onChange={handleCheck}/>
            <button><FontAwesomeIcon icon={faDeleteLeft} id="delicon" onClick={handleDelete}/></button>
        </div>
    </div>
  )
}

export default Todo