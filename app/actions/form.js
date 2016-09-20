import { SET_NEW_CATEGORY, CLEAR_FORM } from '../constants'

export function setNewCategory(category) {
  return {
    type: SET_NEW_CATEGORY,
    category
  }
}

export function clearForm() {
  return {
    type: CLEAR_FORM
  }
}
