import { useState } from 'react';

export function Todos({todos}) {
    const [newTodo, setTodos] = useState([]);
    const markAsCompleted = async (id) => {
        try {
            const response = await fetch(`http://localhost:3000/todos/${id}`, {
                method: 'PUT', // Change the method to 'PUT'
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ completed: true }),
            });

            if (response.ok) {
                // Update the local state if the API call is successful
                setTodos((prevTodos) =>
                    prevTodos.map((todo) =>
                        todo._id === id ? { ...todo, completed: true } : todo
                    )
                );
            } else {
                console.error('Failed to mark todo as completed');
            }
        } catch (error) {
            console.error('Error updating todo:', error);
        }
    };

    return (
        <>
            {todos.map((todo) => (
                <div key={todo._id} className='flex'>
                    <h1>{todo.title}</h1>
                    <h2>{todo.description}</h2>
                    <button onClick={() => markAsCompleted(todo._id)}>
                        {todo.completed ? 'completed' : 'Mark as completed'}
                    </button>
                </div>
            ))}
        </>
    );
}
