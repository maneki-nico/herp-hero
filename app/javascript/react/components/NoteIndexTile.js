import React from "react"

const NoteIndexTile = (props) => {
  const { note } = props
  const date = new Date(note.created_at)
  const createDate = date.toLocaleDateString()
  const noteId = props.note.id

  const deleteNoteClick = (event) => {
    event.preventDefault()
    props.deleteNote(noteId)
    alert("Note deleted successfully.")
  }

  return (
    <li>
      Note: {note.body}
      <p>Written on: {createDate} - <button className="button" onClick={deleteNoteClick}>Delete</button></p>
    </li>
  )
}

export default NoteIndexTile