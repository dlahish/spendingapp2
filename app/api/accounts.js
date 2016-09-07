import axios from 'axios'
import { AsyncStorage } from 'react-native'

const BASE_URI = `https://spendingapi2.herokuapp.com`

export function checkAuth() {
  console.log('CHECK AUTH ACTION ---')
  return AsyncStorage.getItem('spending-user-token')
}

export function currentUser(token) {
  console.log('CURRENT USER ACTION ---')
  if (token === null) return {}
  return axios.get(`${BASE_URI}/getemail`, { headers: { authorization: token }})
}

export function signin (credentials) {
  console.log('SIGN IN ACTION ---')
  const email = credentials.email, password = credentials.password
	return axios.post(`${BASE_URI}/signin`, { email, password })
}

export function signup(credentials) {
  console.log('SIGN UP ACTION ---')
  const email = credentials.email, password = credentials.password
	return axios.post(`${BASE_URI}/signup`, { email, password })
}

export function setAuth (res) {
  console.log('SET AUTH ACTION ---')
  console.log(res.data)
  if (res.data.message) {
    return { authError: res.data.message }
  } else {
    AsyncStorage.setItem('spending-user-token', res.data.token)
    return res
  }
}

export function revokeAuth () {
	return AsyncStorage.removeItem('spending-user-token')
}
