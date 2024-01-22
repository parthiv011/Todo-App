import {useState} from "react";

export function CreateTodo() {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    return <div className='flex flex-col justify-center items-center mt-8'>
        <input
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            type="text"
            placeholder="Title"
            onChange={function(e) {
                const value = e.target.value;
                setTitle(e.target.value);
            }}
        ></input><br/>
        <input
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            type="text"
            placeholder="Description"
            onChange={function (e){
                const value = e.target.value;
                setDescription(e.target.value);
            }}
        ></input><br/>
        <button
            className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
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