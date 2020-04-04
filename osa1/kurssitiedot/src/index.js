import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
	console.log(props)
	return (
		<h1>{props.name}</h1>
	)
}

const Part = (props) => {
	console.log("Part " + props)
  console.log("Part " + props.osa.exercises)  
	return(
    <p>
      {props.osa.name} {props.osa.exercises}
    </p>
	)
}

const Total = (props) => {
	
  let total_exercises = props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises
  console.log(total_exercises)

	return(
		  <p>
	        Number of exercises {total_exercises}
      </p>
	)
}


const Content = (props) => {
  console.log("Content " + props.parts[0].name)
  return(
      <>
          <Part osa={props.parts[0]} />
          <Part osa={props.parts[1]} />
          <Part osa={props.parts[2]} />
      </>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
    	<Header name={course.name} />
    	<Content parts={course.parts} />
    	<Total parts={course.parts} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
