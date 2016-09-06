import { combineReducers } from 'redux'
import account from './account'
import routes from './routes'

export default combineReducers({
  account,
  routes
})
