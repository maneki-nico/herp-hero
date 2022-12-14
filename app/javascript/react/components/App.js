import React from 'react'
import UserShowContainer from './UserShowContainer'
import PetShowContainer from './PetShowContainer'
import GoogleMap from './GoogleMap'
import { BrowserRouter, Switch, Route } from "react-router-dom"
import AboutTheDeveloper from './AboutTheDeveloper'

export const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/users/:userId" component={UserShowContainer} />
        <Route exact path="/pets/:id" component={PetShowContainer} />
        <Route exact path="/map" component={GoogleMap} />
        <Route exact path="/about-developer" component={AboutTheDeveloper} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
