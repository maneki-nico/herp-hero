import React from "react"

const VetShowTile = (props) => {
  const vet = props.vet
  let message = ""
  if (!vet.name) {
    message = "None yet."
  } else {
    message = "Need a new one?"
  }
  return (
    <div className="vet-tile card cell medium-5 large-5">
      <div className="card-section centered">
        <h3>Your Exotic Veterinarian:</h3>
        <h4>{ vet.name }</h4>
        <p>{ vet.address }</p>
        <br></br>
        <p>{message}</p>
        <button className="button"><a href="/map">Find One Near You</a></button>
      </div>
    </div>

  )
}

export default VetShowTile