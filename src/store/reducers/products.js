import { PRODUCTS, PRODUCTS_FETCHED, PRODUCTS_LOADING, PRODUCTS_NOT_LOADED } from '../types'

const mutators = {
  [PRODUCTS_LOADING]: () => ({
    status: PRODUCTS.STATUS_LOADING,
    data: [],
  }),

  [PRODUCTS_NOT_LOADED]: () => ({
    status: PRODUCTS.STATUS_ERROR,
    data: [],
  }),

  [PRODUCTS_FETCHED]: (state, data) => ({
    status: PRODUCTS.STATUS_OK,
    data,
  }),

  DEFAULT: (state) => state,
}

const initialState = {
  status: PRODUCTS.STATUS_IDLE,
  data: [],
}

export const productsReducer = (state = initialState, action) => {
  const mutator = mutators[action.type] || mutators.DEFAULT

  return mutator(state, action.data)
}
