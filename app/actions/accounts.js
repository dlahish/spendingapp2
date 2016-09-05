import { SET_CURRENT_USER } from './../constants'
import {
  checkAuth,
  currentUser
} from './../api/accounts'

function setCurrentUser (user, isAuthed = true) {
  return {
    type: SET_CURRENT_USER,
    user,
    isAuthed,
  }
}

export function fetchIfCurrentUser() {
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
