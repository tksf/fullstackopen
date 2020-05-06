import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import Notification from './Notification'
import Filter from './Filter'
import { showNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {

  const dispatch = useDispatch()
  // const anecdotes = useSelector(state => state.anecdotes)
  const anecdotes = useSelector(({filter, anecdotes}) => {

    // console.log("Filter:", anecdotes)
    // console.log("Filter: ", filter)

    if (filter) {
      // return anecdotes
      return anecdotes.filter(anec => anec.content.includes(filter))
    } else {
      return anecdotes
    }
  })


  //   state => {
  //   state.anecdotes.filter(s => s.includes(state.filter))
  // })

  const vote = (anecdote) => {
    console.log('vote', anecdote.id)
    dispatch(addVote(anecdote))
    dispatch(showNotification(`You voted ${anecdote.content}`, 5))
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      <Filter />
      <Notification />
      {anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteForm