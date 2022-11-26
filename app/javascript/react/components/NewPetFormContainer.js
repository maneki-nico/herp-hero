import React from 'react'
import NewPetFormTile from "./NewPetFormTile"

const NewPetFormContainer = (props) => {
  return (
    <div className="card cell medium-7 large-7 pet-info">
      <div className="card-divider centered">
        <h2 className="form-header">Add a New Pet</h2>
      </div>
      <div className="card-section form">
        {props.errors}
        <NewPetFormTile
          postNewPet={props.postNewPet}
          errors={props.errors}
        />
      </div>
    </div>
  )
}

export default NewPetFormContainer