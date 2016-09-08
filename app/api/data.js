import axios from 'axios'
const BASE_URI = `https://spendingapi2.herokuapp.com`

export function fetchTotalBalance(token) {
  if (token === null) return {}
  return axios.get(`${BASE_URI}/gettotal`, { headers: { authorization: token }})
}

export function fetchYearTotal(token, year) {
  console.log('FETCH YEAR TOTAL --')
  console.log(token)
  console.log(year)
  if (token === null) return {}
  return axios({
      url: `${BASE_URI}/getmonthstotal`,
      method: 'post',
      headers: { authorization: token },
      contentType: 'application/json',
      data: { year }
  })
    // .then(response => {
    //   dispatch({
    //     type: FETCH_MONTHS_TOTAL,
    //     payload: response.data.data
    //   });
    // })
    // .catch(err => {
    //   console.log(err);
    //   dispatch(authError('Something went wrong with getMonthsTotal'));
    // });
}
