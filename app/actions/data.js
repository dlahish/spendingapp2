import DB from '../config/localDB'
import {
  SET_TOTAL_BALANCE,
  SET_YEAR_TOTAL,
  SET_CURRENT_MONTH_TOTAL,
  SET_CURRENT_MONTH,
  SET_CATEGORIES,
  SET_YEAR_TRANSACTIONS,
  SET_FAVORITE_TRANSACTIONS,
  SET_VISIBLE_TRANSACTIONS
} from './../constants'
import {
  fetchYearTotal,
  saveNewTransaction,
  saveNewCategory,
  fetchCategories,
  fetchTransactions,
  deleteCategory,
  deleteTransaction,
  saveFavoriteTransaction,
  deleteFavoriteTransaction
} from '../api/data'

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

function setCurrentMonthTotal(data, currentMonthIndex) {
  if (data.length > 0) {
    // const currentMonth = new Date().getMonth()
    return {
      type: SET_CURRENT_MONTH_TOTAL,
      data: data[currentMonthIndex]
    }
  }
}

export function setMonth(type, currentMonthIndex, yearTotal, transactions) {
  console.log('SET MONTH --------')
  return function(dispatch) {
    if (type === 'next' && currentMonthIndex === 11) { return }
    if (type === 'previous' && currentMonthIndex === 0) { return }
    if (type === 'next' && currentMonthIndex < 11) {
      dispatch(setCurrentMonth(currentMonthIndex + 1))
      dispatch(setCurrentMonthTotal(yearTotal, currentMonthIndex + 1))
      dispatch(getVisibleTransactions(transactions, currentMonthIndex + 1))
    } else if (currentMonthIndex > 0) {
      dispatch(setCurrentMonth(currentMonthIndex - 1))
      dispatch(setCurrentMonthTotal(yearTotal, currentMonthIndex - 1))
      dispatch(getVisibleTransactions(transactions, currentMonthIndex - 1))
    }
  }
}

function setCategories(categories) {
  return {
    type: SET_CATEGORIES,
    categories
  }
}

function setYearlyTransactions(response, year) {
  return {
    type: SET_YEAR_TRANSACTIONS,
    data: response.data.data,
    year
  }
}

function setFavoriteTransactions(transactions) {
  return {
    type: SET_FAVORITE_TRANSACTIONS,
    transactions
  }
}

function setVisibleTransactions(transactions) {
  return {
    type: SET_VISIBLE_TRANSACTIONS,
    transactions
  }
}

function getToken(state) {
  return state.account.token
}

export function getVisibleTransactions(transactions, currentMonthIndex) {
  return function(dispatch) {
    monthFilter = (transaction) => {
      const transactionMonth = new Date(transaction.date).getMonth()
      return transactionMonth === currentMonthIndex
    }
    sortDownDate = (a, b) => a.date > b.date ? 1 : a.date < b.date ? -1 : 0
    sortUpDate = (a, b) => a.date < b.date ? 1 : a.date > b.date ? -1 : 0
    let visibleTransactions
    if (transactions === undefined) {
      visibleTransactions = []
    } else {
      const filteredTransactions = transactions.filter(monthFilter)
      visibleTransactions = filteredTransactions.sort((a,b) => sortUpDate(a,b))
    }
    dispatch((setVisibleTransactions(visibleTransactions)))
  }
}

export function addNewFavoriteTransaction(favTransaction) {
  return function(dispatch) {
    const date = new Date()
    favTransaction = { ...favTransaction, date: date }
    dispatch(addNewTransaction(favTransaction))
  }
}

export function removeFavoriteTransaction(transaction) {
  return function(dispatch) {
    return deleteFavoriteTransaction(transaction)
      .then(() => dispatch(getFavoriteTransactions()))
      .catch((err) => console.log(err))
  }
}

export function getFavoriteTransactions() {
  return function(dispatch) {
    return DB.favoriteTransactions.find()
      .then(response => dispatch(setFavoriteTransactions(response)))
      .catch((err) => console.log(err))
  }
}

export function addFavoriteTransaction(transaction) {
  return function(dispatch) {
    return saveFavoriteTransaction(transaction)
      .then(() => {
        dispatch(getFavoriteTransactions())
      })
      .catch((err) => console.log(err))
  }
}

export function removeTransaction(transaction) {
  return function(dispatch, getState) {
    const state = getState()
    currentMonthIndex = state.data.currentMonthIndex
    const token = getToken(getState())
    deleteTransaction(token, transaction)
      .then((response) => {
        let currentYear = new Date().getFullYear()
        dispatch(getTransactions(currentYear, token, currentMonthIndex))
        dispatch(getYearTotal(currentYear, token))
      })
      .catch((err) => console.log(err))
  }
}

export function getTransactions(year, token, currentMonthIndex = new Date().getMonth()) {
  return function(dispatch) {
    fetchTransactions(token, year)
      .then((response) => {
        dispatch(setYearlyTransactions(response, year))
        dispatch(getVisibleTransactions(response.data.data, currentMonthIndex))
      })
      .catch((err) => console.log(err))

  }
}

export function removeCategory(category) {
  return function(dispatch, getState) {
    const token = getToken(getState())
    deleteCategory(token, category)
      .then((response) => {
        dispatch(getCategories(token))
      })
      .catch((err) => console.log(err))
  }
}

export function getYearTotal(year, token) {
  return function(dispatch, getState) {
    const state = getState()
    const currentMonthIndex = state.data.currentMonthIndex
    return fetchYearTotal(token, year)
      .then((response) => {
        dispatch(setYearTotal(response.data.data))
        dispatch(setCurrentMonthTotal(response.data.data, currentMonthIndex))
      })
      .catch((err) => {
        console.log(err)
        dispatch(setYearTotal([]))
      })
  }
}

export function getTotalBalance() {
  return function(dispatch, getState) {
    const token = getToken(getState())
    fetchTotalBalance(token)
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
  return function(dispatch, getState) {
    const token = getToken(getState())
    const state = getState()
    const currentMonthIndex = state.data.currentMonthIndex
    saveNewTransaction(token, transaction)
      .then((response) => {
        let currentYear = new Date().getFullYear()
        dispatch(getYearTotal(currentYear, token))
        dispatch(getTransactions('2016', token, currentMonthIndex))
      })
      .catch((err) => {
        console.log(err)
      })
  }
}

export function setCurrentMonth(monthIndex = new Date().getMonth()) {
  const monthNames = ["January", "February", "March", "April", "May", "June",
                      "July", "August", "September", "October", "November", "December"]
  return {
    type: SET_CURRENT_MONTH,
    currentMonthName: monthNames[monthIndex],
    currentMonthIndex: monthIndex
  }
}

export function addNewCategory(category) {
  return function(dispatch, getState) {
    const token = getToken(getState())
    saveNewCategory(token, category)
      .then((response) => {
        dispatch(getCategories(token))
      })
      .catch((err) => console.log(err))
  }
}

export function getCategories(token) {
  return function(dispatch) {
    fetchCategories(token)
      .then((response) => {
        dispatch(setCategories(response.data.categories))
      })
      .catch((err) => console.log(err))
  }
}
