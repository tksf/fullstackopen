
const loginReducer = (state = null, action) => {
  console.log('login ACTION: ', action)
  console.log('login STATE: ', state)

  switch (action.type) {

  case 'INIT_USER':
    console.log('found initial user', action.user)
    return action.user
  case 'LOGIN':
    return action.user
  case 'LOGOUT':
    return null
  default:
    return state
  }
}

export const setInitialUser = (user) => {
  // console.log('searching for initial user...')

  return({
    type: 'INIT_USER',
    user: user,
  })
}

export const login = (user) => {
  return({
    type: 'LOGIN',
    user: user,
  })
}

export const logout = () => {
  return({
    type: 'LOGOUT',
    user: null
  })
}

export default loginReducer

