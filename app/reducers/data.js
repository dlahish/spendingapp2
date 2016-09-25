import {
  SET_YEAR_TOTAL,
  SET_CURRENT_MONTH_TOTAL,
  REMOVE_CURRENT_USER,
  SET_CURRENT_MONTH,
  SET_CATEGORIES,
  SET_YEAR_TRANSACTIONS,
  SET_NEW_FAV_TRANSACTION
} from '../constants'

const initialState = {
  currentMonthTotal: {},
  yearTotal: [],
  categories: [],
  transactions: {},
  currentMonth: '',
  favoriteTransactions: []
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
      return { ...state, currentMonth: action.currentMonth }
    case SET_CATEGORIES:
      return { ...state, categories: action.categories }
    case SET_YEAR_TRANSACTIONS:
      const nextTransactions = { ...state.transactions, [action.year]: action.data }
      return { ...state, transactions: nextTransactions }
    case SET_NEW_FAV_TRANSACTION:
      return { ...state, favoriteTransactions: state.favoriteTransactions.concat(action.transaction)}
    default:
      return state
  }
}
