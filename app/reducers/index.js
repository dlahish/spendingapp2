import { combineReducers } from 'redux'
// import { reducer as formReducer } from 'redux-form'
import account from './account'
import routes from './routes'
import data from './data'
import form from './form'

export default combineReducers({
  account,
  routes,
  data,
  form
  // form: formReducer
})
