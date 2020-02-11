import { AUTH_SET_TOKEN, AUTH_CLEAR_TOKEN } from '../types'

const STORAGE_KEY = 'auth-token'

export const checkAuth = () => {
  return (dispatch) => {
    const token = localStorage.getItem('token')
    return token
      ? dispatch({
          type: AUTH_SET_TOKEN,
          token,
        })
      : dispatch({
          type: AUTH_CLEAR_TOKEN,
        })
  }
}

export const login = (formData) => {
  return (dispatch, getState, { api, params }) => {
    return api
      .post('/login', {
        ...params,
        ...formData,
      })
      .then(({ data }) => {
        const token = data.access_token

        api.defaults.headers.common.Authorization = `Bearer ${token}`

        localStorage.setItem(STORAGE_KEY, token)

        return dispatch({
          type: AUTH_SET_TOKEN,
          token,
        })
      })
  }
}

export const logout = (send = true) => {
  return (dispatch, getState, { api }) => {
    if (send) {
      api.get('/user/logout')
    }

    delete api.defaults.headers.common.Authorization

    localStorage.removeItem(STORAGE_KEY)

    return dispatch({
      type: AUTH_CLEAR_TOKEN,
    })
  }
}
