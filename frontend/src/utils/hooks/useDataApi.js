import { useReducer, useEffect } from 'react'
import axios from 'axios'

import dataFetchReducer from '../../reducers/dataFetchReducer'
import { FETCH_INIT, FETCH_SUCCESS, FETCH_FAILURE } from '../../constants/dataFetch'

const initialState = {
  rawData: null,
  isLoading: false,
  isError: false
}

const API_URL = 'http://localhost:5000/api'

export default function useDataApi({ url, method }, condition = true) {
  const [state, dispatch] = useReducer(dataFetchReducer, initialState)

  useEffect(() => {
    if (condition) {
      let ignore = false

      const fetchData = async () => {
        const headers = { Authorization: `Bearer ${localStorage.getItem('bearer_token')}` }

        dispatch({ type: FETCH_INIT })

        try {
          const result = await axios({
            url: `${API_URL}${url}`,
            method,
            headers
          })

          if (!ignore) {
            dispatch({ type: FETCH_SUCCESS, payload: result.data.data })
          }
        } catch (error) {
          if (error.response) {
            dispatch({
              type: FETCH_FAILURE,
              payload: error.response.data.error
            })
          } else {
            dispatch({ type: FETCH_FAILURE, payload: error.message })
          }
        }
      }

      fetchData()

      return () => (ignore = true)
    }
  }, [url, method, condition])

  return state
}
