import React from 'react'
import { useHistory } from 'react-router-dom'
import UpdatePetFormTile from "./UpdatePetFormTile"

const UpdatePetFormContainer = (props) => {
  const history = useHistory();
  const userId = props.user.id
  const deletePet = async(pet) => {
    try {
      const petId = pet.id
      const response = await fetch(`/api/v1/pets/${petId}`, {
        method: "DELETE",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: null,
      })
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw(error)
      }
    } catch(error) {
      console.error(`Error in fetch: ${error.message}`)
    }
  }

  const deleteButtonClick = (event) => {
    event.preventDefault()
    if (confirm("Are you sure you want to delete this pet?") === true) {
      deletePet(props.pet)
      alert("Pet deleted successfully.")
      history.push(`/users/${userId}`)
    }
  }
  return (
    <div className="card cell medium-8 large-8 pet-info">
      <div className="card-divider centered">
        <h2 className="form-header">Update Pet</h2>
      </div>
      <button className="button update-pet-button" onClick={deleteButtonClick}>Delete Pet</button>
      <div className="card-section form">
        {props.errors}
        <UpdatePetFormTile
          postPet={props.postPet}
          errors={props.errors}
        />
      </div>
    </div>
  )
}

export default UpdatePetFormContainer