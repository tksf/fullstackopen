import userService from '../services/users'

const userReducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch(action.type) {
  case 'INIT_USERS':
    console.log('user init returning', action)
    return action.users
  default:
    return state
  }
}

export const initializeUsers = () => {
  return async dispatch => {
    const users = await userService.getAll()
    dispatch ({
      type: 'INIT_USERS',
      users: users,
    })
  }
}

export default userReducer