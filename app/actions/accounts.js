import { REMOVE_CURRENT_USER, SET_TOKEN, SET_AUTH_ERROR } from './../constants'
import { getCurrencySymbol } from './settings'
import {
  currentUser,
  signin,
  signup,
  setAuth,
  revokeAuth
} from './../api/accounts'

import {
  getTransactions,
  getYearTotal,
  getCategories,
  getFavoriteTransactions,
  setCurrentMonth
} from './data'

function loadingActions(dispatch, token) {
  let currentYear = new Date().getFullYear()
  dispatch(setCurrentMonth())
  dispatch(setToken(token))
  dispatch(getTransactions(currentYear, token))
  dispatch(getYearTotal(currentYear, token))
  dispatch(getCategories(token))
  dispatch(getFavoriteTransactions())
  dispatch(getCurrencySymbol())
}

function removeCurrentUser () {
  return {
    type: REMOVE_CURRENT_USER
  }
}

function setToken(token, isAuthed = true) {
  return {
    type: SET_TOKEN,
    token,
    isAuthed
  }
}

function setAuthError(message) {
  return {
    type: SET_AUTH_ERROR,
    message
  }
}

export function checkIfAuthed() {
  console.log('CHECK IF AUTHED ----')
  return function(dispatch, getState) {
    const state = getState()
    console.log(state)
  }
}

// export function fetchIfCurrentUser() {
//   return function(dispatch) {
//     return checkAuth()
//       .then((token) => currentUser(token))
//       .then(response => {
//         if (response.data) dispatch(setCurrentUser(response.data))
//         else dispatch(setCurrentUser({}, false))
//       })
//       .catch((err) => console.warn(err))
//   }
// }

export function signinAndAuthUser (credentials) {
  return function (dispatch) {
    return signin(credentials)
      .then((res) => {
        if (res.data.message) {
          dispatch(setAuthError(res.data.message))
        } else {
          const token = res.data.token
          loadingActions(dispatch, token)
        }
      })
      .catch((err) => console.warn(err))
  }
}

// export function signinAndAuthUser (credentials) {
//   return function (dispatch, getState) {
//     return signin(credentials)
//       .then((res) => setAuth(res))
//       .then((user) => {
//         if (user.authError) {
//           Actions.pop()
//           dispatch(setCurrentUser(user, false))
//           return getState().account.user.authError
//         } else {
//           dispatch(setCurrentUser(user.data))
//         }
//       })
//       .catch((err) => console.warn(err))
//   }
// }

export function signupAndAuthUser (credentials) {
  return function (dispatch, getState) {
    return signup(credentials)
      .then((res) => setAuth(res))
      .then((data) => {
        dispatch(setCurrentUser(data))
      })
      .catch((err) => {
        dispatch(setCurrentUser(err.response.data, false))
        return getState().account.user.error
        console.log(err)
      })
  }
}

export function logoutAndUnauthUser () {
  return function (dispatch) {
    dispatch(setToken('', false))
  }
}
