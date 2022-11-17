import React from 'react'
import NewPetFormTile from "./NewPetFormTile"

const NewPetFormContainer = (props) => {
  return (
    <div className="card">
      <div className="card divider centered">
        <h2 className="form-header">Add a New Pet</h2>
      </div>
      <div className="card-section form">
        {props.errors}
        <NewPetFormTile
          postNewPet={props.postNewPet}
        />
      </div>
    </div>
  )
}

export default NewPetFormContainer