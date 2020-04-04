import { useState } from 'react'

const useStateWithLocalStorage = (localStorageKey) => {
  const [value, setValue] = useState(JSON.parse(localStorage.getItem(localStorageKey)) || {})

  localStorage.setItem(localStorageKey, JSON.stringify(value))

  return [value, setValue]
}

export default useStateWithLocalStorage
