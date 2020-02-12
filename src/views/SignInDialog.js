import React, { useState } from 'react'
import { connect, useDispatch } from 'react-redux'
import { AccountCircle, ExitToApp, ViewList } from '@material-ui/icons'
import { Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions, Box, Menu, MenuItem, CircularProgress } from '@material-ui/core'
import { login, logout } from '../store/actions/auth'
import { useHistory } from 'react-router-dom'
import { fetchProfile } from '../store/actions/profile'

function SignInDialog({ isSignedIn, username }) {
  const dispatch = useDispatch()
  const history = useHistory()
  const [open, setOpen] = useState(false)
  const [isLoading, setLoading] = useState(false)
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({ email: '', password: '' })
  const [menuAnchor, setMenuAnchor] = useState(null)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleSignIn = () => {
    setLoading(true)
    dispatch(login(formData)).then(({ success, errors }) => {
      setLoading(false)
      if (errors) {
        setErrors(errors)
      } else {
        setOpen(false)
      }
    })
  }

  const handleMenuOpen = (e) => {
    setMenuAnchor(e.currentTarget)
  }

  const handleMenuClose = () => {
    setMenuAnchor(null)
  }

  if (isSignedIn) {
    if (!username) {
      dispatch(fetchProfile())
    }
    return (
      <Box display='flex' flexDirection='row'>
        <Button onClick={handleMenuOpen} color='inherit' startIcon={<AccountCircle />}>
          {username ?? <CircularProgress size={30} color='inherit' />}
        </Button>
        <Menu
          anchorEl={menuAnchor}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          keepMounted
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={Boolean(menuAnchor)}
          onClose={handleMenuClose}
        >
          <MenuItem
            onClick={() => {
              history.push('/history')
              handleMenuClose()
            }}
          >
            <ViewList />
            Orders history
          </MenuItem>
          <MenuItem
            onClick={(e) => {
              e.stopPropagation()
              dispatch(logout())
              handleMenuClose()
            }}
          >
            <ExitToApp />
            Sign out
          </MenuItem>
        </Menu>
      </Box>
    )
  } else {
    return (
      <div>
        <Button color='inherit' startIcon={<AccountCircle />} onClick={handleClickOpen}>
          Sign In
        </Button>
        <Dialog fullWidth maxWidth='sm' open={open} onClose={handleClose} aria-labelledby='form-dialog-title'>
          <DialogTitle id='form-dialog-title'>Sign In</DialogTitle>
          <DialogContent>
            <Box p={2}>
              <TextField
                required
                fullWidth
                autoFocus
                label='Login'
                type='email'
                value={formData.email}
                disabled={isLoading}
                error={!!errors.email}
                helperText={errors.email}
                onChange={(e) => {
                  setFormData({ ...formData, email: e.target.value })
                  setErrors({ ...errors, email: '' })
                }}
              />
            </Box>
            <Box p={2}>
              <TextField
                required
                fullWidth
                label='Password'
                type='password'
                value={formData.password}
                disabled={isLoading}
                error={!!errors.password}
                helperText={errors.password}
                onChange={(e) => {
                  setFormData({ ...formData, password: e.target.value })
                  setErrors({ ...errors, password: '' })
                }}
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color='secondary' disabled={isLoading}>
              Cancel
            </Button>
            <Button onClick={handleSignIn} color='primary' disabled={isLoading}>
              {isLoading ? <CircularProgress size={30} color='inherit' /> : 'Sign in'}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isSignedIn: !!state.auth.token,
    username: state.profile.data.name,
  }
}

export default connect(mapStateToProps)(SignInDialog)
