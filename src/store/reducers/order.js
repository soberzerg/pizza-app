import {
  ORDER,
  ORDER_LOADING,
  ORDER_NOT_SENT,
  ORDER_SENT,
  ORDER_CLEAR_CART,
  ORDER_GET_DELIVERY_COST,
  ORDER_GOT_DELIVERY_COST,
  ORDER_UPDATE_CART,
  ORDER_UPDATE_DETAILS,
} from '../types'

const initialState = {
  status: ORDER.STATUS_IDLE,
  cart: [],
  data: {},
  delivery_cost: null,
  errors: {},
}

const mutators = {
  [ORDER_CLEAR_CART]: (state) => ({
    ...state,
    status: ORDER.STATUS_IDLE,
    cart: [],
  }),

  [ORDER_UPDATE_CART]: (state, cart) => {
    return {
      ...state,
      status: ORDER.STATUS_IDLE,
      cart,
    }
  },

  [ORDER_UPDATE_DETAILS]: (state, data) => {
    return {
      ...state,
      status: ORDER.STATUS_IDLE,
      data,
    }
  },

  [ORDER_GET_DELIVERY_COST]: (state) => ({
    ...state,
    status: ORDER.STATUS_GETTING_DELIVERY_COST,
  }),

  [ORDER_GOT_DELIVERY_COST]: (state, delivery_cost) => ({
    ...state,
    status: ORDER.STATUS_READY,
    delivery_cost,
  }),

  [ORDER_LOADING]: (state) => ({
    ...state,
    status: ORDER.STATUS_LOADING,
  }),

  [ORDER_NOT_SENT]: (state, errors) => ({
    ...state,
    status: ORDER.STATUS_ERROR,
    errors,
  }),

  [ORDER_SENT]: (state) => ({
    ...state,
    status: ORDER.STATUS_OK,
  }),

  DEFAULT: (state) => state,
}

export const orderReducer = (state = initialState, action) => {
  const mutator = mutators[action.type] || mutators.DEFAULT

  return mutator(state, action.payload)
}
