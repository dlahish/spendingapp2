import { SET_CURRENCY_SYMBOL, SET_CUSTOM_FAVORITES, SET_FETCHED_TRANSACTIONS } from '../constants'
import { updateCollection } from '../api/data'

function updateSyncedTransactions(transactions) {
  return {
    type: SET_FETCHED_TRANSACTIONS,
    transactions
  }
}

export function syncData() {
  return function(dispatch, getState) {
    const state = getState()
    const token = state.account.token,
          data = state.transactions.transactions
    let dataToServer = []
    data.forEach((d) => {
      let tempData = {
        date: d.date,
        category: d.category,
        amount: d.amount,
        notes: d.notes,
        type: d.type
      }
      dataToServer.push(tempData)
    })
    updateCollection(dataToServer, token)
      .then((res) => {
        dispatch(updateSyncedTransactions(res.data.transactions))
      })
      .catch((err)=> console.log('error', err))
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
