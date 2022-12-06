import React, { useState } from 'react'

const UpdatePetFormTile = (props) => {
  const [pet, setPet] = useState({
    animal: "",
    species: "",
    birthday: "",
    personality: "",
    profile_photo: ""
  })

  const validateForm = () => {
    if (!['Snake', 'Lizard', 'Turtle', 'Frog', 'Axolotl',
      'Toad', 'Newt', 'Salamander', 'Other'].includes(pet.animal)) {
      setNewPet({
        ...pet,
        animal: ""
      })
    }
    if (pet.species.trim === "") {
      setNewPet({
        ...pet,
        species: null
      })
    }
    if (pet.birthday.trim === "") {
      setNewPet({
        ...pet,
        birthday: null
      })
    }
    if (pet.personality.trim === "") {
      setNewPet({
        ...pet,
        personality: null
      })
    }
    if (pet.profile_photo.trim === "") {
      setNewPet({
        ...pet,
        profile_photo: null
      })
    }
  }

  const clearForm = () => {
    setPet({
      animal: '',
      species: '',
      birthday: '',
      personality: '',
      profile_photo: ''
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const holdAnimal = pet.animal
    const holdSpecies = pet.species
    const holdBirthday = pet.birthday
    const holdPersonality = pet.personality
    const holdPhoto = pet.profile_photo
    validateForm()
    const postSuccess = await props.postPet(pet)
    if (!postSuccess) {
      setPet({
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
    setPet({
      ...pet,
      [updatingField]: event.currentTarget.value
    })
  }

  return (
    <div className="form">
      <form className="pet-form" onSubmit={handleSubmit}>
        <label>
          Type of Animal: <br></br>
          <select name="animal" id="animal" value={pet.animal} onChange={handleChange}>
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
          <input name="species" id="species" type="string" value={pet.species} onChange={handleChange}/>
        </label>
        <label>
          Birthday: 
          <input name="birthday" id="birthday" type="date" value={pet.birthday} onChange={handleChange}/>
        </label>
        <label>
          Personality: 
          <input name="personality" id="personality" type="text" value={pet.personality} onChange={handleChange}/>
        </label>
        <label>
          Add a Photo via URL:
          <input name="profile_photo" id="profile_photo" type="string" value={pet.profile_photo} onChange={handleChange}/>
        </label>
        <input className="button small-centered" type="submit" value="Update Pet"/>
      </form>
    </div>
  )
}

export default UpdatePetFormTile