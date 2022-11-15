import React from 'react'
import UserIndexContainer from './UserIndexContainer'
import { BrowserRouter, Switch, Route } from "react-router-dom"

export const App = (props) => {
  return (

    <BrowserRouter>
      <Switch>
        <Route exact path="/users/:userId" component={UserIndexContainer} />
      </Switch>
    </BrowserRouter>

  )
}

export default App
