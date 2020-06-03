  
import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { ADD_BIRTHYEAR } from '../queries'


const Authors = (props) => {

  const [name, setName] = useState(props.authors[0].name)
  const [birthYear, setBirthYear] = useState('')

  const [ addBirthyear ] = useMutation(ADD_BIRTHYEAR)

  const submit = async (event) => {
    event.preventDefault()
    console.log('Changing birthyear: ', name, birthYear)
    addBirthyear({ variables: { name, setBornTo: Number(birthYear) } })
    setName('')
    setBirthYear('')
  }
  if (!props.show) {
    return null
  }
  const authors = props.authors

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      <h3>Set Birthyear</h3>

      <form onSubmit={submit}>
        <div>
          name:
          <select value={name} onChange={({ target }) => {
            console.log('changin selection to:', name, target.value)
            setName(target.value)}
          }>
          {authors.map(a =>
            <option key={a.name} value={a.name}>{a.name}</option>
          )}
          </select>
        </div>
        <div>
          born <input
            value={birthYear}
            onChange={({ target }) => setBirthYear(target.value)}
          />
        </div>
        <button type='submit'>update author</button>
      </form>
    </div>
  )
}


// <form onSubmit={submit}>
//   <div>
//     name <input
//       value={name}
//       onChange={({ target }) => setName(target.value)}
//     />
//   </div>
//   <div>
//     born <input
//       value={birthYear}
//       onChange={({ target }) => setBirthYear(target.value)}
//     />
//   </div>
//   <button type='submit'>update author</button>
// </form>

export default Authors
