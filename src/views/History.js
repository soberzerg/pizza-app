import React from 'react'
import { Container, Typography, makeStyles } from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux'
import { checkAuth } from '../store/actions/auth'

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
}))

const OrdersHistory = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const isAuthorized = useSelector((state) => !!state.auth.token)

  dispatch(checkAuth())

  return (
    <main>
      <Container className={classes.grow} maxWidth='md'>
        <Typography gutterBottom variant='h5' component='h2'>
          Orders history.
          {isAuthorized ? 'Authorized' : 'Not authorized'}
        </Typography>
      </Container>
    </main>
  )
}

export default OrdersHistory