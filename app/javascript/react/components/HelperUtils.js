const postForm = async (path, formPayload) => {
  try {
    const response = await fetch(path, {
      method: 'POST', 
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(formPayload)
    })
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

export default postForm