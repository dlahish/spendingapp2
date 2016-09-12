import { SET_NEW_CATEGORY } from '../constants'

export function setNewCategory(category) {
  console.log('set new category - ' + category)
  return {
    type: SET_NEW_CATEGORY,
    category
  }
}
