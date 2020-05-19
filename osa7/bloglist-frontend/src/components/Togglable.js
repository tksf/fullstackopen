import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
import {
  Button,
} from '@material-ui/core'

const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  console.log('propsit:', props)


  //   return (
  //     <div>
  //       <div style={hideWhenVisible}>
  //         <button onClick={toggleVisibility}>{props.buttonLabel}</button>
  //       </div>
  //       <div style={showWhenVisible}>
  //         {props.children}
  //         <button onClick={toggleVisibility}>cancel</button>
  //       </div>
  //     </div>
  //   )
  // })

  // Togglable.displayName = 'Togglable'

  // Togglable.propTypes = {
  //   buttonLabel: PropTypes.string.isRequired
  // }

  // export default Togglable


  return (
    <div>
      <div style={hideWhenVisible}>
        <Button size="small" id="toggle-button" variant="contained" color="primary" onClick={toggleVisibility}>
          {props.buttonLabel}
        </Button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <Button size="small" id="toggle-button" variant="contained" color="primary" onClick={toggleVisibility}>
          cancel
        </Button>
      </div>
    </div>
  )
})

Togglable.displayName = 'Togglable'

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

export default Togglable
