import React from 'react'
import UpdatePetFormTile from "./UpdatePetFormTile"

const UpdatePetFormContainer = (props) => {
  const deleteButtonClick = () => {
    if (confirm("Are you sure you want to delete this pet?") === true) {
      //delete method gets called here
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