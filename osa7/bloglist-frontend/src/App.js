import React, { useEffect } from 'react'
import Blogs, { BlogView } from './components/Blog'
import Users, { User } from './components/Users'
import Login from './components/Login'
import blogService from './services/blogs'
import Notification from './components/Notification'
import { setInitialUser } from './reducers/loginReducer'
import { useDispatch, useSelector} from 'react-redux'
import './App.css'
import {
  BrowserRouter as Router,
  Switch, Route, Link
} from 'react-router-dom'
import Container from '@material-ui/core/Container'
import {
  Button,
  Toolbar,
  AppBar
} from '@material-ui/core'

const App = () => {

  const dispatch = useDispatch()
  
  // INITIAL_USER
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogsAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      dispatch(setInitialUser(user))
    }
  }, [])

  const user = useSelector(state => state.login)
  console.log('user: ', user)

  return (
    <Container>
      <Router>
        <div>
          <AppBar position="static">
            <Toolbar>
              <Button color="inherit" component={Link} to="/blogs">
                blogs
              </Button>
              <Button color="inherit" component={Link} to="/users">
                users
              </Button>
              {user
                  ? <Login />
                  : <Button color="inherit" component={Link} to="/login">
                        login
                    </Button>
                  }   
            </Toolbar>
          </AppBar>
          <Notification />
        </div>
        <h2>Blog App</h2>
        <Switch>
          <Route path ="/login">
            <Login />
          </Route>
          <Route path ="/blogs/:id">
            <BlogView />
          </Route>
          <Route path ="/blogs">
            <Blogs />
          </Route>
          <Route path ="/users/:id">
            <User />
          </Route>
          <Route path ="/users">
            <Users />
          </Route>
        </Switch>
      </Router>
    </Container>
  )
}

export default App