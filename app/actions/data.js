import { SET_TOTAL_BALANCE, SET_YEAR_TOTAL, SET_CURRENT_MONTH_TOTAL } from './../constants'
import {
  fetchYearTotal,
  sendNewTransaction
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
        console.log('GET YEAR TOTAL REESPONSE - ' + response.data.data[8].expenses)
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

export function addNewTransaction(transaction) {
  return function(dispatch) {
    return checkAuth()
      .then((token) => sendNewTransaction(token, transaction))
      .then((response) => {
        console.log(response.data.message)
        let currentYear = new Date().getFullYear()
        dispatch(getYearTotal(currentYear))
      })
      .catch((err) => {
        console.log(err)
      })
  }
}
