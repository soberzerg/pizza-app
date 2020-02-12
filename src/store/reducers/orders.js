import { ORDERS, ORDERS_FETCHED, ORDERS_LOADING, ORDERS_NOT_LOADED, ORDERS_APPEND } from '../types'

const mutators = {
  [ORDERS_LOADING]: () => ({
    status: ORDERS.STATUS_LOADING,
    data: [],
  }),

  [ORDERS_NOT_LOADED]: () => ({
    status: ORDERS.STATUS_ERROR,
    data: [],
  }),

  [ORDERS_FETCHED]: (state, data) => ({
    status: ORDERS.STATUS_OK,
    data,
  }),

  [ORDERS_APPEND]: ({ status, data }, item) => {
    const _data = [...data]
    _data.unshift(item)

    return { status, data: _data }
  },

  DEFAULT: (state) => state,
}

const initialState = {
  status: ORDERS.STATUS_IDLE,
  data: [],
}

export const ordersReducer = (state = initialState, action) => {
  const mutator = mutators[action.type] || mutators.DEFAULT

  return mutator(state, action.data)
}
