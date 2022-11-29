import React, { useState } from 'react'

const NewPetFormTile = (props) => {
  const [newPet, setNewPet] = useState({
    name: "",
    animal: "",
    species: "",
    birthday: "",
    personality: "",
    profile_photo: ""
  })

  const validateForm = () => {
    if (newPet.name.trim === "") {
      setNewPet({
        ...newPet,
        name: null
      })
    }
    if (!['Snake', 'Lizard', 'Turtle', 'Frog', 'Axolotl',
      'Toad', 'Newt', 'Salamander', 'Other'].includes(newPet.animal)) {
      setNewPet({
        ...newPet,
        animal: ""
      })
    }
    if (newPet.species.trim === "") {
      setNewPet({
        ...newPet,
        species: null
      })
    }
    if (newPet.birthday.trim === "") {
      setNewPet({
        ...newPet,
        birthday: null
      })
    }
    if (newPet.personality.trim === "") {
      setNewPet({
        ...newPet,
        personality: null
      })
    }
    if (newPet.profile_photo.trim === "") {
      setNewPet({
        ...newPet,
        profile_photo: null
      })
    }
  }

  const clearForm = () => {
    setNewPet({
      name: '',
      animal: '',
      species: '',
      birthday: '',
      personality: '',
      profile_photo: ''
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const holdName = newPet.name
    const holdAnimal = newPet.animal
    const holdSpecies = newPet.species
    const holdBirthday = newPet.birthday
    const holdPersonality = newPet.personality
    const holdPhoto = newPet.profile_photo
    validateForm()
    const postSuccess = await props.postNewPet(newPet)
    if (!postSuccess) {
      setNewPet({
        name: holdName, 
        animal: holdAnimal, 
        species: holdSpecies,
        birthday: holdBirthday,
        personality: holdPersonality,
        profile_photo: holdPhoto
      })
    } else {
      clearForm()
    }
  }

  const handleChange = (event) => {
    const updatingField = event.currentTarget.name
    setNewPet({
      ...newPet,
      [updatingField]: event.currentTarget.value
    })
  }

  return (
    <div className="form">
      <form className="pet-form" onSubmit={handleSubmit}>
        <label>
          Name: 
          <input name="name" id="name" type="string" value={newPet.name} onChange={handleChange} />
        </label>
        <label>
          Type of Animal: <br></br>
          <select name="animal" id="animal" value={newPet.animal} onChange={handleChange}>
            <option name="animal" id="animal" value="">Select</option>
            <option name="animal" id="animal" value="Snake">Snake</option>
            <option name="animal" id="animal" value="Lizard">Lizard</option>
            <option name="animal" id="animal" value="Turtle">Turtle</option>
            <option name="animal" id="animal" value="Frog">Frog</option>
            <option name="animal" id="animal" value="Axolotl">Axolotl</option>
            <option name="animal" id="animal" value="Toad">Toad</option>
            <option name="animal" id="animal" value="Newt">Newt</option>
            <option name="animal" id="animal" value="Salamander">Salamander</option>
            <option name="animal" id="animal" value="Other">Other</option>
          </select>
        </label>
        <label>
          Species (ex. Leopard Gecko): 
          <input name="species" id="species" type="string" value={newPet.species} onChange={handleChange}/>
        </label>
        <label>
          Birthday: 
          <input name="birthday" id="birthday" type="date" value={newPet.birthday} onChange={handleChange}/>
        </label>
        <label>
          Personality: 
          <input name="personality" id="personality" type="text" value={newPet.personality} onChange={handleChange}/>
        </label>
        <label>
          Add a Photo via URL:
          <input name="profile_photo" id="profile_photo" type="string" value={newPet.profile_photo} onChange={handleChange}/>
        </label>
        <input className="button small-centered" type="submit" value="Add New Pet"/>
      </form>
    </div>
  )
}


export default NewPetFormTile