import { AUTH_SET_TOKEN, AUTH_CLEAR_TOKEN } from '../types'

const AUTH_STORAGE_KEY = 'auth-token'

export const checkAuth = () => {
  return (dispatch, getState, { api }) => {
    const token = localStorage.getItem(AUTH_STORAGE_KEY)
    if (token) {
      api.defaults.headers.common.Authorization = `Bearer ${token}`
    }
    dispatch(
      token
        ? {
            type: AUTH_SET_TOKEN,
            token,
          }
        : { type: AUTH_CLEAR_TOKEN }
    )
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

        localStorage.setItem(AUTH_STORAGE_KEY, token)

        dispatch({
          type: AUTH_SET_TOKEN,
          token,
        })
        return { success: true }
      })
      .catch((e) => {
        return { errors: e.response.data.errors }
      })
  }
}

export const logout = (send = true) => {
  return (dispatch, getState, { api }) => {
    if (send) {
      api.get('/user/logout')
    }

    delete api.defaults.headers.common.Authorization

    localStorage.removeItem(AUTH_STORAGE_KEY)

    return dispatch({
      type: AUTH_CLEAR_TOKEN,
    })
  }
}
