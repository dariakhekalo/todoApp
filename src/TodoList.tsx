import React, {ChangeEvent, useState} from "react";
import {FilterValuesType} from "./App";
import {Button, Checkbox, TextField} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import {Delete} from "@mui/icons-material";
import './App.css';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean) => void
    filter: FilterValuesType
}

export function TodoList(props: PropsType) {
    const [newTaskTitle, setNewTaskTitle] = useState("")

    const addTask = () => {
        if (newTaskTitle.trim() == "") {
            return;
        }
        props.addTask(newTaskTitle);
        setNewTaskTitle("")
    }

    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }

    return (
        <div>
            <h3> {props.title} </h3>
            <div>
                <TextField
                    size={"small"}
                    className="content"
                    value={newTaskTitle}
                    placeholder={"you can add new task"}
                    onChange={onNewTitleChangeHandler}/>
                <Button
                    style={{marginLeft: "20px"}}
                    onClick={addTask}
                    variant={"contained"}
                    color={"primary"}> add smth
                </Button>
            </div>
            <ul>
                {props.tasks.map((t) => {
                        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeTaskStatus(t.id, e.currentTarget.checked);
                        }
                        return <li key={t.id}><Checkbox
                            onChange={onChangeHandler}
                            checked={t.isDone}/> <span> {t.title}</span>
                            <IconButton onClick={() => {
                                props.removeTask(t.id)
                            }}> <Delete/>
                            </IconButton>
                        </li>
                    }
                )}
            </ul>
            <div>
                <Button variant={props.filter === "all" ? "contained" : "text"}
                        onClick={() => {
                            props.changeFilter("all")
                        }}>All
                </Button>
                <Button variant={props.filter === "active" ? "contained" : "text"}
                        onClick={() => {
                            props.changeFilter("active")
                        }}>Active
                </Button>
                <Button variant={props.filter === "completed" ? "contained" : "text"}
                        onClick={() => {
                            props.changeFilter("completed")
                        }}>Completed
                </Button>
            </div>
        </div>
    )
}

