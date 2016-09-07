import { combineReducers } from 'redux'
import account from './account'
import routes from './routes'
import data from './data'

export default combineReducers({
  account,
  routes,
  data
})
