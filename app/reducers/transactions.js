import { REHYDRATE } from 'redux-persist/constants'
import {
  SAVE_NEW_TRANSACTION,
  DELETE_TRANSACTION,
  SET_FETCHED_TRANSACTIONS,
  FORCED_NEW_PROPS,
  UPDATE_TRANSACTION
} from '../constants'

const initialState = {
  idIndex: 0,
  transactions: [],
  synced: false,
  forcedNewProps: false
}

export default function transactions (state = initialState, action) {
  switch (action.type) {
    case SAVE_NEW_TRANSACTION:
      let transaction = action.transaction
      transaction.id = state.idIndex
      return { ...state,
        transactions: state.transactions.concat(transaction),
        idIndex: state.idIndex + 1,
        synced: false }
    case DELETE_TRANSACTION:
      let nextTransactions = []
      state.transactions.every((transaction, i) => {
          if (transaction.id === undefined) {
              if (transaction._id === action.transaction._id) {
                nextTransactions = [...state.transactions.slice(0, i), ...state.transactions.slice(i + 1)]
                return false
              } else { return true }
          } else {
              if (transaction.id === action.transaction.id) {
                nextTransactions = [...state.transactions.slice(0, i), ...state.transactions.slice(i + 1)]
                return false
              } else { return true }
          }
      })
      return { ...state, transactions: nextTransactions, synced: false }
    case SET_FETCHED_TRANSACTIONS:
      return { ...state, transactions: action.transactions, idIndex: 0, synced: true }
    case UPDATE_TRANSACTION:
      nextTransactions = state.transactions.map((transaction) => {
        if (!!transaction.id === false) {
          if (transaction._id === action.transaction._id) return action.transaction
          else return transaction
        } else {
          if (transaction.id === action.transaction.id) return action.transaction
          else return transaction
        }
      })
      return { ...state, transactions: nextTransactions, forcedNewProps: !state.forcedNewProps }
    case FORCED_NEW_PROPS:
      return { ...state, forcedNewProps: !state.forcedNewProps }
    case REHYDRATE:
      var incoming = action.payload.myReducer
      if (incoming) return {...state, ...incoming, specialKey: processSpecial(incoming.specialKey)}
      return state
    default:
      return state
  }
}
