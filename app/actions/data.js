import { SET_TOTAL_BALANCE } from './../constants'
import {
  fetchTotalBalance
} from '../api/data'
import {
  checkAuth
} from './accounts'

function setTotalBalance(data) {
  return {
    type: SET_TOTAL_BALANCE,
    data
  }
}

export function getTotalBalance() {
  return function(dispatch) {
    return checkAuth()
      .then((token) => fetchTotalBalance(token))
      .then((response) => {
        dispatch(setTotalBalance(response))
      })
      .catch((err) => {
        dispatch(setTotalBalance({}))
        console.log(err)
      })
  }
}
