import { PRODUCTS_FETCHED, PRODUCTS_LOADING, PRODUCTS_NOT_LOADED, PRODUCTS } from '../types'

export const fetchProducts = () => {
  return (dispatch, getState, { api }) => {
    const state = getState().products
    switch (state.status) {
      case PRODUCTS.STATUS_OK:
      case PRODUCTS.STATUS_LOADING:
        return

      default:
        dispatch({
          type: PRODUCTS_LOADING,
        })

        return api
          .get('/products')
          .then(({ data }) => {
            dispatch({
              type: PRODUCTS_FETCHED,
              data: data.data,
            })
          })
          .catch(() => {
            dispatch({
              type: PRODUCTS_NOT_LOADED,
            })
          })
    }
  }
}
