import React, { useEffect, useState } from "react"
import PetPhotoTile from "./PetPhotoTile"
import PetShowTile from "./PetShowTile"
import NewNoteFormTile from "./NewNoteFormTile"
import NoteIndexTile from "./NoteIndexTile"
import UpdatePetFormContainer from "./UpdatePetFormContainer"
import CRUDForm from "./HelperUtils"

const PetShowContainer = (props) => {
  const [pet, setPet] = useState({
    notes: [],
    id: "",
    user: {}
  })
  const getPet = async () => {
    try {
      const petId = props.match.params.id
      const fetchedPet = await CRUDForm("GET", `/api/v1/pets/${petId}`)
      const newPet = {...fetchedPet.pet}
      if (!newPet.notes) {
        newPet.notes = []
      }
      setPet(newPet)
    } catch(err) {
      console.error(`Error in fetch: ${err.message}`)
    }
  }
  
  useEffect(() => {
    getPet()
  }, [])

  const [errors, setErrors] = useState("")

  const updatePet = async(formPayload) => {
    try {
      const petId = props.match.params.id
      const updatedPet = await CRUDForm("PATCH", `/api/v1/pets/${petId}`, formPayload) 
      if (updatedPet.pet) {
        const newUpdatedPet = {...updatedPet.pet}
        if (!newUpdatedPet.notes) {
          newUpdatedPet.notes = []
        }
        setPet(newUpdatedPet)
        setErrors("")
        return true
      } else {
        setErrors(postedPet.errors)
        return false
      }
    } catch(error) {
      console.error(`Error in fetch: ${error.message}`)
    }
  }

  const postNewNote = async (formPayload) => {
    const postedNote = await CRUDForm("POST", `/api/v1/notes`, formPayload)
    if (postedNote.note) {
      setPet({
        ...pet, 
        notes: [...pet.notes, postedNote.note]
      })
      return true
    } else {
      setErrors(postedNote.errors)
      return false
    }
  }

  const deleteNote = async(noteId) => {
    try {
      await CRUDForm("DELETE", `/api/v1/notes/${noteId}`, null)
      const newNotes = pet.notes.filter(note => note.id !== noteId)
      setPet({
        ...pet, 
        notes: newNotes
      })
    } catch(error) {
      console.error(`Error in fetch: ${error.message}`)
    }
  }

  const notesList = pet.notes.map((note) => {
    return (
      <NoteIndexTile
      key={note.id}
      note={note}
      pet={pet} 
      deleteNote={deleteNote}
      />
    )
  })

  return (
    <div className="grid-x grid-margin-x">
      <PetShowTile
      pet={pet}
      />
      <div className="card cell medium-8 large-8 pet-info">
        <div className="card-section">
          <PetPhotoTile
            pet={pet}
          />
        </div>
      </div>
      <div className="card cell medium-4 large-4">
        <div className="card-divider centered">
          <h2 className="form-header">Notes</h2>
        </div>
        <div className="card-section">
          {notesList}
          <NewNoteFormTile
            errors={errors}
            pet={pet}
            postNewNote={postNewNote}
            key={pet.updated_at}
          />
        </div>
      </div>
      <UpdatePetFormContainer
        pet={pet} 
        user={pet.user}
        updatePet={updatePet}
        key={pet.updated_at}
      />
    </div>
  )

}

export default PetShowContainer