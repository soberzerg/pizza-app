import React from 'react'
import {
  Container,
  Typography,
  makeStyles,
  Grid,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Card,
  CircularProgress,
  Input,
  IconButton,
} from '@material-ui/core'
import { useDispatch, connect } from 'react-redux'
import { AddShoppingCart, Remove, Add, ShoppingCart } from '@material-ui/icons'

import { fetchProducts } from '../store/actions/products'
import { PRODUCTS } from '../store/types'
import { addToCart, updateCartItem } from '../store/actions/order'
import { NavLink } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    height: '100%',
  },
  price: {
    flexGrow: 1,
    textAlign: 'right',
  },
  media: {
    height: 200,
  },
  content: {
    display: 'flex',
  },
  btn: {
    width: 140,
  },
  btnInput: {
    width: 30,
  },
  input: {
    width: 30,
  },
}))

const ProductList = ({ cart, products }) => {
  const classes = useStyles()
  const dispatch = useDispatch()

  return products.map((product) => {
    const ci = cart.find((a) => a.id === product.id) || { quantity: 0 }

    return (
      <Grid item key={product.id} xs={12} sm={6} md={4}>
        <Card>
          <CardMedia className={classes.media} image={product.image} title='{product.name}' />
          <CardContent className={classes.content}>
            <Typography gutterBottom variant='h5' component='h2'>
              {product.name}
            </Typography>
            <Typography gutterBottom variant='h5' className={classes.price}>
              ${Number(product.price).toFixed(2)}
            </Typography>
          </CardContent>
          <CardActions>
            {ci.quantity ? (
              <div>
                <Button size='small' color='primary' startIcon={<ShoppingCart />} className={classes.btn} component={NavLink} to='/cart'>
                  Go to cart
                </Button>
                <IconButton
                  size='small'
                  color='primary'
                  className={classes.btnInput}
                  onClick={(e) => dispatch(updateCartItem(product, ci.quantity - 1))}
                >
                  <Remove />
                </IconButton>
                <Input
                  size='small'
                  type='number'
                  value={ci.quantity}
                  className={classes.input}
                  margin='dense'
                  onChange={(e) => dispatch(updateCartItem(product, Number(e.target.value)))}
                />
                <IconButton size='small' color='primary' className={classes.btnInput} onClick={(e) => dispatch(addToCart(product))}>
                  <Add />
                </IconButton>
              </div>
            ) : (
              <div>
                <Button
                  size='small'
                  color='primary'
                  startIcon={<AddShoppingCart />}
                  className={classes.btn}
                  onClick={(e) => dispatch(addToCart(product))}
                >
                  Add to cart
                </Button>
              </div>
            )}
          </CardActions>
        </Card>
      </Grid>
    )
  })
}

const Catalog = ({ isLoading, products, cart }) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  dispatch(fetchProducts())

  if (isLoading) {
    return (
      <div className={classes.wrapper}>
        <CircularProgress />
      </div>
    )
  } else {
    return (
      <Container maxWidth='md'>
        <Grid container spacing={4}>
          <ProductList products={products} cart={cart} />
        </Grid>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isLoading: state.products.status !== PRODUCTS.STATUS_OK,
    products: state.products.data,
    cart: state.order.cart,
  }
}

export default connect(mapStateToProps)(Catalog)
