import { SET_CURRENCY_SYMBOL } from '../constants'

export function setCurrencySymbol(symbol) {
  return {
    type: SET_CURRENCY_SYMBOL,
    symbol
  }
}
