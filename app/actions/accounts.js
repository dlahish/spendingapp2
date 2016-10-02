import { REMOVE_CURRENT_USER, SET_TOKEN, SET_AUTH_ERROR } from './../constants'
import { purgeStoredState } from 'redux-persist'
import { AsyncStorage } from 'react-native'
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

export function setAuthError(message) {
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

export function signinAndAuthUser (credentials) {
  return function (dispatch) {
    return signin(credentials)
      .then((res) => {
        if (res.data.message) {
          dispatch(setAuthError(res.data.message))
        } else {
          console.log('SIGN IN AND AUTH USER ----')
          console.log(res.data.token)
          loadingActions(dispatch, res.data.token)
        }
      })
      .catch((err) => console.warn(err))
  }
}

export function signupAndAuthUser (credentials) {
  return function (dispatch) {
    return signup(credentials)
      .then((res) => {
        console.log('SIGN UP AND AUTH USER -------')
        console.log(res.data)
        if (res.data.message) {
          dispatch(setAuthError(res.data.message))
        } else {
          loadingActions(dispatch, res.data.token)
        }
      })
      .catch((err) => {
        dispatch(setAuthError(err.response.data.error))
        console.log(err)
      })
  }
}

export function logoutAndUnauthUser () {
  return function (dispatch) {
    dispatch(setToken('', false))
    purgeStoredState({storage: AsyncStorage}).then(() => {
      console.log('purge of someReducer completed')
    }).catch(() => {
      console.log('purge of someReducer failed')
    })
  }
}
