import {
  ORDER,
  ORDER_CLEAR_CART,
  ORDER_SENT,
  ORDER_NOT_SENT,
  ORDER_LOADING,
  ORDER_UPDATE_CART,
  ORDER_GET_DELIVERY_COST,
  ORDER_GOT_DELIVERY_COST,
  ORDER_UPDATE_DETAILS,
} from '../types'

const CART_MIN_QUANTITY = 0
const CART_MAX_QUANTITY = 99
const CART_STORAGE_KEY = 'cart'

export const clearCart = () => ({
  type: ORDER_CLEAR_CART,
})

export const checkCart = () => {
  return (dispatch, getState) => {
    const state = getState().order
    switch (state.status) {
      case ORDER.STATUS_IDLE:
        const cartJson = localStorage.getItem(CART_STORAGE_KEY)
        if (cartJson) {
          dispatch({
            type: ORDER_UPDATE_CART,
            payload: JSON.parse(cartJson),
          })
        }
        break

      default:
    }
  }
}

export const addToCart = (item) => {
  return (dispatch, getState) => {
    const cart = [...getState().order.cart]
    const ci = cart.find((a) => a.id === item.id)
    if (ci) {
      if (ci.quantity < CART_MAX_QUANTITY) cart[cart.indexOf(ci)].quantity++
    } else {
      cart.push({
        id: item.id,
        quantity: 1,
      })
    }

    dispatch({
      type: ORDER_UPDATE_CART,
      payload: cart,
    })

    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart))
  }
}

export const updateCartItem = (item, quantity) => {
  return (dispatch, getState) => {
    if (quantity < CART_MIN_QUANTITY || quantity > CART_MAX_QUANTITY) return

    const cart = [...getState().order.cart]
    const ci = cart.find((a) => a.id === item.id)
    if (ci) {
      cart[cart.indexOf(ci)].quantity = quantity
    }

    dispatch({
      type: ORDER_UPDATE_CART,
      payload: cart,
    })

    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart))
  }
}

export const removeCartItem = (item) => {
  return (dispatch, getState) => {
    const cart = [...getState().order.cart]
    const ci = cart.find((a) => a.id === item.id)
    if (ci) {
      delete cart[cart.indexOf(ci)]
    }

    dispatch({
      type: ORDER_UPDATE_CART,
      payload: cart,
    })

    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart))
  }
}

export const fetchDeliveryCost = () => {
  return (dispatch, getState, { api }) => {
    const state = getState().order
    switch (state.status) {
      case ORDER.STATUS_IDLE:
        dispatch({
          type: ORDER_GET_DELIVERY_COST,
        })

        return api
          .get('/delivery-cost')
          .then(({ data }) => {
            dispatch({
              type: ORDER_GOT_DELIVERY_COST,
              payload: data.cost,
            })
          })
          .catch((errors) => {
            dispatch({
              type: ORDER_NOT_SENT,
              payload: errors,
            })
          })

      default:
    }
  }
}

export const setOrderDetails = (data) => ({
  type: ORDER_UPDATE_DETAILS,
  payload: data,
})

export const sendOrder = () => {
  return (dispatch, getState, { api, params }) => {
    const state = getState().order
    switch (state.status) {
      case ORDER.STATUS_READY:
        dispatch({
          type: ORDER_LOADING,
        })

        return api
          .post('/orders', {
            ...params,
            ...state.data,
            delivery_cost: state.delivery_cost,
            products: state.cart,
          })
          .then(() => {
            dispatch({
              type: ORDER_SENT,
            })
          })
          .catch((errors) => {
            dispatch({
              type: ORDER_NOT_SENT,
              payload: errors,
            })
          })

      default:
    }
  }
}
