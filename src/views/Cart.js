import React, { useState } from 'react'
import {
  Container,
  Typography,
  makeStyles,
  Grid,
  IconButton,
  Input,
  Paper,
  ButtonBase,
  CircularProgress,
  Button,
  Box,
  Stepper,
  Step,
  StepLabel,
  TextField,
} from '@material-ui/core'
import { updateCartItem, addToCart, removeCartItem, sendOrder, setOrderDetails, fetchDeliveryCost, clearCart } from '../store/actions/order'
import { Add, Remove, Delete } from '@material-ui/icons'
import { useDispatch, connect } from 'react-redux'
import { PRODUCTS, ORDER } from '../store/types'
import { fetchProducts } from '../store/actions/products'
import { useHistory, NavLink } from 'react-router-dom'
import { showAlert } from '../store/actions/alert'
import { addOrder } from '../store/actions/orders'

const useStyles = makeStyles((theme) => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    height: '100%',
  },
  grow: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: theme.spacing(2),
  },
  image: {
    width: 73,
    height: 73,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
  btn: {
    width: 140,
  },
  btnInput: {
    width: 30,
  },
  input: {
    width: 60,
  },
  centered: {
    alignItems: 'center',
  },
  alignCenter: {
    textAlign: 'center',
  },
  alignRight: {
    textAlign: 'right',
  },
  backButton: {
    marginRight: theme.spacing(2),
  },
}))

const CartList = ({ cart, products }) => {
  const classes = useStyles()
  const dispatch = useDispatch()

  return cart.map((ci) => {
    const product = products.find((a) => a.id === ci.id)

    return (
      <Paper key={product.id} className={classes.paper}>
        <Grid item xs={12} sm container spacing={2} className={classes.centered}>
          <Grid item>
            <ButtonBase className={classes.image}>
              <img src={product.image} className={classes.img} alt='' />
            </ButtonBase>
          </Grid>
          <Grid item xs>
            <Typography gutterBottom variant='h5'>
              {product.name}
            </Typography>
          </Grid>
          <Grid item>
            <IconButton color='primary' className={classes.btnInput} onClick={(e) => dispatch(updateCartItem(product, ci.quantity - 1))}>
              <Remove />
            </IconButton>
            <Input
              type='number'
              value={ci.quantity}
              className={classes.input}
              onChange={(e) => dispatch(updateCartItem(product, Number(e.target.value)))}
            />
            <IconButton color='primary' className={classes.btnInput} onClick={(e) => dispatch(addToCart(product))}>
              <Add />
            </IconButton>
          </Grid>
          <Grid item md={2}>
            <Typography variant='h5' className={classes.alignRight}>
              ${(product.price * ci.quantity).toFixed(2)}
            </Typography>
          </Grid>
          <Grid item>
            <IconButton color='primary' className={classes.btnInput} onClick={(e) => dispatch(removeCartItem(product))}>
              <Delete />
            </IconButton>
          </Grid>
        </Grid>
      </Paper>
    )
  })
}

