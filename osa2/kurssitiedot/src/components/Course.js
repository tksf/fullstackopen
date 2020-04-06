import React from 'react'

const Header = (props) => {
	console.log(props)
	return (
		<h1>{props.name}</h1>
	)
}

const Part = (props) => {
	// console.log("Part ", props)
 //  console.log("Part ", props.osa.exercises)  
	return(
    <p>
      {props.osa.name} {props.osa.exercises}
    </p>
	)
}

const Total = ({parts}) => {
  // console.log(parts[0])
	
  const total_exercises = parts.reduce( (sum, part) => {
      console.log(part.exercises)
      return sum + part.exercises
    }, 0
  )

  // console.log(total_exercises)

	return(
		  <p>
	        <strong>total of exercises {total_exercises}</strong>
      </p>
	)
}


const Course = ({course}) => {
  return(
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}  

const Content = ({parts}) => {
  // console.log("Content " + parts[0].name)

  return(
      <>
        {parts.map(part =>
          <Part key={part.id} osa={part} />
        )}
      </>
  )
}

export default Course
