
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

let lastNotificationId = 0
export const showNotification = (text, timeOut) => {
  return function (dispatch) {

    clearTimeout(lastNotificationId)
    dispatch(makeNotification(text))

    lastNotificationId = setTimeout(() => {
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