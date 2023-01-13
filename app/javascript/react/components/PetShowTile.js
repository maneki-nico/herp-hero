import React from 'react'

const PetShowTile = (props) => {
  const pet = props.pet

  return (
    <div className="card cell medium-4 large-4 pet-info">
      <div className="card-section">
        <div>
          <h2 className="centered">{ pet.name }</h2>
          <ul>
            <li>Type of Herp: { pet.animal }</li>
            <li>Species: { pet.species }</li>
            <li>Birthday: { pet.birthday}</li>
            <li>Personality:</li>
            <p>{ pet.personality }</p>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default PetShowTile