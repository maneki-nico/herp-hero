import React, { useState, useEffect } from "react"
import PetIndexTile from "./PetIndexTile"
import NewPetFormContainer from "./NewPetFormContainer"

const UserShowContainer = (props) => {
  const [user, setUser] = useState({
    pets: []
  })

  const [errors, setErrors] = useState("")

  const getUser = async () => {
    try {
      const userId = props.match.params.userId
      const response = await fetch(`/api/v1/users/${userId}`)
      if (!response.ok) {
          const errorMessage = `${response.status} (${response.statusText})`
          const error = new Error(errorMessage)
          throw(error)
      }
      const fetchedUser = await response.json()
      setUser(fetchedUser.user)
    } catch(err) {
      console.error(`Error in fetch: ${err.message}`)
    }
  }

  const postNewPet = async (formPayload) => {
    try {
      const response = await fetch(`/api/v1/pets`, {
        method: 'POST', 
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formPayload)
      })
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw(error)
      }
      const postedPet = await response.json()
      if (postedPet) {
        setUser({
          ...user, 
          pets: [...user.pets, postedPet]
        })
        return true
      } else {
        setErrors(postedPet.errors)
        return false
      }
    } catch(err) {
      console.error(`Error in fetch: ${err.message}`)
    }
  }

  useEffect(() => {
    getUser()
  }, [])

  const petsList = user.pets.map((pet) => {
    return (
      <PetIndexTile
      key={pet.id}
      pet={pet} 
      />
    )
  })

  return (
    <div className="user-dashboard">
      <h1>Hello!</h1>
      {user.email}
      <div className="card">
        <div className="card divider centered">
          <h2 className="form-header">Your Pets</h2>
        </div>
        <div className="card-section">
          {petsList}
        </div>
      </div>
      <NewPetFormContainer 
        errors={errors}
        pets={user.pets}
        postNewPet={postNewPet}
      />
    </div>

  )

}

export default UserShowContainer