import { SAVE_CATEGORY_ICON, SET_CATEGORIES, DELETE_CATEGORY_ICON } from './../constants'
import {
  saveNewCategory,
  fetchCategories,
  deleteCategory
} from '../api/data'

function getToken(state) {
  return state.account.token
}

function setCategories(categories) {
  return {
    type: SET_CATEGORIES,
    categories
  }
}

export function deleteCategoryIcon(category) {
  return {
    type: DELETE_CATEGORY_ICON,
    category
  }
}

export function saveCategoryIcon(category) {
  return {
    type: SAVE_CATEGORY_ICON,
    iconName: category.iconName,
    name: category.name
  }
}

export function addNewCategory(category) {
  return function(dispatch, getState) {
    const token = getToken(getState())
    saveNewCategory(token, category)
      .then((response) => {
        dispatch(saveCategoryIcon(category))
        dispatch(getCategories(token))
      })
      .catch((err) => console.log(err))
  }
}

export function getCategories(token) {
  return function(dispatch, getState) {
    const token = getToken(getState())
    fetchCategories(token)
      .then((response) => {
        dispatch(setCategories(response.data.categories))
      })
      .catch((err) => console.log(err))
  }
}

export function removeCategory(category) {
  return function(dispatch, getState) {
    const token = getToken(getState())
    deleteCategory(token, category)
      .then((response) => {
        dispatch(deleteCategoryIcon(category))
        dispatch(getCategories(token))
      })
      .catch((err) => console.log(err))
  }
}
