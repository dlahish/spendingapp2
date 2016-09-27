import { SET_NEW_CATEGORY, CLEAR_FORM, SET_CATEGORY_TYPE } from '../constants'

const initialState = {
  category: 'Category',
  categoryType: ''
}

export default function accounts (state = initialState, action) {
  switch (action.type) {
    case SET_NEW_CATEGORY:
      return { ...state, category: action.category}
    case SET_CATEGORY_TYPE:
      return { ...state, categoryType: action.categoryType}
    case CLEAR_FORM:
      return initialState
    default:
      return state
  }
}
