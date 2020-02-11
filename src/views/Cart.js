import React from 'react'
import { Container, Typography, makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
}))

const Cart = () => {
  const classes = useStyles()

  return (
    <main>
      <Container className={classes.grow} maxWidth='md'>
        <Typography gutterBottom variant='h5' component='h2'>
          Cart
        </Typography>
      </Container>
    </main>
  )
}

export default Cart