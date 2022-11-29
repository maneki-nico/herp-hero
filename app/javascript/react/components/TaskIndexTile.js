import React from "react"

const TaskIndexTile = (props) => {
  const { task } = props

  return (
    <li>{ task.name }</li>
  )
}

export default TaskIndexTile