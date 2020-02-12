import { PROFILE, PROFILE_LOADING, PROFILE_FETCHED, PROFILE_NOT_LOADED } from '../types'

export const fetchProfile = () => {
  return (dispatch, getState, { api }) => {
    const state = getState().profile
    switch (state.status) {
      case PROFILE.STATUS_OK:
      case PROFILE.STATUS_LOADING:
        return

      default:
        dispatch({
          type: PROFILE_LOADING,
        })

        return api
          .get('/user')
          .then(({ data }) => {
            dispatch({
              type: PROFILE_FETCHED,
              data: data,
            })
          })
          .catch(() => {
            dispatch({
              type: PROFILE_NOT_LOADED,
            })
          })
    }
  }
}
