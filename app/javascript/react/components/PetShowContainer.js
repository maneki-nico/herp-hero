import React, { useEffect, useState } from "react"
import PetPhotoTile from "./PetPhotoTile"
import PetShowTile from "./PetShowTile"
import NoteIndexContainer from "./NoteIndexContainer"
import NewNoteFormTile from "./NewNoteFormTile"

const PetShowContainer = (props) => {
  const [pet, setPet] = useState({})
  const getPet = async () => {
    try {
      //debugger
      const petId = props.match.params.id
      const response = await fetch(`/api/v1/pets/${petId}`)
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw(error)
      }
      const fetchedPet = await response.json()
      setPet({...fetchedPet})
    } catch(err) {
      console.error(`Error in fetch: ${err.message}`)
    }
  }
  
  useEffect(() => {
    getPet()
  }, [])

  const postNewNote = async (formPayload) => {
    try {
      //debugger
      const response = await fetch(`/api/v1/pets`, {
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
        setNote({
          ...note, 
          notes: [...pet.notes, postedNote]
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
      <div className="card cell medium-8 large-8">
        <div className="card-divider centered">
          <h2 className="form-header">Notes</h2>
        </div>
        <div className="card-section">
          {/* <NoteIndexContainer
            // notes={pet.notes}
            // postNewNote={postNewNote}
          /> */}
          <NewNoteFormTile />
        </div>
      </div>
    </div>
  )

}

export default PetShowContainer