import React from 'react'
import photo from './generic-pet-photo.png'

const PetPhotoTile = (props) => {
  const pet = props.pet
  const petPhoto = () => {
    if (pet.profile_photo) {
      return pet.profile_photo
    } else {
      return photo
    }
  }
  return (
    <div>
      <img className="pet-photo" src={petPhoto()}/>
    </div>
  )
}

export default PetPhotoTile