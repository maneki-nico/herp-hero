import React from 'react'
import UserShowContainer from './UserShowContainer'
import PetShowContainer from './PetShowContainer'
import { BrowserRouter, Switch, Route } from "react-router-dom"

export const App = (props) => {
  return (

    <BrowserRouter>
      <Switch>
        <Route exact path="/users/:userId" component={UserShowContainer} />
        <Route exact path="/pets/:id" component={PetShowContainer} />
      </Switch>
    </BrowserRouter>

  )
}

export default App
