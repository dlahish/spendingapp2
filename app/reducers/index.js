import { combineReducers } from 'redux'
import account from './account'
import routes from './routes'
import data from './data'
import form from './form'
import settings from './settings'
import storage from './storage'
import reminders from './reminders'

export default combineReducers({
  account,
  routes,
  data,
  form,
  storage,
  settings,
  reminders
})
