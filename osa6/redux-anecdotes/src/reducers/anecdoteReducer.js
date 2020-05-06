import anecdoteService from '../services/anecdotes'

const anecdoteReducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)

  // action.type = 'VOTE'
  // action.id = id of the anecdote

  switch(action.type) {
    case 'VOTE':
      const id = action.id
      const asToChange = state.find(n => n.id === id)
      const changedAs = { 
        ...asToChange, 
        votes: asToChange.votes + 1 
      }
      return state.map(as =>
        as.id !== id ? as : changedAs 
      )
    case 'INIT_ANECDOTES':
      console.log('init returning', action)
      return action.anecdotes
    case 'ADD':
      console.log(`anecdote reducer add ${action.data.content}`)
      // const newAs = {
      //   content: action.content,
      //   id: getId(),
      //   votes: 0
      // }
      return ([...state, action.data])
    default:
      return state
  }

}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch ({
      type: 'INIT_ANECDOTES',
      anecdotes,      
    })
  }
}

export const createAs = (content) => {
  return async dispatch => {
    const NewAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'ADD',
      data: NewAnecdote,      
    })
  }
}

export const addVote = (content) => {
  return async dispatch => {
    const updatedAnecdote = await anecdoteService.voteAnecdote(content)
    dispatch({
      type: 'VOTE',
      id: updatedAnecdote.id      
    })
  }
}

export default anecdoteReducer
