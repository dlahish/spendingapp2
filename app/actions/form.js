import { SET_NEW_CATEGORY, CLEAR_FORM, SET_CATEGORY_TYPE } from '../constants'

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

export function setCategoryType(categoryType) {
  console.log('lalalalalalalaal')
  return {
    type: SET_CATEGORY_TYPE,
    categoryType
  }
}
