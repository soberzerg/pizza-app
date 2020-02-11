import { AUTH_SET_TOKEN, AUTH_CLEAR_TOKEN } from '../types'

const mutators = {
  [AUTH_SET_TOKEN]: (state, token) => ({
    token,
  }),

  [AUTH_CLEAR_TOKEN]: (state) => ({
    token: null,
  }),

  DEFAULT: (state) => state,
}

const initialState = {
  token: null,
}

export const authReducer = (state = initialState, action) => {
  const mutator = mutators[action.type] || mutators.DEFAULT

  return mutator(state, action.token)
}
