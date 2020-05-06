
const initialState = ''

const notificationReducer = (state = initialState, action) => {
  console.log('notification ACTION: ', action)
  console.log('notification STATE: ', state)


  switch (action.type) {

    case 'SET_NOTIFICATION':
      // console.log('xxx', action.notification)
      return action.notification
    case 'CLEAR_NOTIFICATION':
      console.log('in cclearing notification')
      return ('')

    default:
      return state
  }
}

// let nextNotificationId = 0
// not using id's here....
export const showNotification = (text, timeOut) => {
  return function (dispatch) {
    // const id = nextNotificationId++
    dispatch(makeNotification(text))

    setTimeout(() => {
      dispatch(clearNotification())
    }, timeOut * 1000)
  }
}

const makeNotification = (notification) => {
  return {
    type: 'SET_NOTIFICATION',
    notification,
  }
}


const clearNotification = () => {
  return {
    type: 'CLEAR_NOTIFICATION',
  }
}


export default notificationReducer