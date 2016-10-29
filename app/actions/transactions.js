import {
  SET_NEW_TRANSACTION, SET_VISIBLE_TRANSACTIONS
} from './../constants'

// import { setVisibleTransactions } from './data'
export function setVisibleTransactions(transactions) {
  console.log('set visible transactions')
  return {
    type: SET_VISIBLE_TRANSACTIONS,
    transactions
  }
}

function setNewTransaction(transaction) {
  const transactionToReducer = {
    date: transaction.date,
    amount: parseInt(transaction.amount),
    type: transaction.type,
    notes: transaction.notes,
    category: transaction.category
  }
  return {
    type: SET_NEW_TRANSACTION,
    transaction: transactionToReducer
  }
}

export function getVisibleTransactions(transactions, currentMonthIndex) {
  console.log('get visible transactions -----')
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

export function addNewTransaction(transaction) {
  return function (dispatch, getState) {
    // const state = getState()
    // const transactions = state.transactions.transactions,
    //       currentMonthIndex = state.data.currentMonthIndex
    // transactions.push(transaction)
    dispatch(setNewTransaction(transaction))
    // dispatch(getVisibleTransactions(transactions, currentMonthIndex))
  }

}
