import React, { useState, useEffect } from 'react'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import BlogList from './components/BlogList'
import blogService from './services/blogs'
import loginService from './services/login'
import { ErrorNotification, MessageNotification } from './components/Notification'
import './App.css'


const App = () => {
  const [ blogs, setBlogs ] = useState([])
  const [ errorMessage, setErrorMessage ] = useState(null)
  const [ notificationMessage, setNotificationMessage ] = useState(null)
  const [ username, setUsername ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ user, setUser ] = useState(null)
  // const [ creationVisible, setCreationVisible ] = useState(false)
  const blogFormRef = React.createRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogsAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      setUser(user)
      // noteService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogsAppUser', JSON.stringify(user)
      )
      setUser(user)
      blogService.setToken(user.token)
      // console.log('token', user.token)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
    }

    console.log('logging in with', username, password)
  }

  const addBlog = (newBlog) => {
    blogFormRef.current.toggleVisibility()
    blogService
      .create(newBlog)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setNotificationMessage(`a new blog ${newBlog.title} by ${newBlog.author} added`)
      })
    setTimeout(() => {
      setNotificationMessage(null)
    }, 3000)
  }

  const handleLogOut = (event) => {
    console.log('logging out', user.name, event)
    window.localStorage.clear()
    setUser(null)
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <ErrorNotification message={errorMessage} />
        <form onSubmit={handleLogin}>
          <div>
              username
            <input
              id="username"
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              id="password"
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button id="login-button" type="submit">login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <MessageNotification message={notificationMessage} />
      <h2>blogs</h2>
      <p>{user.name} logged in
        <button onClick={ handleLogOut }>log out</button>
      </p>
      <h2>create new</h2>

      <Togglable buttonLabel='new note' ref={blogFormRef}>
        <BlogForm createBlog={addBlog} />
      </Togglable>
      <BlogList blogs={blogs} />
    </div>
  )
}


//   {blogs.map(blog =>
//     <Blog key={blog.id} blog={blog} />
// )}

export default App