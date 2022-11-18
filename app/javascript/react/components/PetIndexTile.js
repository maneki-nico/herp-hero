import React from "react";
import { Link } from "react-router-dom"

const PetIndexTile = (props) => {
  const { pet } = props
  return (
    <div>
      <Link to={`/pets/${pet.id}`}>{pet.name}</Link>  - {pet.animal} - {pet.species}
    </div>
  )
}

export default PetIndexTile