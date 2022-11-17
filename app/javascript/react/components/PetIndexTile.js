import React from "react";
import { Link } from "react-router-dom"

const PetIndexTile = (props) => {
  const { pet } = props
  debugger
  return (
    <div>
      {pet.name} - {pet.animal} - {pet.species}
    </div>
  )
}

export default PetIndexTile