import React from 'react'
import { BrowserRouter, Route, Switch, NavLink } from 'react-router-dom'
import { Container, AppBar, Toolbar, Typography, makeStyles, Button } from '@material-ui/core'
import Catalog from './views/Catalog'
import Cart from './views/Cart'
import OrdersHistory from './views/History'
import { connect, useDispatch } from 'react-redux'
import { checkCart } from './store/actions/order'

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  toolbar: {
    color: '#fff',
  },
  active: {
    background: 'rgba(255, 255, 255, 0.2)',
  },
  wrapper: {
    paddingTop: 84,
  },
}))

const routes = [
  {
    path: '/',
    exact: true,
    component: Catalog,
  },
  {
    path: '/cart',
    component: Cart,
  },
  {
    path: '/history',
    component: OrdersHistory,
  },
]

function App({ cartTotal }) {
  const classes = useStyles()
  const dispatch = useDispatch()

  dispatch(checkCart())

  return (
    <BrowserRouter>
      <Container className={classes.wrapper}>
        <AppBar>
          <Toolbar display='flex' className={classes.toolbar}>
            <Typography variant='h6' color='inherit' noWrap className={classes.grow}>
              Pizza Menu
            </Typography>
            <Button component={NavLink} activeClassName={classes.active} color='inherit' to='/' exact>
              Catalog
            </Button>
            <Button component={NavLink} activeClassName={classes.active} color='inherit' to='/cart'>
              Cart {cartTotal ? '(' + cartTotal + ')' : ''}
            </Button>
            <Button component={NavLink} activeClassName={classes.active} color='inherit' to='/history'>
              Order History
            </Button>
          </Toolbar>
        </AppBar>
        <Switch>
          {routes.map((route, index) => (
            <Route key={index} path={route.path} exact={route.exact} render={(props) => <route.component {...props} />} />
          ))}
        </Switch>
      </Container>
    </BrowserRouter>
  )
}

const mapStateToProps = (state) => {
  let cartTotal = 0
  state.order.cart.forEach((item) => {
    cartTotal += item.quantity
  })

  return {
    cartTotal: cartTotal,
  }
}

export default connect(mapStateToProps)(App)
