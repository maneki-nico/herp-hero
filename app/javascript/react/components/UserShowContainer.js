import React, { useState, useEffect } from "react"
import PetIndexTile from "./PetIndexTile"
import NewPetFormContainer from "./NewPetFormContainer"
import VetShowTile from "./VetShowTile"
import CalendarContainer from "./CalendarContainer"

const UserShowContainer = (props) => {
  const [user, setUser] = useState({
    pets: [],
    vet: {}
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
      const newUser = {
        ...fetchedUser.user,
      } 
      if (newUser.vet === undefined) {
        newUser.vet = {name: "You don't have one yet!"}
      }
      setUser(newUser)
    } catch(err) {
      console.error(`Error in fetch: ${err.message}`)
    }
  }

  const postNewPet = async (formPayload) => {
    try {
      //debugger
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
      <h2 className="centered dash-greeting">Hello, {user.email}! {user.zip}</h2>
      <div className="grid-x grid-margin-x">
        <CalendarContainer/>
        <div className="card cell medium-5 large-5">
          <div className="card-divider centered">
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
        <VetShowTile
          key={user.id}
          vet={user.vet} 
        />
      </div>
    </div>

  )

}

export default UserShowContainer