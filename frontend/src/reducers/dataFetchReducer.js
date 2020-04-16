import { FETCH_INIT, FETCH_SUCCESS, FETCH_FAILURE } from '../constants/dataFetch'

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

export default dataFetchReducer
