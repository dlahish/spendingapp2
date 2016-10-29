import { REHYDRATE } from 'redux-persist/constants'
import {
  SET_NEW_TRANSACTION
} from '../constants'

const initialState = {
  idIndex: 0,
  transactions: []
}

export default function transactions (state = initialState, action) {
  switch (action.type) {
    case SET_NEW_TRANSACTION:
      let transaction = action.transaction
      console.log('reducer, transaction', transaction)
      transaction.id = state.idIndex
      console.log('add id', transaction)
      let nextTransactions = state.transactions.concat(transaction)
      console.log('nextTransactions', nextTransactions)
      return { ...state, transactions: nextTransactions, idIndex: state.idIndex + 1 }
      // return initialState
    case REHYDRATE:
      var incoming = action.payload.myReducer
      if (incoming) return {...state, ...incoming, specialKey: processSpecial(incoming.specialKey) }
      return state
    default:
      return state
  }
}
