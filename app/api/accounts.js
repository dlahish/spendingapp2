import axios from 'axios'
import { AsyncStorage } from 'react-native'

const BASE_URI = `https://spendingapi2.herokuapp.com`
// const BASE_URI = `http://192.168.0.104:3090`

// export function checkAuth() {
//   return AsyncStorage.getItem('spending-user-token')
// }

// export function checkAuth(state) {
//   console.log('checkauth--------------')
//   console.log(state)
//   console.log(state.account.token)
//   return state.account.token
// }

// export function currentUser(token) {
//   if (token === null) return {}
//   return axios.get(`${BASE_URI}/getemail`, { headers: { authorization: token }})
// }

export function currentUser(token) {
  if (token === null) return {}
  return axios.get(`${BASE_URI}/getemail`, { headers: { authorization: token }})
}

export function signin (credentials) {
  const email = credentials.email, password = credentials.password
	return axios.post(`${BASE_URI}/signin`, { email, password })
}

export function signup(credentials) {
  const email = credentials.email, password = credentials.password
	return axios.post(`${BASE_URI}/signup`, { email, password })
}

// export function setAuth (res) {
//   if (res.data.message) {
//     return { authError: res.data.message }
//   } else {
//     AsyncStorage.setItem('spending-user-token', res.data.token)
//     return res
//   }
// }

export function setAuth (res) {
  if (res.data.message) {
    return { authError: res.data.message }
  } else {
    return { token: res.data.token }
    return res
  }
}


// export function revokeAuth () {
// 	return AsyncStorage.removeItem('spending-user-token')
// }
