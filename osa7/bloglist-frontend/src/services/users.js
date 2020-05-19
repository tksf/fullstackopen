import axios from 'axios'
const baseUrl = '/api/users'

const getAll = () => {
  console.log('Getting all users')
  const request = axios.get(baseUrl)
  console.log('Read users', request)
  return request.then(response => response.data)
}

export default { getAll }

