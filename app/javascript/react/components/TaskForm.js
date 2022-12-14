import React, { useState, useEffect } from 'react'

const TaskForm = (props) => {

  const [newTask, setNewTask] = useState({
    name: "",
    date: props.date
  })

  const validateForm = () => {
    if (newTask.name.trim === "") {
      setNewTask({
        ...newTask,
        name: null
      })
    }
  }

  const clearForm = () => {
    setNewTask ({
      ...newTask,
      name: ''
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const holdName = newTask.name
    validateForm()
    if (props.postNewTask(newTask)) {
      clearForm()
    } else {
      setNewTask({
        name: holdName
      })
    }
  }

  const handleChange = (event) => {
    const updatingField = event.currentTarget.name
    setNewTask({
      ...newTask,
      [updatingField]: event.currentTarget.value
    })
  }

  return (
    <div className="form">
      <p className="add-new-task-header">Add a New Task</p>
      <form className="pet-form" onSubmit={handleSubmit}>
        <label>
          Name: 
          <input className="task-name-input" name="name" id="name" type="string" value={newTask.name} onChange={handleChange} />
        </label>
        <input className="button small-centered" type="submit" value="Submit"/>
      </form>
    </div>
  )
}


export default TaskForm