import { SET_NEW_REMINDER } from '../constants'
import {REHYDRATE} from 'redux-persist/constants'
const initialState = {
  reminders: []
}

export default function accounts (state = initialState, action) {
  switch (action.type) {
    case SET_NEW_REMINDER:
      let nextReminders = state.reminders.concat(action.reminder)
      return { ...state, reminders: nextReminders }
    case REHYDRATE:
      var incoming = action.payload.myReducer
      if (incoming) return {...state, ...incoming, specialKey: processSpecial(incoming.specialKey)}
      return state
    default:
      return state
  }
}
