import React, { useState } from 'react'

const NewNoteFormTile = (props) => {
  const [newNote, setNewNote] = useState({
    body: ""
  })

  const validateForm = () => {
    if (newNote.body.trim === "") {
      setNewNote({
        ...newNote,
        body: null
      })
    }
  }

  const clearForm = () => {
    setNewNote({
      body: '',
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const holdBody = newNote.body
    validateForm()
    if (!props.postNewNote(newNote)) {
      clearForm()
    } else {
      setNewPet({
        body: holdBody
      })
    }
  }

  const handleChange = (event) => {
    const updatingField = event.currentTarget.name
    setNewNote({
      ...newNote,
      [updatingField]: event.currentTarget.value
    })
  }

  return (
    <div className="form">
      <form className="pet-form" onSubmit={handleSubmit}>
        <label>
          Body: 
          <input name="body" id="body" type="text" value={newNote.body} onChange={handleChange} />
        </label>
        <input className="button small-centered" type="submit" value="Add Note"/>
      </form>
    </div>
  )
}


export default NewNoteFormTile