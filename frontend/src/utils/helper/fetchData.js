import axios from 'axios'

const API_URL = 'http://localhost:5000/api'

const fetchData = ({ url, method = 'GET', data = {} }) =>
  new Promise(async (resolve, reject) => {
    const headers = { Authorization: `Bearer ${localStorage.getItem('bearer_token')}` }
    try {
      const response = await axios({ url: `${API_URL}${url}`, method, data, headers })
      resolve(response.data)
    } catch (error) {
      reject(error)
    }
  })

export default fetchData
