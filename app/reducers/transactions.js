import { REHYDRATE } from 'redux-persist/constants'
import {
  SAVE_NEW_TRANSACTION,
  DELETE_TRANSACTION
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
        if (transaction.id === action.transaction.id) {
          nextTransactions = [...state.transactions.slice(0, i), ...state.transactions.slice(i + 1)]
        } else {
          return true
        }
      })
      return { ...state, transactions: nextTransactions }
    case REHYDRATE:
      var incoming = action.payload.myReducer
      if (incoming) return {...state, ...incoming, specialKey: processSpecial(incoming.specialKey)}
      return state
    default:
      return state
  }
}
