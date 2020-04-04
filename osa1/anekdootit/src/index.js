import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const Display = (props) => {
	// console.log(props)
	return (
				<div>
					<h2>Anecdote of the day</h2>
					<p>{props.quote}</p>
					<p>has {props.votes} votes</p>
				</div>
	)
}

const Statistics = (props) => {
  // console.log(props)
  const indexOfMaxValue = props.votes.indexOf(Math.max(...props.votes));

	return(
		<div>
			<h2>Anecdote with most votes</h2>
			<p>{anecdotes[indexOfMaxValue]}</p>
			<p>has {props.votes[indexOfMaxValue]} votes</p>
		</div>	
	)
}

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(
  	new Array(anecdotes.length).fill(0)
  )

  const vote = (props) => {
		const copy = [...votes]
		copy[selected] = copy[selected] + 1

		setVotes(copy)
		// setVotes([...copy])
  }

  const nextAnecdote = () => {
  	const newSelection = Math.floor(Math.random() * anecdotes.length)

  	setSelected(newSelection)
  }

  return (
    <div>
      <Display quote={anecdotes[selected]} votes={votes[selected]}/>
      <Button handleClick={vote} text="vote" />
      <Button handleClick={nextAnecdote} text="next anecdote" />
      <Statistics votes={votes}/>
    </div>
  )
}


const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
