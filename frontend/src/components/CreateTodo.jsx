import {useState} from "react";

export function CreateTodo() {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    return <div>
        <input
            type="text"
            placeholder="Title"
            onChange={function(e) {
                const value = e.target.value;
                setTitle(e.target.value);
            }}
        ></input><br/>
        <input
            type="text"
            placeholder="Description"
            onChange={function (e){
                const value = e.target.value;
                setDescription(e.target.value);
            }}
        ></input><br/>
        <button
            onClick={() => {
                fetch('http://localhost:3000/add-todos', {
                    method: "POST",
                    body: JSON.stringify({
                        title,
                        description
                    }),
                    headers:{
                        "Content-type": "application/json"
                    }
                })
                    .then(async function(res){
                        const json = await res.json();
                        alert("Todo Added!");
                    })
            }}
        > Add to do</button>
    </div>
}