import { SET_NEW_CATEGORY } from '../constants'

const initialState = {
  category: null
}

export default function accounts (state = initialState, action) {
  switch (action.type) {
    case SET_NEW_CATEGORY:
      return { ...state, category: action.category}
    default:
      return state
  }
}
