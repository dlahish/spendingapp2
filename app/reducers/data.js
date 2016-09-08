import { SET_YEAR_TOTAL, SET_CURRENT_MONTH_TOTAL } from '../constants'

const initialState = {
  currentMonthTotal: {},
  yearTotal: []
}

export default function accounts (state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_MONTH_TOTAL:
      return { ...state, currentMonthTotal: action.data }
    case SET_YEAR_TOTAL:
      return { ...state, yearTotal: action.data}
    default:
      return state
  }
}
