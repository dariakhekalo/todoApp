import './App.css';
import React, {useState} from "react";
import {TaskType, TodoList} from "./TodoList";
import {Container} from "@mui/material";
import {v1} from "uuid";

export type FilterValuesType = "all" | "completed" | "active";

function App() {

    let [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: "Prepare tasty breakfast", isDone: true},
        {id: v1(), title: "Learn React ", isDone: true},
        {id: v1(), title: "Run 10 km", isDone: false},
    ]);
    let [filter, setFilter] = useState<FilterValuesType>("all");

    function removeTask(id: string) {
        let filteredTasks = tasks.filter((t) => {
            return t.id !== id
        })
        setTasks(filteredTasks)
    }

    function addTask(title: string) {
        let newTask = {id: v1(), title: title, isDone: false};
        let newTasks = [newTask, ...tasks]
        setTasks(newTasks)
    }

    function changeFilter(value: FilterValuesType) {
        setFilter(value)
    }

    function changeStatus(taskId: string, isDone: boolean) {
        let task = tasks.find(t => t.id === taskId);
        if (task) {
            task.isDone = isDone;
        }
        setTasks([...tasks])
    }

    let tasksForTodoList = tasks;
    if (filter === "completed") {
        tasksForTodoList = tasks.filter(t => t.isDone === true);
    }
    if (filter === "active") {
        tasksForTodoList = tasks.filter(t => t.isDone === false);
    }

    return (
        <div className="App">
            <Container>
                <TodoList title="My plans for today:" tasks={tasksForTodoList} removeTask={removeTask}
                          changeFilter={changeFilter}
                          addTask={addTask} changeTaskStatus={changeStatus} filter={filter}/>
            </Container>
        </div>
    );
}

export default App;
