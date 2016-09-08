import React, { Component } from 'react'
import { View, Text, StyleSheet, AsyncStorage } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { GuestActions, UserActions, NewTransaction, CurrentMonthTotal, HomeToolbar, addBorder, AddFavoriteTransaction } from '../components'
import * as accountActions from '../actions/accounts'
import * as dataActions from '../actions/data'
import Chart from 'react-native-chart'

class Home extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.toolbar}>
          <HomeToolbar />
        </View>
        <View style={styles.content}>
          <View style={[styles.main, addBorder(1, 'black')]}>
            <View style={[styles.showMonthTotal, addBorder(1, 'black')]}>
              <CurrentMonthTotal getYearTotal={this.props.actions.data.getYearTotal} currentMonthTotal={this.props.currentMonthTotal}/>
            </View>
            <View style={[styles.favoriteTransactions, addBorder(1, 'blue')]}>
              {/* <AddFavoriteTransaction /> */}
            </View>
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
  main: {
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
  },
  favoriteTransactions: {
    flex: 1
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
