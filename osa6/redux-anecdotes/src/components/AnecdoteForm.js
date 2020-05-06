import React from 'react'
// import { useDispatch } from 'react-redux'
import { connect } from 'react-redux' 
import { createAs } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
  // const dispatch = useDispatch()
  
  const addAs = async (event) => {
    event.preventDefault()

    const content = event.target.as.value
    event.target.as.value = ''
    console.log('adding: ', content)
    // const NewAnecdote = await anecdoteService.createNew(content) 
    // dispatch(createAs(content))
    props.createAs(content)
    props.showNotification(`You added ${content}`, 5)
    
    // dispatch(showNotification(`You added ${content}`, 5))
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAs}>
        <div><input name="as"/></div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

// export default AnecdoteForm


const mapDispatchToProps = {
  createAs,
  showNotification,
}

export default connect(
  null,
  mapDispatchToProps
)(AnecdoteForm)

