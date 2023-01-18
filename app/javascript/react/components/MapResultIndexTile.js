import React, { useState } from 'react'
import CRUDForm from "./HelperUtils"

const MapResultIndexTile = (props) => {
  const {result} = props
  const [message, setMessage] = useState("")

  const submitVet = async() => {
    const formPayload = {name: result.name, address: result.vicinity}
    const postedVet = await CRUDForm('POST',`/api/v1/vets`, formPayload) 
    if (postedVet) {
      setMessage("Vet added successfully.")
      return true
    } else {
      setMessage("Error adding vet.")
      return false
    }
  }

  return (
    <li className="results">
      <div>
        <h4>{result.name}</h4>
        <p>Rated {result.rating} out of 5</p>
        <p>{result.vicinity}</p>
        <button onClick={submitVet} className="button">Add as My Vet</button>
        <p>{message}</p>
      </div>
    </li>
  )
}

export default MapResultIndexTile