import { ORDERS_FETCHED, ORDERS_LOADING, ORDERS_NOT_LOADED, ORDERS, ORDERS_APPEND } from '../types'

export const fetchOrders = () => {
  return (dispatch, getState, { api }) => {
    const state = getState().orders
    switch (state.status) {
      case ORDERS.STATUS_OK:
      case ORDERS.STATUS_LOADING:
        return

      default:
        dispatch({
          type: ORDERS_LOADING,
        })

        return api
          .get('/orders')
          .then(({ data }) => {
            dispatch({
              type: ORDERS_FETCHED,
              data: data.data,
            })
          })
          .catch(() => {
            dispatch({
              type: ORDERS_NOT_LOADED,
            })
          })
    }
  }
}

export const addOrder = (order) => {
  return (dispatch, getState) => {
    const state = getState().orders
    if (state.status === ORDERS.STATUS_OK) {
      dispatch({
        type: ORDERS_APPEND,
        data: order,
      })
    }
  }
}
