import React from 'react'

const MapResultIndexTile = (props) => {
  const {result} = props
  return (
    <li className="results">
      <div>
        {result.name} 
        <br></br>
        Rated {result.rating} out of 5
        <br></br>
        {result.vicinity}
        <br></br>
        <button className="button">Add as My Vet</button>
        <br></br>
        <br></br>
      </div>
    </li>
  )
}

export default MapResultIndexTile