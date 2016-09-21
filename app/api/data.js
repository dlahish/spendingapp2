import axios from 'axios'
const BASE_URI = `https://spendingapi2.herokuapp.com`
// const BASE_URI = `http://192.168.0.104:3090`

export function fetchTotalBalance(token) {
  if (token === null) return {}
  return axios.get(`${BASE_URI}/gettotal`, { headers: { authorization: token }})
}

export function deleteCategory(token, category) {
  if (token === null) return {}
  return axios({
    url: `${BASE_URI}/deletecategory`,
    method: 'post',
    headers: { authorization: token },
    contentType: 'application/json',
    data: { category }
  })
}

export function fetchYearTotal(token, year) {
  if (token === null) return {}
  return axios({
      url: `${BASE_URI}/getmonthstotal`,
      method: 'post',
      headers: { authorization: token },
      contentType: 'application/json',
      data: { year }
  })
}

export function saveNewTransaction(token, transaction) {
  if (token === null) return {}
  console.log('save new transaction --')
  console.log(transaction)
  return axios({
    url: `${BASE_URI}/addrecord`,
    method: 'post',
    headers: { authorization: token },
    contentType: 'application/json',
    data: {
      date: transaction.date,
      category: transaction.category,
      amount: transaction.amount,
      notes: transaction.notes,
      type: transaction.type
    }
  })
}

export function saveNewCategory(token, category) {
  if (token === null) return {}
  return axios({
    url: `${BASE_URI}/addnewcategory`,
    method: 'post',
    headers: { authorization: token },
    contentType: 'application/json',
    data: { category: category }
  })
}

export function fetchCategories(token) {
  return axios({
    url: `${BASE_URI}/fetchcategories`,
    method: 'get',
    headers: { authorization: token },
    contentType: 'application/json'
  })
}

export function fetchTransactions(token, year) {
  return axios({
    url: `${BASE_URI}/getdata`,
    method: 'post',
    headers: { authorization: token },
    contentType: 'application/json',
    data: {
      startDate: `01/01/${year}`,
      endDate: `12/31/${year}`
    }
  })
}

// export function fetchTransactions(token, year) {
//   return axios({
//     url: `${BASE_URI}/getmonthstotal`,
//     method: 'post',
//     headers: { authorization: token },
//     contentType: 'application/json',
//     data: { year: year }
//   })
// }