const Cart = ({ isLoading, products, cart, order, delivery_cost, status, errors }) => {
  const [activeStep, setActiveStep] = useState(0)

  const classes = useStyles()
  const dispatch = useDispatch()
  const history = useHistory()
  dispatch(fetchProducts())

  const disableButtons = status === ORDER.STATUS_LOADING

  if (isLoading) {
    return (
      <div className={classes.wrapper}>
        <CircularProgress />
      </div>
    )
  } else {
    let sum = 0
    cart.forEach((ci) => {
      const product = products.find((a) => a.id === ci.id)
      sum += product.price * ci.quantity
    })

    const steps = ['Cart', 'Delivery details', 'Order confirmed']
    const stepsContent = []

    // Cart
    stepsContent.push(
      <div>
        <CartList products={products} cart={cart} />
        {cart.length ? (
          ''
        ) : (
          <Box p={2} className={classes.alignCenter}>
            <Typography>
              No products in the cart. Go&nbsp;
              <NavLink to='/'>products</NavLink>
              &nbsp;and choose something
            </Typography>
          </Box>
        )}
        <Box p={2}>
          <Typography variant='h4' className={classes.alignRight}>
            Cart total: ${sum.toFixed(2)}
          </Typography>
        </Box>
        <Box display='flex' flexDirection='row-reverse' m={2}>
          <Button
            variant='contained'
            size='large'
            color='primary'
            disabled={!cart.length}
            onClick={() => {
              setActiveStep((prevActiveStep) => prevActiveStep + 1)
            }}
          >
            Proceed order
          </Button>
        </Box>
      </div>
    )
    // Delivery details
    stepsContent.push(
      <div>
        <Box p={2}>
          <Typography variant='h5'>Please, fill the form below:</Typography>
        </Box>
        <Box p={2}>
          <TextField
            required
            fullWidth
            label='Delivery address'
            value={order.address}
            disabled={disableButtons}
            error={!!errors.address}
            helperText={errors.address}
            onChange={(e) => dispatch(setOrderDetails({ address: e.target.value }))}
          />
        </Box>
        <Box p={2}>
          <TextField
            required
            fullWidth
            label='Your contact information'
            value={order.contact}
            disabled={disableButtons}
            error={!!errors.contact}
            helperText={errors.contact}
            onChange={(e) => dispatch(setOrderDetails({ contact: e.target.value }))}
          />
        </Box>
        <Box p={2}>
          <Typography variant='h4' className={classes.alignRight}>
            Cart total: ${sum.toFixed(2)}
          </Typography>
        </Box>
        <Box display='flex' flexDirection='row-reverse' m={2}>
          <Button
            variant='contained'
            size='large'
            color='primary'
            disabled={disableButtons || !order.address || !order.contact}
            onClick={() => {
              setActiveStep((prevActiveStep) => prevActiveStep + 1)
              dispatch(fetchDeliveryCost())
            }}
          >
            Confirm delivery details
          </Button>
          <Button
            size='large'
            disabled={disableButtons}
            onClick={() => {
              setActiveStep((prevActiveStep) => prevActiveStep - 1)
            }}
            className={classes.backButton}
          >
            Back
          </Button>
        </Box>
      </div>
    )
    // Order confirmed
    stepsContent.push(
      <div>
        <Box p={2}>
          <Typography variant='h4' className={classes.alignRight}>
            Cart total: ${sum.toFixed(2)}
          </Typography>
        </Box>
        <Box p={2}>
          <Typography variant='h4' className={classes.alignRight}>
            Delivery cost: ${delivery_cost.toFixed(2)}
          </Typography>
        </Box>
        <Box p={2}>
          <Typography variant='h4' className={classes.alignRight}>
            Order total: ${(sum + delivery_cost).toFixed(2)}
          </Typography>
        </Box>
        <Box display='flex' flexDirection='row-reverse' m={2}>
          <Button
            variant='contained'
            size='large'
            color='primary'
            disabled={disableButtons || status !== ORDER.STATUS_READY}
            onClick={() => {
              dispatch(sendOrder()).then(({ sent, data, error }) => {
                if (error) {
                  setActiveStep((prevActiveStep) => prevActiveStep - 1)
                  dispatch(showAlert(error))
                } else if (sent) {
                  dispatch(clearCart())
                  dispatch(showAlert('Order successfully sent'))
                  dispatch(addOrder(data))
                  history.push('/')
                }
              })
            }}
          >
            Confirm order
          </Button>
          <Button
            size='large'
            disabled={disableButtons}
            onClick={() => {
              setActiveStep((prevActiveStep) => prevActiveStep - 1)
            }}
            className={classes.backButton}
          >
            Back
          </Button>
        </Box>
      </div>
    )

    return (
      <Container maxWidth='md'>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        {stepsContent[activeStep]}
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isLoading: state.products.status !== PRODUCTS.STATUS_OK,
    products: state.products.data,
    cart: state.order.cart,
    errors: state.order.errors,
    status: state.order.status,
    order: state.order.data,
    delivery_cost: state.order.delivery_cost,
  }
}

export default connect(mapStateToProps)(Cart)
