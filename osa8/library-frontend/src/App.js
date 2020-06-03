
import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/LoginForm'
import Recommended from './components/Recommended'
import { useQuery, useApolloClient, useSubscription } from '@apollo/client'
import { ALL_AUTHORS, ALL_BOOKS, ME, BOOK_ADDED } from './queries'

const App = () => {
  const [token, setToken] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [page, setPage] = useState('authors')

  const result = useQuery(ALL_AUTHORS)
  const books = useQuery(ALL_BOOKS)
  const currentUser = useQuery(ME)
  const client = useApolloClient()


  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) => 
      set.map(p => p.id).includes(object.id)  

    const dataInStore = client.readQuery({ query: ALL_BOOKS })
    if (!includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks : dataInStore.allBooks.concat(addedBook) }
      })
    }
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      console.log(subscriptionData)
      const addedBook = subscriptionData.data.bookAdded
      notify(`${addedBook.title} added`)
      updateCacheWith(addedBook)
    },
    // refetchQueries: [ { query: ALL_AUTHORS }, { query: ALL_BOOKS } ]
  })

  if (result.loading)  {
    return <div>loading...</div>
  }
  
  if (books.loading)  {
    return <div>loading...</div>
  }

  if (currentUser.loading) {
    return <div>loading...</div>
  }
  
  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }
  // console.log(result.data.allAuthors)
  // console.log(books.data.allBooks)



  // if (result.loading)  {
  //   return <div>loading...</div>
  // }





  if (!token) {
    return (
      <div>
        <div>
          <Notify errorMessage={errorMessage} />
          <button onClick={() => setPage('authors')}>authors</button>
          <button onClick={() => setPage('books')}>books</button>
          <button onClick={() => setPage('login')}>login</button>
        </div>
        <Authors
          show={page === 'authors'}
          authors = {result.data.allAuthors}
        />

        <Books
          show={page === 'books'}
          books = {books.data.allBooks}
        />

        <Login
          show={page === 'login'}
          setToken={setToken}
          setError={notify}
        />
      </div>
    )
  } else {

    console.log('CU', currentUser.data.me.username, currentUser.data.me.favoriteGenre)

    return (
      <div>
        <div>
          <Notify errorMessage={errorMessage} />
          <button onClick={() => setPage('authors')}>authors</button>
          <button onClick={() => setPage('books')}>books</button>
          <button onClick={() => setPage('add')}>add book</button>
          <button onClick={() => setPage('reco')}>recommended</button>
          <button onClick={logout} >logout</button>
        </div>

        <Authors
          show={page === 'authors'}
          authors = {result.data.allAuthors}
        />

        <Books
          show={page === 'books'}
          books = {books.data.allBooks}
        />

        <NewBook
          show={page === 'add'}
        />

        <Recommended
          show={page === 'reco'}
          books = {books.data.allBooks}
          genre = {currentUser.data.me.favoriteGenre}
        />
      </div>
    )
  }
}

const Notify = ({errorMessage}) => {
  if ( !errorMessage ) {
    return null
  }
  return (
    <div style={{color: 'red'}}>
      {errorMessage}
    </div>
  )
}

export default App