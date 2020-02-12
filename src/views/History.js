import React from 'react'
import { Container, Typography, makeStyles, Grid, CircularProgress, Divider } from '@material-ui/core'
import { useDispatch, connect } from 'react-redux'

import { fetchOrders } from '../store/actions/orders'
import { ORDERS } from '../store/types'

const useStyles = makeStyles((theme) => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    height: '100%',
  },
  row: {
    margin: theme.spacing(1),
  },
  alignRight: {
    textAlign: 'right',
  },
  alignCenter: {
    textAlign: 'center',
  },
}))

const OrdersList = ({ orders }) => {
  const classes = useStyles()

  return orders.map((order) => {
    return (
      <React.Fragment key={order.id}>
        <Divider variant='middle' className={classes.row} />
        <Grid item xs={12} sm container spacing={1} alignItems='center'>
          <Grid item md={6}>
            <Typography gutterBottom>{order.address}</Typography>
            <Typography variant='body2'>{order.contact}</Typography>
          </Grid>
          <Grid item md={2}>
            <Typography variant='h5' className={classes.alignRight}>
              ${Number(order.total).toFixed(2)}
            </Typography>
          </Grid>
          <Grid item md={4}>
            <Typography className={classes.alignRight} noWrap>
              {order.created_at}
            </Typography>
          </Grid>
        </Grid>
      </React.Fragment>
    )
  })
}

const OrdersHistory = ({ isSignedIn, isLoading, orders }) => {
  const classes = useStyles()
  const dispatch = useDispatch()

  if (isSignedIn) {
    dispatch(fetchOrders())
  } else {
    return (
      <Container maxWidth='md'>
        <Typography gutterBottom variant='h5' className={classes.alignCenter}>
          Authorize to see your orders history
        </Typography>
      </Container>
    )
  }

  if (isLoading) {
    return (
      <div className={classes.wrapper}>
        <CircularProgress />
      </div>
    )
  } else if (isSignedIn) {
    return (
      <Container maxWidth='md'>
        <Typography gutterBottom variant='h5'>
          Your orders history
        </Typography>
        <Grid item xs={12} sm container spacing={1}>
          <Grid item md={6}>
            <Typography>Address / Contact info</Typography>
          </Grid>
          <Grid item md={2}>
            <Typography className={classes.alignRight}>Total cost</Typography>
          </Grid>
          <Grid item md={4}>
            <Typography className={classes.alignRight} noWrap>
              Created at
            </Typography>
          </Grid>
        </Grid>
        <OrdersList orders={orders} />
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isSignedIn: !!state.auth.token,
    isLoading: state.orders.status !== ORDERS.STATUS_OK,
    orders: state.orders.data,
  }
}

export default connect(mapStateToProps)(OrdersHistory)
