import React, { useState, useEffect } from "react"
import { Loader } from "@googlemaps/js-api-loader"
import Geocode from "react-geocode"
import MapResultIndexTile from "./MapResultIndexTile"

Geocode.setApiKey("AIzaSyCOELqoVhdQJVv_Itp-OlLR5YCDBqAVJhg");

const GoogleMap = (props) => {  
  const [searchResults, setSearchResults] = useState([])
  
  const loader = new Loader({
    apiKey: "AIzaSyDwMeAsv8WC3Y6Y-2IiSNCSzxSRjuR8qGo",
    version: "weekly",
    libraries: ["places", "marker"]
  })
  
  const getResult = async (zip) => {
    Geocode.fromAddress(zip).then((response) => {
      const { lat, lng } = response.results[0].geometry.location
      return { lat, lng }
    }).then(async (userCoordinates)  => {
      return loader.load().then(() => {
        const map = new google.maps.Map(document.getElementById("map"), {
          center: userCoordinates,
          zoom: 11
        })
        const request = {
          fields: ['name', 'geometry'],
          radius: '5000',
          location: userCoordinates,
          keyword: 'veterinary'
        };
        
        const service = new google.maps.places.PlacesService(map);
        console.log("making API call to nearby server...")
        service.nearbySearch(request, function(results, status) {
          if (status === google.maps.places.PlacesServiceStatus.OK) {
            for (let i = 0; i < results.length; i++) {
              new google.maps.Marker({
                position: results[i].geometry.location,
                map: map
              })
            }
            setSearchResults(results)
          }
        });
      })
    }).catch((error) => {
      console.log(error)
    })
  }
  
  const getUserZip = async () => {
    try {
      const response = await fetch(`/api/v1/users/current`)
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw(error)
      }
      const fetchedUser = await response.json()
      getResult(fetchedUser.user.zip)
    } catch(err) {
      console.error(`Error in fetch: ${err.message}`)
    }
  }
  const resultsList = searchResults.map((result, index) => {
    return (
      <MapResultIndexTile
      key={result.place_id}
      result={result} 
      />
    )
  })

  useEffect(() => {
    getUserZip()
  }, [])
  
  return (
    <div className="card map-card">
      <div className="card-section">
        <h2 className="centered">Veterinarians Near You</h2>
        <p className="centered">Note: Not all veterinarians take in exotic pets.
          You may need to call individual locations to verify.</p>
        <div id="map" className="map" style={{height: 500, width: 500}}>
          MAP
        </div>
        <div className="vet-result-section">
          <ol>
            {resultsList}
          </ol>
        </div>
      </div>
    </div>
  )
}
export default GoogleMap