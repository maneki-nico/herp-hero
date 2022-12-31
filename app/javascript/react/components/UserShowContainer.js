import React, { useState, useEffect } from "react"
import PetIndexTile from "./PetIndexTile"
import NewPetFormContainer from "./NewPetFormContainer"
import VetShowTile from "./VetShowTile"
import CalendarContainer from "./CalendarContainer"

const UserShowContainer = (props) => {
  const [user, setUser] = useState({
    pets: [],
    tasks: [],
    vet: {}
  })

  const [taskErrors, setTaskErrors] = useState("")
  const [petErrors, setPetErrors] = useState("")

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
      if (newUser.vet === null) {
        newUser.vet = {}
      }
      setUser(newUser)
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
      if (postedPet.pet) {
        setUser({
          ...user, 
          pets: [...user.pets, postedPet.pet]
        })
        setPetErrors("")
        return true
      } else {
        setPetErrors(postedPet.errors)
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

  const postNewTask = async (formPayload) => {
    try {
      const response = await fetch(`/api/v1/tasks`, {
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
      const postedTask = await response.json()
      if (postedTask) {
        setUser({
          ...user, 
          tasks: [...user.tasks, postedTask]
        })
        return true
      } else {
        setTaskErrors(postedTask.errors)
        return false
      }
    } catch(err) {
      console.error(`Error in fetch: ${err.message}`)
    }
  }

  return (
    <div className="user-dashboard">
      <h2 className="centered dash-greeting">Hello, {user.first_name}!</h2>
      <div className="grid-x grid-margin-x">
        <CalendarContainer
        tasks={user.tasks}
        postNewTask={postNewTask}
        errors={taskErrors}
        />
        <div className="card cell medium-5 large-5">
          <div className="card-divider centered">
            <h2 className="form-header">Your Pets</h2>
          </div>
          <div className="card-section">
            {petsList}
            <br></br>
            <p>Need to add a new pet? (Congrats!)<br></br>
            <b>See the 'Add a New Pet' module!</b></p>
          </div>
        </div>
        <NewPetFormContainer 
          errors={petErrors}
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