import { useReducer, useEffect } from 'react'
import axios from 'axios'

const FETCH_INIT = 'FETCH_INIT'
const FETCH_SUCCESS = 'FETCH_SUCCESS'
const FETCH_FAILURE = 'FETCH_FAILURE'

const initialState = {
  rawData: null,
  isLoading: false,
  isError: false
}

const API_URL = 'http://localhost:5000/api'

const dataFetchReducer = (state, action) => {
  switch (action.type) {
    case FETCH_INIT:
      return {
        ...state,
        isLoading: true,
        IsError: false
      }
    case FETCH_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        rawData: action.payload
      }
    case FETCH_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
        rawData: action.payload
      }
    default:
      throw new Error('Action is not found!')
  }
}

export default function useDataApi({ url, method, data }) {
  const [state, dispatch] = useReducer(dataFetchReducer, initialState)

  useEffect(() => {
    let ignore = false

    const fetchData = async () => {
      dispatch({ type: FETCH_INIT })

      try {
        const result = await axios({
          url: `${API_URL}${url}`,
          method
        })

        if (!ignore) {
          if (result.data && result.data.success) {
            dispatch({ type: FETCH_SUCCESS, payload: result.data.data })
          } else {
            dispatch({ type: FETCH_FAILURE, payload: result.data.error })
          }
        }
      } catch (e) {
        dispatch({ type: FETCH_FAILURE, payload: e.message })
      }
    }

    fetchData()

    return () => (ignore = true)
  }, [url, method, data])

  return state
}
