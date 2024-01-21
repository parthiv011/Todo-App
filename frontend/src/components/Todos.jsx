export function Todos({todos}){
    return (<>
            {todos.map(function todo(todo){
                return <div key={todo._id}>
                    <h1>{todo.title}</h1>
                    <h2>{todo.description}</h2>
                    <button>{todo.completed === true ? "completed" : "Mark as completed"}</button>
                </div>
            })
            }
        </>
    );
}