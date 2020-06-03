import React, {useState} from 'react'

const Books = (props) => {
  const [books, setBooks] = useState(props.books)
  const originalBooks = props.books
  const [selectedGenre, setSelectedGenre] = useState('all')
  // let selectedGenre = 'all'

  if (!props.show) {
    return null
  }


  // const books = props.books
  let allGenres = []
  allGenres = originalBooks.map(b => allGenres.concat(b.genres))
  const uniqueGenres = Array.from(new Set(allGenres.flat()))
  console.log(uniqueGenres)

  // const genres = set

  const handleGenre = (genre) => {
    // console.log('setting genre: ', genre, books)
    // const currentBooks = books.map(b => b.filter(b.genres.includes(genre)))
    setSelectedGenre(genre)

    if (genre === 'all') {
      setBooks(originalBooks)
    } else {  
      const currentBooks = originalBooks.filter(b => b.genres.includes(genre))
      console.log('setting genre: ', genre, currentBooks)
      setBooks(currentBooks)
    }
    // setBooks
  }

  return (
    <div>
      <h2>books</h2>
      in genre {selectedGenre}
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
          {books.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table><br />
      {uniqueGenres.map(g =>
        <button onClick={() => handleGenre(g)}>{g}</button>
      )}
      <button onClick={() => handleGenre('all')}>all genres</button>
    </div>
  )
}

export default Books