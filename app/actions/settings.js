import { SET_CURRENCY_SYMBOL } from '../constants'

export function setCurrancySymbol(symbol) {
  return {
    type: SET_CURRENCY_SYMBOL,
    symbol
  }
}
