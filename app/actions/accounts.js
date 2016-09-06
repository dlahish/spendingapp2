import { SET_CURRENT_USER, REMOVE_CURRENT_USER } from './../constants'
import {
  checkAuth,
  currentUser,
  signin,
  signup,
  setAuth,
  revokeAuth
} from './../api/accounts'

function setCurrentUser (user, isAuthed = true) {
  return {
    type: SET_CURRENT_USER,
    user,
    isAuthed,
  }
}

function removeCurrentUser () {
  return {
    type: REMOVE_CURRENT_USER
  }
}

export function fetchIfCurrentUser() {
  console.log('fetchIfCurrentUser ----')
  return function(dispatch) {
    return checkAuth()
      .then((token) => currentUser(token))
      .then(response => {
        if (response.data) dispatch(setCurrentUser(response.data))
        else dispatch(setCurrentUser({}, false))
      })
      .catch((err) => console.warn(err))
  }
}

export function signinAndAuthUser (credentials) {
  return function (dispatch, getState) {
    return signin(credentials)
      .then((res) => setAuth(res))
      .then((user) => {
        if (user.authError) {
          console.log('SET AUTH RESPONSE ---' + user)
          dispatch(setCurrentUser(user, false))
          return getState().account.user.authError
        } else {
          dispatch(setCurrentUser(user))
        }
      })
      .catch((err) => console.warn(err))
  }
}

export function signupAndAuthUser (credentials) {
  return function (dispatch) {
    return signup(credentials)
      .then((res) => {
        console.log('SIGN UP RESPOSE -- ' + res.data)
        setAuth(res)})
      .then((token) => {
        console.log('SET AUTH RESPONSE ---' + token)
        dispatch(setCurrentUser(user))
      })
      .catch((err) => {
        dispatch(setCurrentUser({}, false))
        console.log(err)
      })
  }
}

export function logoutAndUnauthUser () {
  return function (dispatch) {
    return revokeAuth()
      .then(() => dispatch(removeCurrentUser()))
  }
}
