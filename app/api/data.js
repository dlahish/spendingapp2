import axios from 'axios'
const BASE_URI = `https://spendingapi2.herokuapp.com`

export function fetchTotalBalance(token) {
  if (token === null) return {}
  return axios.get(`${BASE_URI}/gettotal`, { headers: { authorization: token }})
}
