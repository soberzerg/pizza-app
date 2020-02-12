import React from 'react'
import { BrowserRouter, Route, Switch, NavLink } from 'react-router-dom'
import { Container, AppBar, Toolbar, Typography, makeStyles, Button, Box, Badge, withStyles } from '@material-ui/core'
import Catalog from './views/Catalog'
import Cart from './views/Cart'
import OrdersHistory from './views/History'
import { connect, useDispatch } from 'react-redux'
import { checkCart } from './store/actions/order'
import Alert from './views/Alert'
import { hideAlert } from './store/actions/alert'
import { ShoppingCart, ViewModule, ViewList } from '@material-ui/icons'
import SignInDialog from './views/SignInDialog'
import { checkAuth } from './store/actions/auth'

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
  logo: {
    marginRight: theme.spacing(5),
  },
  btn: {
    marginRight: theme.spacing(2),
  },
}))

const StyledBadge = withStyles((theme) => ({
  badge: {
    top: 0,
    left: -20,
    right: 'auto',
  },
}))(Badge)

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

  const alertClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    dispatch(hideAlert())
  }

  dispatch(checkAuth())
  dispatch(checkCart())

  return (
    <BrowserRouter>
      <Container className={classes.wrapper}>
        <AppBar>
          <Toolbar display='flex' className={classes.toolbar}>
            <Typography variant='h6' color='inherit' noWrap className={classes.logo}>
              Pizza Menu
            </Typography>
            <Box className={classes.grow}>
              <Button
                component={NavLink}
                className={classes.btn}
                activeClassName={classes.active}
                color='inherit'
                to='/'
                exact
                startIcon={<ViewModule />}
              >
                Catalog
              </Button>
              <StyledBadge
                badgeContent={cartTotal}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                color='secondary'
              >
                <Button
                  component={NavLink}
                  className={classes.btn}
                  activeClassName={classes.active}
                  color='inherit'
                  to='/cart'
                  startIcon={<ShoppingCart />}
                >
                  Cart
                </Button>
              </StyledBadge>
              <Button
                component={NavLink}
                className={classes.btn}
                activeClassName={classes.active}
                color='inherit'
                to='/history'
                startIcon={<ViewList />}
              >
                Order History
              </Button>
            </Box>
            <SignInDialog />
          </Toolbar>
        </AppBar>
        <Switch>
          {routes.map((route, index) => (
            <Route key={index} path={route.path} exact={route.exact} render={(props) => <route.component {...props} />} />
          ))}
        </Switch>
        <Alert handleClose={alertClose} />
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
