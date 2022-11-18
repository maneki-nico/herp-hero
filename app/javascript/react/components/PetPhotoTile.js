import React from 'react'

const PetPhotoTile = (props) => {
  const pet = props.pet
  return (
    <div>
      <img className="pet-photo" src={pet.profile_photo}/>
    </div>
  )
}

export default PetPhotoTile