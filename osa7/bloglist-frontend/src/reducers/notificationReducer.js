const initialState = ''

// const dispatch = useDispatch()

const notificationReducer = (state = initialState, action) => {
  console.log('notification ACTION: ', action)
  console.log('notification STATE: ', state)

  switch (action.type) {

  case 'SET_NOTIFICATION':
    console.log('xxx', action.notification)
    return action.notification
  case 'CLEAR_NOTIFICATION':
    console.log('in cclearing notification')
    return ('')

  default:
    return state
  }
}

let lastNotificationId = 0

export const showNotification = (notification) => {
  console.log('sending message :', notification)

  return function (dispatch) {

    // console.log('sending message :', message, type)
    clearTimeout(lastNotificationId)
    dispatch(makeNotification(notification))

    lastNotificationId = setTimeout(() => {
      dispatch(clearNotification())
    }, 5 * 1000)
  }
}

const makeNotification = (notification) => {
  console.log('making you notification: ', notification)
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