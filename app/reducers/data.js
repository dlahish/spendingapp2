import { REHYDRATE } from 'redux-persist/constants'
import {
  SET_YEAR_TOTAL,
  SET_CURRENT_MONTH_TOTAL,
  REMOVE_CURRENT_USER,
  SET_CURRENT_MONTH,
  SET_CATEGORIES,
  SET_YEAR_TRANSACTIONS,
  SET_FAVORITE_TRANSACTIONS,
  SET_VISIBLE_TRANSACTIONS
} from '../constants'

const initialState = {
  currentMonthTotal: {},
  yearTotal: [],
  categories: [],
  transactions: {},
  currentMonthName: '',
  currentMonthIndex: null,
  favoriteTransactions: [],
  visibleTransactions: []
}

export default function accounts (state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_MONTH_TOTAL:
      return { ...state, currentMonthTotal: action.data }
    case SET_YEAR_TOTAL:
      return { ...state, yearTotal: action.data }
    case REMOVE_CURRENT_USER:
      return initialState
    case SET_CURRENT_MONTH:
      return { ...state,
        currentMonthName: action.currentMonthName,
        currentMonthIndex: action.currentMonthIndex}
    case SET_CATEGORIES:
      return { ...state, categories: action.categories }
    case SET_YEAR_TRANSACTIONS:
      const nextTransactions = { ...state.transactions, [action.year]: action.data }
      return { ...state, transactions: nextTransactions }
    case SET_FAVORITE_TRANSACTIONS:
      return { ...state, favoriteTransactions: action.transactions }
    case SET_VISIBLE_TRANSACTIONS:
      return { ...state, visibleTransactions: action.transactions }
    case REHYDRATE:
      var incoming = action.payload.myReducer
      if (incoming) return {...state, ...incoming, specialKey: processSpecial(incoming.specialKey)}
      return state
    default:
      return state
  }
}
