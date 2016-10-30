import { REHYDRATE } from 'redux-persist/constants'
import {
  SAVE_NEW_TRANSACTION,
  DELETE_TRANSACTION,
  SET_FETCHED_TRANSACTIONS
} from '../constants'

const initialState = {
  idIndex: 0,
  transactions: []
}

export default function transactions (state = initialState, action) {
  switch (action.type) {
    case SAVE_NEW_TRANSACTION:
      let transaction = action.transaction
      transaction.id = state.idIndex
      return { ...state, transactions: state.transactions.concat(transaction), idIndex: state.idIndex + 1 }
    case DELETE_TRANSACTION:
      let nextTransactions = []
      state.transactions.every((transaction, i) => {
          console.log('transaction.id', transaction.id);
          console.log('transaction._id', transaction._id);
          if (transaction.id === undefined) {
              console.log('id null or undefined');
              if (transaction._id === action.transaction._id) {
                nextTransactions = [...state.transactions.slice(0, i), ...state.transactions.slice(i + 1)]
                return false
              } else {
                return true
              }
          } else {
              console.log('id exists');
              if (transaction.id === action.transaction.id) {
                nextTransactions = [...state.transactions.slice(0, i), ...state.transactions.slice(i + 1)]
                return false
              } else {
                return true
              }
          }

      })
      return { ...state, transactions: nextTransactions }
    case SET_FETCHED_TRANSACTIONS:
      return { ...state, transactions: action.transactions }
    case REHYDRATE:
      var incoming = action.payload.myReducer
      if (incoming) return {...state, ...incoming, specialKey: processSpecial(incoming.specialKey)}
      return state
    default:
      return state
  }
}
