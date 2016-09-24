import { combineReducers } from 'redux'
import account from './account'
import routes from './routes'
import data from './data'
import form from './form'
import settings from './settings'

export default combineReducers({
  account,
  routes,
  data,
  form,
  settings
})
