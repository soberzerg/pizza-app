import { ALERT_NEW_MESSAGE, ALERT_HIDE } from '../types'

export const showAlert = (message) => ({
  type: ALERT_NEW_MESSAGE,
  message,
})

export const hideAlert = () => ({
  type: ALERT_HIDE,
})
