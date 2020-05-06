import anecdoteService from '../services/anecdotes'
// const anecdotesAtStart = [
//   'If it hurts, do it more often',
//   'Adding manpower to a late software project makes it later!',
//   'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
//   'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
//   'Premature optimization is the root of all evil.',
//   'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
// ]

// const getId = () => (100000 * Math.random()).toFixed(0)

// const asObject = (anecdote) => {
//   return {
//     content: anecdote,
//     id: getId(),
//     votes: 0
//   }
// }

// const initialState = anecdotesAtStart.map(asObject)

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

// export const createNote = content => {
//   return async dispatch => {
//     const newNote = await noteService.createNew(content)
//     dispatch({
//       type: 'NEW_NOTE',
//       data: newNote,
//     })
//   }
// }


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
