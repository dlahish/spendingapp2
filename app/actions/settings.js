import { SET_CURRENCY_SYMBOL, SET_CUSTOM_FAVORITES } from '../constants'

export function setCurrancySymbol(symbol) {
  return {
    type: SET_CURRENCY_SYMBOL,
    symbol
  }
}

export function setCustomFavorites() {
  return {
    type: SET_CUSTOM_FAVORITES
  }
}
