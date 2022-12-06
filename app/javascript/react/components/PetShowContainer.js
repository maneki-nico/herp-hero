import React, { useEffect, useState } from "react"
import PetPhotoTile from "./PetPhotoTile"
import PetShowTile from "./PetShowTile"
import NewNoteFormTile from "./NewNoteFormTile"
import NoteIndexTile from "./NoteIndexTile"
import UpdatePetFormContainer from "./UpdatePetFormContainer"

const PetShowContainer = (props) => {
  const [pet, setPet] = useState({
    notes: [],
    id: props.match.params.id
  })
  const getPet = async () => {
    try {
      const petId = props.match.params.id
      const response = await fetch(`/api/v1/pets/${petId}`)
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw(error)
      }
      const fetchedPet = await response.json()
      //debugger
      const newPet = {...fetchedPet.pet}
      if (!newPet.notes) {
        newPet.notes = []
      }
      //debugger
      setPet(newPet)
    } catch(err) {
      console.error(`Error in fetch: ${err.message}`)
    }
  }
  
  useEffect(() => {
    getPet()
  }, [])

  const [errors, setErrors] = useState("")


  const postNewNote = async (formPayload) => {
    try {
      const response = await fetch(`/api/v1/notes`, {
        method: 'POST', 
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formPayload)
      })
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw(error)
      }
      const postedNote = await response.json()
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
    } catch(err) {
      console.error(`Error in fetch: ${err.message}`)
    }
  }

  const notesList = pet.notes.map((note) => {
    //debugger
    return (
      <NoteIndexTile
      key={note.id}
      note={note} 
      />
    )
  })

  return (
    <div className="grid-x grid-margin-x">
      <div className="card cell medium-4 large-4 pet-info">
        <div className="card-section">
          <PetShowTile
          pet={pet}
          />
        </div>
      </div>
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
            pet={pet}
            postNewNote={postNewNote}
          />
        </div>
      </div>
      <UpdatePetFormContainer />
    </div>
  )

}

export default PetShowContainer