import { SET_NEW_CATEGORY, CLEAR_FORM } from '../constants'

const initialState = {
  category: 'Category'
}

export default function accounts (state = initialState, action) {
  switch (action.type) {
    case SET_NEW_CATEGORY:
      return { ...state, category: action.category}
    case CLEAR_FORM:
      return initialState
    default:
      return state
  }
}
