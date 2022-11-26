import React, { useState, useEffect } from "react"

const VetShowTile = (props) => {
  const vet = props.vet

  if (vet.name === null) {
    vet.name = "You don't have one yet!"
  }
  //debugger
  return (
    <div className="vet-tile card cell medium-5 large-5">
      <div className="card-section centered">
        <h3>Your Exotic Veterinarian:</h3>
        <h4>{ vet.name }</h4>
        <p>{ vet.phone_number }</p>
        <p>{ vet.email }</p>
        <br></br>
        <p>Don't have one yet?</p>
        <button className="button"><a href="/map">Find One Near You</a></button>
      </div>
    </div>

  )
}

export default VetShowTile