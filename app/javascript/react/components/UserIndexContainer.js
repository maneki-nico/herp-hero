import React, { useState, useEffect } from "react"

const UserIndexContainer = (props) => {
  const [user, setUser] = useState({
    pets: []
  })
  const [errors, setErrors] = useState("")

  const getUser = async () => {
    try {
      const userId = props.match.params.userId
      const response = await fetch(`/api/v1/users/${userId}`)
      if (!response.ok) {
          const errorMessage = `${response.status} (${response.statusText})`
          const error = new Error(errorMessage)
          throw(error)
      }
      const fetchedUser = await response.json()
      setUser(fetchedUser.user)
  } catch(err) {
      console.error(`Error in fetch: ${err.message}`)
  }
  }

  useEffect(() => {
    getUser()
  }, [])

  return (
    <div className="user-dashboard"><h1>Hello!</h1></div>
  )

}

export default UserIndexContainer