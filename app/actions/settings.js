import { SET_CURRENCY_SYMBOL } from '../constants'
import { saveCurrancySymbolToLocalDB, fetchCurrencySymbol } from '../api/data'

export function setCurrencySymbol(symbol) {
  return {
    type: SET_CURRENCY_SYMBOL,
    symbol
  }
}

export function saveCurrancySymbol(symbol) {
  return function(dispatch) {
    return saveCurrancySymbolToLocalDB(symbol)
      .then(dispatch(setCurrencySymbol(symbol)))
      .catch((err) => console.log(err))
  }
}

export function getCurrencySymbol() {
  return function(dispatch) {
    return fetchCurrencySymbol()
      .then((res) => {
        if (res) dispatch(setCurrencySymbol(res[0].symbol))
      })
      .catch((err) => console.log(err))
  }
}
