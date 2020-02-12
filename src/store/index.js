import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { authReducer } from './reducers/auth'
import { api, params } from '../axios'
import { productsReducer } from './reducers/products'
import { profileReducer } from './reducers/profile'
import { ordersReducer } from './reducers/orders'
import { orderReducer } from './reducers/order'
import { alertReducer } from './reducers/alert'

const rootReducer = combineReducers({
  auth: authReducer,
  products: productsReducer,
  orders: ordersReducer,
  order: orderReducer,
  alert: alertReducer,
  profile: profileReducer,
})

export default createStore(rootReducer, applyMiddleware(thunk.withExtraArgument({ api, params })))
