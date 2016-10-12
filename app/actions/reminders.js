import { SET_NEW_REMINDER } from './../constants'

export function setNewReminder(reminder) {
  return {
    type: SET_NEW_REMINDER,
    reminder
  }
}
