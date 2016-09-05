import axios from 'axios'
import { AsyncStorage } from 'react-native'

const BASE_URI = `https://spendingapi2.herokuapp.com`

export function checkAuth() {
  return AsyncStorage.getItem('spending-user')
}

export function currentUser(token) {
  if (token === null) return {}
  return axios.get(`${BASE_URI}/getemail`, { headers: { authorization: token }})
}
