import axios from 'axios'
const baseUrl = '/api/blogs'


let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async (newObject) => {

  const config = {
    headers: {
      Authorization: token
    },
  }

  const response = await axios.post(baseUrl, newObject, config)
  console.log('cretated in db: ', response.data)
  return response.data
}

const comment = async (newObject) => {

  const updateUrl = baseUrl + '/' + newObject.id + '/comments'

  const response = await axios.post(updateUrl, newObject)
  console.log('commented in db: ', response.data)
  return response.data
}


const update = async (updateObject) => {
  console.log('updating ', updateObject)
  const config = {
    headers: {
      Authorization: token
    },
  }
  const updateUrl = baseUrl + '/' + updateObject.id
  const response = await axios.put(updateUrl, updateObject, config)
  console.log(response)
  return response.data
}

const deleteItem = (id) => {
  const config = {
    headers: {
      Authorization: token
    },
  }

  const request = axios.delete(`${baseUrl}/${id}`, config)
  return request.then(response => response.data)
}

export default { getAll, create, comment, setToken, update, deleteItem }
