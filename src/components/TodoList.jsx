import React from 'react'
import { TodoItem } from './TodoItem'

export const TodoList = ({ todos, setTodos, handleToggleCompleted }) => {
    return (
        <ul>
            {
                todos.map((todo) => (
                    <TodoItem 
                        todo={todo}
                        todos={todos}
                        setTodos={setTodos}
                        handleToggleCompleted={handleToggleCompleted}
                        key={todo.id}
                    />
                ))
            }
        </ul>
    )
}
