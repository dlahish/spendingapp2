import { SAVE_CATEGORY_ICON } from '../constants'
import {REHYDRATE} from 'redux-persist/constants'

const initialState = {
  categoryIconIndex: []
}

export default function accounts (state = initialState, action) {
  let nextCategoryIconIndex = []
  let newCategory = {}
  switch (action.type) {
    case SAVE_CATEGORY_ICON:
      console.log('reducer ACTION -----', action)
      newCategory.category = action.category
      newCategory.iconName = action.iconName
      console.log('state', state)
      console.log('nextCategoryIconIndex', nextCategoryIconIndex)
      console.log('newCategory', newCategory)
      nextCategoryIconIndex.push(newCategory)
      return { ...state, categoryIconIndex: nextCategoryIconIndex }
    case REHYDRATE:
      var incoming = action.payload.myReducer
      if (incoming) return {...state, ...incoming, specialKey: processSpecial(incoming.specialKey)}
      return state
    default:
      return state
  }
}
