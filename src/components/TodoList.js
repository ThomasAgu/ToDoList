import React from 'react'
import Todo from './Todo'

const TodoList = ({todos, setTodos}) => {
  return (
    <div id='todos-list'>
      {todos.map((each) => <Todo properties={each} key={each.id} setTodos={setTodos} />)}
    </div>  
  )
}

export default TodoList