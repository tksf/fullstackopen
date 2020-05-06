import React from 'react'
// import { useSelector } from 'react-redux'
import { connect } from 'react-redux'

const Notification = (props) => {

  // const dispatch = useDispatch()

  // let notification = useSelector(state => state.notification)
  let notification = props.notification

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  console.log('notification: ', notification)

  if (notification === '') {
    return (
      <div></div>
    )
  } else {
    return (
      <div style={style}>
        {notification}
      </div>
    )
  }
}

// export default Notification

const mapStateToProps = (state) => {
  return {
    notification: state.notification,
  }
}

const ConnectedNotification = connect(mapStateToProps)(Notification)
export default ConnectedNotification