import { createContext } from 'react'

const initialContext = { userData: {} }

const AppContext = createContext(initialContext)

export default AppContext
