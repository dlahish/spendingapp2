import { SET_TOTAL_BALANCE, SET_YEAR_TOTAL } from './../constants'
import {
  fetchYearTotal
} from '../api/data'
import {
  checkAuth
} from '../api/accounts'

function setTotalBalance(data) {
  return {
    type: SET_TOTAL_BALANCE,
    data
  }
}

function setYearTotal(data) {
  return {
    type: SET_YEAR_TOTAL,
    data
  }
}

export function getYearTotal(year) {
  console.log('GET YEAR TOTAL -----')
  return function(dispatch) {
    return checkAuth()
      .then((token) => fetchYearTotal(token, year))
      .then((response) => {
        console.log('RESPONSE RESPONSE FROM FETCH YEAR TOTAL')
        console.log(response)
        dispatch(setYearTotal(response.data.data))
      })
      .catch((err) => {
        console.log(err)
        dispatch(setYearTotal([]))
      })
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
