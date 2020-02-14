import React from 'react'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
import { shallow, mount, render } from 'enzyme'

import { Card, Input } from '@material-ui/core'
import { PRODUCTS } from '../src/store/types'
import Catalog from '../src/views/Catalog'
import { api, params } from '../src/axios'
import { ShoppingCart } from '@material-ui/icons'
import { BrowserRouter } from 'react-router-dom'

const mockStore = configureMockStore([thunk.withExtraArgument({ api, params })])

describe('<Catalog /> with empty cart', () => {
  const initialState = {
    products: {
      status: PRODUCTS.STATUS_OK,
      data: [
        { id: 1, name: 'Pizza 1', image: 'image' },
        { id: 2, name: 'Pizza 2', image: 'image' },
        { id: 3, name: 'Pizza 3', image: 'image' },
        { id: 4, name: 'Pizza 4', image: 'image' },
        { id: 5, name: 'Pizza 5', image: 'image' },
        { id: 6, name: 'Pizza 6', image: 'image' },
        { id: 7, name: 'Pizza 7', image: 'image' },
        { id: 8, name: 'Pizza 8', image: 'image' },
        { id: 9, name: 'Pizza 9', image: 'image' },
      ],
    },
    order: {
      cart: [],
    },
  }
  let store, wrapper

  beforeEach(() => {
    store = mockStore(initialState)
    wrapper = mount(
      <Provider store={store}>
        <Catalog />
      </Provider>
    )
  })

  it('should render 9 <Card /> components', () => {
    expect(wrapper.find(Card)).toHaveLength(9)
  })

  it('should render no <Button /> linked to cart', () => {
    expect(wrapper.find(ShoppingCart)).toHaveLength(0)
  })
})

describe('<Catalog /> with items in a cart', () => {
  const initialState = {
    products: {
      status: PRODUCTS.STATUS_OK,
      data: [
        { id: 1, name: 'Pizza 1', image: 'image' },
        { id: 2, name: 'Pizza 2', image: 'image' },
        { id: 3, name: 'Pizza 3', image: 'image' },
        { id: 4, name: 'Pizza 4', image: 'image' },
        { id: 5, name: 'Pizza 5', image: 'image' },
        { id: 6, name: 'Pizza 6', image: 'image' },
        { id: 7, name: 'Pizza 7', image: 'image' },
        { id: 8, name: 'Pizza 8', image: 'image' },
        { id: 9, name: 'Pizza 9', image: 'image' },
      ],
    },
    order: {
      cart: [
        { id: 1, quantity: 2 },
        { id: 5, quantity: 10 },
      ],
    },
  }
  let store, wrapper

  beforeEach(() => {
    store = mockStore(initialState)
    wrapper = mount(
      <Provider store={store}>
        <BrowserRouter>
          <Catalog />
        </BrowserRouter>
      </Provider>
    )
  })

  it('should render 9 <Card /> components', () => {
    expect(wrapper.find(Card)).toHaveLength(9)
  })

  it('should render 2 <Button /> linked to cart', () => {
    expect(wrapper.find(ShoppingCart)).toHaveLength(2)
  })

  it('should render <Input /> for pizza id=1 with quantity=2', () => {
    expect(
      wrapper
        .find(Input)
        .first()
        .prop('value')
    ).toEqual(2)
  })

  it('should render <Input /> for pizza id=5 with quantity=10', () => {
    expect(
      wrapper
        .find(Input)
        .last()
        .prop('value')
    ).toEqual(10)
  })
})
