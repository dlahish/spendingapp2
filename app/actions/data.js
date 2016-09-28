import DB from '../config/localDB'
import {
  SET_TOTAL_BALANCE,
  SET_YEAR_TOTAL,
  SET_CURRENT_MONTH_TOTAL,
  SET_CURRENT_MONTH,
  SET_CATEGORIES,
  SET_YEAR_TRANSACTIONS,
  SET_FAVORITE_TRANSACTIONS
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

export function addNewFavoriteTransaction(favTransaction) {
  return function(dispatch) {
    const date = new Date()
    favTransaction = { ...favTransaction, date: date }
    console.log('add new favorite transaction ------')
    console.log(favTransaction)
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
  return function(dispatch) {
    return checkAuth()
      .then((token) => deleteTransaction(token, transaction))
      .then((response) => {
        let currentYear = new Date().getFullYear()
        dispatch(getTransactions(currentYear))
        dispatch(getYearTotal(currentYear))
      })
      .catch((err) => console.log(err))
  }
}

export function getTransactions(year) {
  return function(dispatch) {
    return checkAuth()
      .then((token) => fetchTransactions(token, year))
      .then((response) => dispatch(setYearlyTransactions(response, year)))
      .catch((err) => console.log(err))

  }
}

export function removeCategory(category) {
  return function(dispatch) {
    return checkAuth()
      .then((token) => deleteCategory(token, category))
      .then((response) => {
        dispatch(getCategories())
      })
      .catch((err) => console.log(err))
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

export function addNewTransaction(transaction) {
  console.log('ADD NEW TRANSACTION -------')
  return function(dispatch) {
    return checkAuth()
      .then((token) => saveNewTransaction(token, transaction))
      .then((response) => {
        let currentYear = new Date().getFullYear()
        dispatch(getYearTotal(currentYear))
        dispatch(getTransactions('2016'))
      })
      .catch((err) => {
        console.log(err)
      })
  }
}

export function setCurrentMonth() {
  const monthNames = ["January", "February", "March", "April", "May", "June",
                      "July", "August", "September", "October", "November", "December"];
  const d = new Date();
  return {
    type: SET_CURRENT_MONTH,
    currentMonth: monthNames[d.getMonth()]
  }
}

export function addNewCategory(category) {
  return function(dispatch) {
    return checkAuth()
      .then((token) => saveNewCategory(token, category))
      .then((response) => {
        dispatch(getCategories())
      })
      .catch((err) => console.log(err))
  }
}

export function getCategories() {
  return function(dispatch) {
    return checkAuth()
      .then((token) => fetchCategories(token))
      .then((response) => {
        dispatch(setCategories(response.data.categories))
      })
      .catch((err) => console.log(err))
  }
}
