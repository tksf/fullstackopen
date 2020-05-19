import React from 'react'
import { connect } from 'react-redux'
import { Alert } from '@material-ui/lab'

const Notification = ( props ) => {
  console.log('in Notification w/: ', props)

  let notification = props.notification

  if ( !notification ) {
    return null
  }

  const severity = notification.type === 'error' ? 'error' : 'success'

  return (
    <div>
      {(notification.message &&
        <Alert severity={severity}>
          {notification.message}
        </Alert>
      )}
    </div>
  )
}

// export default Notification

const mapStateToProps = (state) => {
  return {
    notification: state.notification,
  }
}

const ConnectedNotification = connect(mapStateToProps)(Notification)
export default ConnectedNotification

