import {
  SET_TOTAL_BALANCE,
  SET_YEAR_TOTAL,
  SET_CURRENT_MONTH_TOTAL,
  SET_CURRENT_MONTH,
  SET_CATEGORIES,
  SET_YEAR_TRANSACTIONS,
  SET_FAVORITE_TRANSACTION,
  DELETE_FAVORITE_TRANSACTION,
  SET_VISIBLE_TRANSACTIONS,
  SAVE_CATEGORY_ICON,
  DELETE_CATEGORY_ICON
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
  deleteFavoriteTransaction,
  sendUpdateTransaction
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
    return {
      type: SET_CURRENT_MONTH_TOTAL,
      data: data[currentMonthIndex]
    }
  }
}

export function saveCategoryIcon(category) {
  console.log('save category icon', category.iconName)
  return {
    type: SAVE_CATEGORY_ICON,
    iconName: category.iconName,
    name: category.name
  }
}

export function setMonth(type, currentMonthIndex, yearTotal, transactions) {
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

function deleteCategoryIcon(category) {
  return {
    type: DELETE_CATEGORY_ICON,
    category
  }
}

function setFavoriteTransaction(transaction, favoriteTransactionsId) {
  transaction.id = favoriteTransactionsId
  return {
    type: SET_FAVORITE_TRANSACTION,
    transaction
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

export function updateTransaction(transaction, currentMonthIndex) {
  return function(dispatch, getState) {
    const state = getState()
    const currentMonthIndex = state.data.currentMonthIndex,
          token = state.account.token
    sendUpdateTransaction(transaction, token)
      .then((res) => {
        let currentYear = new Date().getFullYear()
        dispatch(getTransactions(currentYear, token, currentMonthIndex))
        dispatch(getYearTotal(currentYear, token))
      })
      .catch((err) => console.log(err))
  }
}

export function getVisibleTransactions(transactions, currentMonthIndex) {
  return function(dispatch) {
    let visibleTransactions = []
    if (transactions) {
      const filteredTransactions = transactions.filter((transaction) => {
        const transactionMonth = new Date(transaction.date).getMonth()
        return transactionMonth === currentMonthIndex
      })
      visibleTransactions = filteredTransactions.sort((a,b) => {
        a.date < b.date ? 1 : a.date > b.date ? -1 : 0
      })
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
  return {
    type: DELETE_FAVORITE_TRANSACTION,
    transaction
  }
}

export function addFavoriteTransaction(transaction) {
  return function(dispatch, getState) {
    const state = getState()
    favoriteTransactionsId = state.data.favoriteTransactions.length + 1
    dispatch(setFavoriteTransaction(transaction, favoriteTransactionsId))
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
        dispatch(deleteCategoryIcon(category))
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
        dispatch(saveCategoryIcon(category))
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
