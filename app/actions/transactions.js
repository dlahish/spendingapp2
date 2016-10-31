import {
  SAVE_NEW_TRANSACTION,
  DELETE_TRANSACTION
} from './../constants'

import {
  setVisibleTransactions,
  getVisibleTransactions
} from './data'

function saveNewTransaction(transaction) {
  let transactionToReducer = {
    date: new Date(transaction.date).toISOString(),
    amount: parseInt(transaction.amount),
    category: transaction.category,
    notes: transaction.notes,
    type: transaction.type
  }
  return {
    type: SAVE_NEW_TRANSACTION,
    transaction: transactionToReducer
  }
}

function deleteTransaction(transaction) {
  return {
    type: DELETE_TRANSACTION,
    transaction
  }
}

export function addNewTransaction(transaction) {
  return function(dispatch, getState) {
    const state = getState()
    dispatch(saveNewTransaction(transaction))
    // dispatch(getVisibleTransactions(state.transactions.transactions, state.data.currentMonthIndex))
  }
}

export function removeTransaction(transaction) {
  return function(dispatch, getState) {
    const state = getState()
    dispatch(deleteTransaction(transaction))
    // dispatch(setVisibleTransactions(state.transactions.transactions))
  }
}
