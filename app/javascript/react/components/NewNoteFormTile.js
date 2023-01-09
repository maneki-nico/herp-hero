import React, { useState } from 'react'

const NewNoteFormTile = (props) => {
  const [newNote, setNewNote] = useState({
    body: "",
    petId: props.pet.id
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
      petId: props.pet.id
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const holdBody = newNote.body
    const holdPetId = newNote.petId
    validateForm()
    if (!props.postNewNote(newNote)) {
      clearForm()
    } else {
      setNewNote({
        body: holdBody,
        petId: holdPetId
      })
      clearForm()
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
      {props.errors}
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