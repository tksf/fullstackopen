import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import notificationReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogReducer'
import userReducer from './reducers/userReducer'
import loginReducer from './reducers/loginReducer'

// const store = createStore(notificationReducer)

const reducer = combineReducers({
  blogs: blogReducer,
  notification: notificationReducer,
  login: loginReducer,
  users: userReducer,
})

// const store = createStore(reducer)

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)

export default store
