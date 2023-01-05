import React, { useState } from 'react'

const MapResultIndexTile = (props) => {
  const {result} = props
  const [message, setMessage] = useState("")

  const submitVet = async() => {
    try {
      const response = await fetch(`/api/v1/vets`, {
        method: 'POST', 
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({name: result.name, address: result.vicinity})
      })
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw(error)
      }
      const postedVet = await response.json()
      if (postedVet) {
        setMessage("Vet added successfully.")
        return true
      } else {
        setMessage("Error adding vet.")
        return false
      }
    } catch(err) {
      console.error(`Error in fetch: ${err.message}`)
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