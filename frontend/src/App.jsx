import './App.css'
import {CreateTodo} from "./components/CreateTodo.jsx";
import {Todos} from "./components/Todos.jsx";
import {useEffect, useState} from "react";

function App() {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        setInterval(() => {
            fetch('http://localhost:3000/todos')
                .then(async function(res){
                    const json = await res.json();
                    setTodos(json.todos);
                })
        },10000)
    },[])
    return (
        <>
            <CreateTodo />
            <Todos todos={todos}/>
        </>
    )
}

export default App
