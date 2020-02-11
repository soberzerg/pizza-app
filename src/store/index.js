import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { authReducer } from './reducers/auth'
import { api, params } from '../axios'
import { productsReducer } from './reducers/products'
import { orderReducer } from './reducers/order'

const rootReducer = combineReducers({
  auth: authReducer,
  products: productsReducer,
  order: orderReducer,
})

export default createStore(rootReducer, applyMiddleware(thunk.withExtraArgument({ api, params })))
