import { SET_TOTAL_BALANCE, SET_YEAR_TOTAL, SET_CURRENT_MONTH_TOTAL } from './../constants'
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

function setCurrentMonthTotal(data) {
  if (data.length > 0) {
    const currentMonth = new Date().getMonth()
    return {
      type: SET_CURRENT_MONTH_TOTAL,
      data: data[currentMonth]
    }
  }
}

export function getYearTotal(year) {
  return function(dispatch) {
    return checkAuth()
      .then((token) => fetchYearTotal(token, year))
      .then((response) => {
        dispatch(setYearTotal(response.data.data))
        dispatch(setCurrentMonthTotal(response.data.data))
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

export function addNewTransaction(say) {
  console.log('Add New Transaction say ' + say)
}
