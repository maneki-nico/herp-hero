const CRUDForm = async (method, path, formPayload) => {
  try {
    const options = {
      method: method, 
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }
    if (formPayload !== null) {
      options.body = JSON.stringify(formPayload)
    }
    const response = await fetch(path, options)
    if (!response.ok) {
      const errorMessage = `${response.status} (${response.statusText})`
      const error = new Error(errorMessage)
      throw(error)
    }
    return await response.json()
  } catch(err) {
    console.error(`Error in fetch: ${err.message}`)
  }
}

export default CRUDForm