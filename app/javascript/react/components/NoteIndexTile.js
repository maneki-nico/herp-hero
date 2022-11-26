import React from "react"

const NoteIndexTile = (props) => {
  const { note } = props
  return (
    <li>
      {note.body}
      {note.created_at}
    </li>
  )
}

export default NoteIndexTile