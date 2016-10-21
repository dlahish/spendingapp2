import { SAVE_CATEGORY_ICON, DELETE_CATEGORY_ICON } from '../constants'
import {REHYDRATE} from 'redux-persist/constants'

const initialState = {
  categoryIconIndex: {}
}

export default function accounts (state = initialState, action) {
  let nextCategoryIconIndex = state.categoryIconIndex
  switch (action.type) {
    case SAVE_CATEGORY_ICON:
      nextCategoryIconIndex[action.name] = action.iconName
      return { ...state, categoryIconIndex: nextCategoryIconIndex }
      // return initialState
    case DELETE_CATEGORY_ICON:
      delete nextCategoryIconIndex[action.category.name]
      return { ...state, categoryIconIndex: nextCategoryIconIndex }
    case REHYDRATE:
      var incoming = action.payload.myReducer
      if (incoming) return {...state, ...incoming, specialKey: processSpecial(incoming.specialKey)}
      return state
    default:
      return state
  }
}
