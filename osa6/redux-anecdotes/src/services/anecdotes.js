import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
  const object = { content, votes: 0 }
  const response = await axios.post(baseUrl, object)
  console.log('Got new from DB', response)
  return response.data
}

const voteAnecdote = async (anecdote) => {
  console.log('putting it in DB: ', anecdote)
  const object = {
    content:  anecdote.content,
    id: anecdote.id,
    votes: anecdote.votes + 1
  }
  const putUrl = baseUrl + '/' + anecdote.id
  const response =  await axios.put(putUrl, object)
  return (response.data)
}

export default {
  getAll,
  createNew,
  voteAnecdote,
}
