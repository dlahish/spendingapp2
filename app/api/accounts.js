import axios from 'axios'
import { AsyncStorage } from 'react-native'

const BASE_URI = `https://spendingapi2.herokuapp.com`

export function checkAuth() {
  return AsyncStorage.getItem('spending-user-token')
}

export function currentUser(token) {
  if (token === null) return {}
  return axios.get(`${BASE_URI}/getemail`, { headers: { authorization: token }})
}

export function signin (credentials) {
  console.log(credentials)
	// return axios.post(`${BASE_URI}/signin`, { credentials.email, credentials.password })
	// })
}

export function setAuth (res) {
	AsyncStorage.setItem('spending-user-token', res.data.token)
	return res.data.token
}
