import { SET_TOKEN, SET_AUTH_ERROR, REMOVE_CURRENT_USER } from '../constants'
import {REHYDRATE} from 'redux-persist/constants'
const initialState = {
  user: {},
  authError: '',
  isAuthed: undefined
}

export default function accounts (state = initialState, action) {
  switch (action.type) {
    case SET_TOKEN:
      return {
        ...state,
        token: action.token,
        isAuthed: action.isAuthed
      }
    case SET_AUTH_ERROR:
      return {
        ...state,
        authError: action.message,
        isAuthed: false
      }
    default:
      return state
  }
}
