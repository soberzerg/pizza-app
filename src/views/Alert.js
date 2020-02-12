import React from 'react'
import { IconButton, Snackbar } from '@material-ui/core'
import { connect } from 'react-redux'
import { Close } from '@material-ui/icons'

function Alert({ open, message, handleClose }) {
  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      open={open}
      autoHideDuration={5000}
      onClose={handleClose}
      message={message}
      action={
        <React.Fragment>
          <IconButton size='small' aria-label='close' color='inherit' onClick={handleClose}>
            <Close fontSize='small' />
          </IconButton>
        </React.Fragment>
      }
    />
  )
}

const mapStateToProps = (state) => {
  return state.alert
}

export default connect(mapStateToProps)(Alert)
