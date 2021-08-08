import React from 'react'

export const TodoItem = ({ todo, todos, setTodos, handleToggleCompleted}) => {

    const {id, task, completed} = todo;

    const handleTodoClick = () => {
        handleToggleCompleted(id);
    }

    const handleDeleteTodo = () => {
        const newTodos = todos.filter(todo => todo.id !== id);
        setTodos(newTodos);
    }


    return (
        <>
            <li className="todo__item">
                <input 
                    className="checkbox"
                    type='checkbox'
                    onChange={handleTodoClick}
                    checked={completed}
                />
                <span>
                    {task}
                </span>
                <button
                    className="btn"
                    onClick={handleDeleteTodo}
                >
                    ❌
                </button>
            </li>
            <hr/>
        </>

    )
}
