import React, { Component } from 'react'
import { View, Text, StyleSheet, AsyncStorage } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { GuestActions, UserActions, NewTransaction, ShowDetails, HomeToolbar } from '../components'
import * as accountActions from '../actions/accounts'
import * as dataActions from '../actions/data'
import Chart from 'react-native-chart'

// function getMonthBalance(yearTotal) {
//   const currentMonth = new Date().getMonth()
//   if (yearTotal.length > 0) return yearTotal[currentMonth]
//   else return {}
// }

class Home extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.toolbar}>
          <HomeToolbar />
        </View>
        <View style={styles.content}>
          <View style={styles.details}>
            <ShowDetails getYearTotal={this.props.actions.data.getYearTotal} currentMonthTotal={this.props.currentMonthTotal}/>
          </View>
          <View style={styles.actions}>
            <NewTransaction getYearTotal={this.props.actions.data.getYearTotal} />
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
  content: {
    flex: 9,
    justifyContent: 'flex-end',
    alignItems: 'stretch',
    backgroundColor: '#f2f2f2',
    paddingTop: 20,
    paddingBottom: 60
  }
})

export default connect(
  (state) => ({
    isAuthed: state.account.isAuthed,
    currentMonthTotal: state.data.currentMonthTotal
  }),
  (dispatch) => ({
    actions: {
      account: bindActionCreators(accountActions, dispatch),
      data: bindActionCreators(dataActions, dispatch)
    }
  })
)(Home)
