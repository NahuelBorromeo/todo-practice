import React, { useEffect, useRef, useState } from 'react'
import { TodoList } from './components/TodoList';
import { v4 as uuidv4 } from 'uuid';
import logo from './assets/nanologo.png';

import './TodoApp.css';

export const TodoApp = () => {

    const [todos, setTodos] = useState([{
        id: uuidv4(),
        task: 'Learn React',
        completed: false
    }]);

    const inputTodo = useRef();

    useEffect(() => {
        const localTodos = JSON.parse(localStorage.getItem('todos'));
        if(localTodos){
            setTodos(localTodos);
        }
    },[]);

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos])

    //handleAddTodo arrowfunction for add todos.
    const handleAddTodo = (e) => {
        e.preventDefault();

        if(inputTodo.current.value.length < 2){
            return;
        }

        const newTodo = {
            id: uuidv4(),
            task: inputTodo.current.value,
            completed: false
        }

        setTodos( todos => [...todos, newTodo]);

        //Clear the input:
        inputTodo.current.value = '';

    }

    //Filter todos completeds and clean
    const handleClearCompleteds = () => {
        const newTodos = todos.filter( todo => !todo.completed);
        setTodos(newTodos);

    }

    //toggle the property completed
    const handleToggleCompleted = (id) => {
        const newTodos = [...todos];
        const todoFound = newTodos.find( todo =>  todo.id === id);
        todoFound.completed = !todoFound.completed;
        setTodos(newTodos);
        
    }

    const todosIncomplete = todos.filter( todo => todo.completed === false );

    return (
            <div className="container">
                <div className="topbar">
                    <h1>TodoApp</h1>
                    <img src={logo} alt="nanocode logo" className="logo"/>
                </div>
                <hr/>
                <span>
                ➕: Add task.
                🔥: Clear task completeds.
                ❌: Delete task.
                </span>
                    <div className="todo__container">
                        <div>
                            <form onSubmit={handleAddTodo}>
                                <input
                                    className="todo__input"
                                    type="text"
                                    placeholder="Insert Todo..."
                                    autoComplete="off"
                                    ref={inputTodo}
                                />
                                <button
                                    className="btn"
                                    onClick={handleAddTodo}
                                >
                                    ➕
                                </button>
                                <button
                                    className="btn"
                                    onClick={handleClearCompleteds}
                                >
                                    🔥
                                </button>
                                <span>You have {todosIncomplete.length} tasks to complete.</span>
                            </form>
                        </div>
                        <div>
                            <TodoList 
                                todos={todos}
                                setTodos={setTodos}
                                handleToggleCompleted={handleToggleCompleted}
                            />
                        </div>
                    </div>
            </div>
    )
}
