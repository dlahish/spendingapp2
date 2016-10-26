import { SET_CURRENCY_SYMBOL, SET_CUSTOM_FAVORITES } from '../constants'
import { postCsv } from '../api/data'

export function createCsv() {
  return function(dispatch, getState) {
    const state = getState()
    const token = state.account.token,
          data = state.data.visibleTransactions,
          dataToFile = []
    console.log('create csv action ----')
    console.log('visibleTransactions', data)
    for (var i=0; i < data.length; i++) {
      dataToFile.push({
         date: data[i].date,
         category: data[i].category,
         amount: data[i].amount,
         notes: data[i].notes,
         type: data[i].type
      })
    }
    console.log('dataToFile', dataToFile)
    postCsv(dataToFile, token)
      .then((res) => {
        console.log('response', res)
      })
      .catch((err) => {
        console.log('error', err)
      })
  }
}

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
