import { PROFILE, PROFILE_LOADING, PROFILE_NOT_LOADED, PROFILE_FETCHED } from '../types'

const mutators = {
  [PROFILE_LOADING]: () => ({
    status: PROFILE.STATUS_LOADING,
    data: {},
  }),

  [PROFILE_NOT_LOADED]: () => ({
    status: PROFILE.STATUS_ERROR,
    data: {},
  }),

  [PROFILE_FETCHED]: (state, data) => ({
    status: PROFILE.STATUS_OK,
    data,
  }),

  DEFAULT: (state) => state,
}

const initialState = {
  status: PROFILE.STATUS_IDLE,
  data: {},
}

export const profileReducer = (state = initialState, action) => {
  const mutator = mutators[action.type] || mutators.DEFAULT

  return mutator(state, action.data)
}
