import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const StatisticLine = (props) => {
  return (
		 <tr><td>{props.text}</td><td>{props.value}</td></tr>
	)
}

const Statistics = (props) => {
  console.log(props)
  const good = props.value.good
  const neutral = props.value.neutral
  const bad = props.value.bad

  if (!(good || neutral || bad))
  	return <p>no feedback given yet</p>

  const average = () => (good - bad) / (good + neutral + bad)
  const positives = () => (good / (good + neutral + bad) * 100) + " %"

	return(
		<div>
			<h2>statistics</h2>
			<table>
				<tbody>
		      <StatisticLine text="good" value={good} />
		      <StatisticLine text="neutral" value={neutral} />
		      <StatisticLine text="bad" value={bad} />
		      <StatisticLine text="average" value={average()} />
		      <StatisticLine text="positive" value={positives()} />
		     </tbody>
      </table>
		</div>	
	)
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [votes, setVote] = useState({
  	good: 0, neutral: 0, bad: 0
  })

  // const [good, setGood] = useState(0)
  // const [neutral, setNeutral] = useState(0)
  // const [bad, setBad] = useState(0)

  const goodVote = () =>
  	setVote({ ...votes, good: votes.good + 1 })

  const neutralVote = () =>
  	setVote({ ...votes, neutral: votes.neutral + 1 })

  const badVote = () =>
  	setVote({ ...votes, bad: votes.bad + 1 })

  
  return (
    <div>
      <h2>give feedback</h2>
      <Button handleClick={goodVote} text="good" />      
      <Button handleClick={neutralVote} text="neutral" />      
      <Button handleClick={badVote} text="bad" />
      <Statistics value={votes} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
