import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState("");

    const API = "http://localhost:5000/tasks";

    // GET tasks
    useEffect(() => {
        axios.get(API).then(res => setTasks(res.data));
    }, []);

    // ADD task
    const addTask = async () => {
        const res = await axios.post(API, { title, completed: false });
        setTasks([...tasks, res.data]);
        setTitle("");
    };

    // DELETE task
    const deleteTask = async (id) => {
        await axios.delete(`${API}/${id}`);
        setTasks(tasks.filter(t => t._id !== id));
    };

    // TOGGLE complete
    const toggleTask = async (task) => {
        const res = await axios.put(`${API}/${task._id}`, {
            completed: !task.completed
        });

        setTasks(tasks.map(t => t._id === task._id ? res.data : t));
    };

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h1>Task Manager</h1>

            <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter task"
            />

            <button onClick={addTask}>Add</button>

            <ul>
                {tasks.map(task => (
                    <li key={task._id}>
                        <span
                            onClick={() => toggleTask(task)}
                            style={{
                                textDecoration: task.completed ? "line-through" : "none",
                                cursor: "pointer"
                            }}
                        >
                            {task.title}
                        </span>

                        <button onClick={() => deleteTask(task._id)}>
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;