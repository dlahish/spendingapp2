import React, { Component } from 'react'
import { View, Text, StyleSheet, AsyncStorage } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { GuestActions, UserActions, NewTransaction, ShowDetails } from '../components'
import * as accountActions from '../actions/accounts'
import * as dataActions from '../actions/data'
import Chart from 'react-native-chart'

function getMonth() {
  const monthNames = ["January", "February", "March", "April", "May", "June",
                      "July", "August", "September", "October", "November", "December"];
  const d = new Date();
  return monthNames[d.getMonth()]
}

function getMonthBalance(yearTotal) {
  console.log('getMonthBalance')
  console.log(yearTotal)
  const month = new Date().getMonth()
  if (yearTotal.length === 0) return {}
  else return yearTotal[month]
}

class Home extends Component {
  // componentWillMount() {
  //   let currentYear = new Date().getFullYear()
  //   console.log(currentYear)
  //   this.props.actions.data.getYearTotal(currentYear)
  // }
  componentWillReceiveProps() {
    let currentYear = new Date().getFullYear()
    console.log(currentYear)
    this.props.actions.data.getYearTotal(currentYear)
  }

  render() {
    const monthBalance = getMonthBalance(this.props.yearTotal)
    return (
      <View style={styles.container}>
        <View style={styles.toolbar}>
          <Text style={styles.monthTitle}>{getMonth()}</Text>
        </View>
        <View style={styles.content}>
          <View style={styles.details}>
            <ShowDetails monthBalance={monthBalance} />
          </View>
          <View style={styles.actions}>
            <NewTransaction />
            <UserActions handleLogout={this.props.actions.account.logoutAndUnauthUser} />
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
		backgroundColor: '#f2f2f2'
	},
  details: {
    flex: 1
  },
  actions: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  toolbar: {
    alignItems: 'center',
    paddingTop:30,
    paddingBottom:10,
    backgroundColor: 'rgb(0, 153, 204)'
  },
  monthTitle: {
    fontSize: 18,
    textAlign:'center',
    fontWeight: '300',
    color:'#fff',
  },
  content: {
    flex: 9,
    justifyContent: 'flex-end',
    alignItems: 'stretch',
    backgroundColor: '#f2f2f2',
    paddingBottom: 60
  }
})

export default connect(
  (state) => ({
    isAuthed: state.account.isAuthed,
    yearTotal: state.data.yearTotal
  }),
  (dispatch) => ({
    actions: {
      account: bindActionCreators(accountActions, dispatch),
      data: bindActionCreators(dataActions, dispatch)
    }
  })
)(Home)
