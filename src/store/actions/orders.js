import { ORDERS_FETCHED, ORDERS_LOADING, ORDERS_NOT_LOADED, ORDERS } from '../types'

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
