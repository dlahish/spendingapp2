import {
  SET_CURRENCY_SYMBOL
} from '../constants'

const initialState = {
  currencySymbol: 'default'
}

export default function settings (state = initialState, action) {
  switch (action.type) {
    case SET_CURRENCY_SYMBOL:
      return { ...state, currencySymbol: action.symbol }
    default:
      return state
  }
}
