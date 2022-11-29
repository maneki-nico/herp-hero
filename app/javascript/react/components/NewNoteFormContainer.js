import React from 'react'
import NewNoteFormTile from "./NewPetFormTile"

const NewNoteFormContainer = (props) => {
  return (
    <div>
      <h2 className="form-header">Add a New Note</h2>
        {props.errors}
        <NewNoteFormTile
          postNewNote={props.postNewNote}
          errors={props.errors}
        />
    </div>
  )
}

export default NewNoteFormContainer