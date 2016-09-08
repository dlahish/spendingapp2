import { SET_TOTAL_BALANCE, SET_YEAR_TOTAL } from '../constants'

const initialState = {
  totalExpense: 0,
  totalIncome: 0,
  yearTotal: []
}

export default function accounts (state = initialState, action) {
  switch (action.type) {
    case SET_TOTAL_BALANCE:
      return { ...state, totalIncome: action.data.totalIncome, totalExpense: action.data.totalExpense }
    case SET_YEAR_TOTAL:
      return { ...state, yearTotal: action.data}
    default:
      return state
  }
}
