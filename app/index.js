import React from 'react'
import Routes from './config/routes'
import store from './config/store'
import  { Provider } from 'react-redux'
import configureStore from './config/configureStore'
// const store = configureStore()

export default function App() {
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  )
}
