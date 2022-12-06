import React from "react"

const NoteIndexTile = (props) => {
  const { note } = props
  const date = new Date(note.created_at)
  const createDate = date.toLocaleDateString()
  return (
    <li>
      {note.body} -
      {createDate} -
      <a> Delete</a>
    </li>
  )
}

export default NoteIndexTile