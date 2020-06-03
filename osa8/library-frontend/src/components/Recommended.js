import React from 'react'

const Recommended = (props) => {
  // const [books, setBooks] = useState(props.books)
  const originalBooks = props.books

  if (!props.show) {
    return null
  }

  const genre = props.genre
  const currentBooks = originalBooks.filter(b => b.genres.includes(genre))

  return (
    <div>
      <h2>recommendations</h2>
      Books in your favorite genre: {genre}
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {currentBooks.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Recommended