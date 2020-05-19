import React from 'react'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { useDispatch, useSelector } from 'react-redux'
import { showNotification } from '../reducers/notificationReducer'
import { login, logout } from '../reducers/loginReducer'
import { useHistory } from "react-router-dom";
import {
  Button,
  TextField,
} from '@material-ui/core'

// import { findIinitialUser } from '../reducers/loginReducer'

const Login = ( props ) => {
  const history = useHistory()
  const dispatch = useDispatch()
  const user = useSelector(state => state.login)

  const handleLogin = async (event) => {
    event.preventDefault()

    console.log('in handleLogin: ', event)

    let username = event.target.Username.value
    let password = event.target.Password.value

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogsAppUser', JSON.stringify(user)
      )
      // setUser(user)
      blogService.setToken(user.token)
      dispatch(login(user))
      // console.log('token', user.token)
      // setUsername('')
      password = ''
      history.push('/blogs')
    } catch (exception) {
      const message = 'Wrong username or password'
      const type = 'error'
      dispatch(showNotification({
        message, type
      }))
    }
  }

  const handleLogOut = (event) => {
    console.log('logging out', user.name, event)
    window.localStorage.clear()
    dispatch(logout())
    history.push('/blogs')
    // setUser(null)
  }


  console.log('USER:', user)
  if (user) {
    return (
      <><em>{user.name} logged in</em>
        <Button variant="contained" color="primary"  disableElevation onClick={ handleLogOut }>
          log out
        </Button>
      </>
    )
  } else {
    return (
    //   return (
      <div>

        <h2>Log in to application</h2>
        <form onSubmit={handleLogin}>
          <div>
            <TextField id="Username" label="Username" variant="outlined" />
          </div>
          <div>
            <TextField id="Password" label="Password" type='password' variant="outlined" />
          </div>
          <Button id="login-button" variant="contained" color="primary" type="submit">
            login
          </Button>
        </form>
      </div>
    )
  }
}

export default Login
