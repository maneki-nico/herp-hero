import React from 'react'
import UserShowContainer from './UserShowContainer'
import { BrowserRouter, Switch, Route } from "react-router-dom"

export const App = (props) => {
  return (

    <BrowserRouter>
      <Switch>
        <Route exact path="/users/:userId" component={UserShowContainer} />
      </Switch>
    </BrowserRouter>

  )
}

export default App
