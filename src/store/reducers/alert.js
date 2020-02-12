import { ALERT_NEW_MESSAGE, ALERT_HIDE } from '../types'

const mutators = {
  [ALERT_NEW_MESSAGE]: (state, message) => ({
    open: true,
    message,
  }),

  [ALERT_HIDE]: () => ({
    open: false,
    message: null,
  }),

  DEFAULT: (state) => state,
}

const initialState = {
  open: false,
  message: null,
}

export const alertReducer = (state = initialState, action) => {
  const mutator = mutators[action.type] || mutators.DEFAULT

  return mutator(state, action.message)
}
