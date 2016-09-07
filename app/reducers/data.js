import { SET_TOTAL_BALANCE } from '../constants'

const initialState = {
  totalExpense: 0,
  totalIncome: 0
}

export default function accounts (state = initialState, action) {
  switch (action.type) {
    case SET_TOTAL_BALANCE:
      return { ...state, totalIncome: action.data.totalIncome, totalExpense: action.data.totalExpense }
    default:
      return state
  }
}
