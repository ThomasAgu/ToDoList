import './App.css'
import { useState } from 'react';

import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
function App() {


  const [todos, setTodos] = useState([]);

  return (
    <div className="App">
      <header className="App-header">
          
      </header>
      <main>
        <h1> To do List Summer palette</h1>
        <div id="main-content">
            <TodoForm setTodos={setTodos} />
            <TodoList todos={todos} setTodos={setTodos}/>
        </div>
        <div id='sun'></div>
      </main>
    </div>
  );
}

export default App;
