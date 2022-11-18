import React, { useEffect, useState } from "react"
import PetPhotoTile from "./PetPhotoTile"
import PetShowTile from "./PetShowTile"

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
    </div>
  )

}

export default PetShowContainer