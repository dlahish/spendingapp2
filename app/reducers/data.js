import {
  SET_YEAR_TOTAL,
  SET_CURRENT_MONTH_TOTAL,
  REMOVE_CURRENT_USER,
  SET_CURRENT_MONTH,
  SET_CATEGORIES
} from '../constants'

const initialState = {
  currentMonthTotal: {
    expenses: 0,
    income: 0
  },
  yearTotal: [],
  categories: []
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
    default:
      return state
  }
}
