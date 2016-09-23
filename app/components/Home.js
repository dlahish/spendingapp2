import React, { Component, PropTypes } from 'react'
import { View, Text, StyleSheet, AsyncStorage } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Actions } from 'react-native-router-flux'
import {
  GuestActions,
  UserActions,
  NewTransaction,
  CurrentMonthTotal,
  addBorder,
  FavoriteTransactions,
  AddTransactionButtons
} from '../components'
import * as accountActions from '../actions/accounts'
import * as dataActions from '../actions/data'

const incomeFavoriteTransactions = [
  {name: 'Night', date: '09/30/2016', category: 'Madame', amount: 100, notes: ''},
  {name: 'Day', date: '09/11/2016', category: 'Madame', amount: 120, notes: ''},
  {name: 'Tip', date: '09/12/2016', category: 'Madame', amount: 28, notes: ''}
]

const expeseFavoriteTransactions = [
  {name: 'Beer', date: '09/05/2016', category: 'Food', amount: -7, notes: ''},
  {name: 'Coffee', date: '09/05/2016', category: 'Food', amount: -5, notes: ''},
  {name: 'Train Ticket', date: '09/02/2016', category: 'General', amount: -70, notes: ''}
]

class Home extends Component {
  componentDidMount() {
    let currentYear = new Date().getFullYear()
    this.props.actions.data.getTransactions(currentYear)
    this.props.actions.data.getYearTotal()
    this.props.actions.data.getCategories()
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.isAuthed === false && nextProps.isAuthed) {
      let currentYear = new Date().getFullYear()
      this.props.actions.data.getTransactions(currentYear)
      this.props.actions.data.getYearTotal()
      this.props.actions.data.getCategories()
    }
  }

  render() {
    return (
      <View style={styles.container}>
          <View style={styles.main}>
            <CurrentMonthTotal
              currentMonthTotal={this.props.currentMonthTotal}
            />

            {/* <FavoriteTransactions
              addTransaction={this.props.actions.data.addNewTransaction}
              incomeFavoriteTransactions={incomeFavoriteTransactions}
              expeseFavoriteTransactions={expeseFavoriteTransactions}
            /> */}

            <AddTransactionButtons />
          </View>

          <View style={styles.actions}>
            <UserActions handleLogout={this.props.actions.account.logoutAndUnauthUser} />
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
		paddingTop: 64,
    backgroundColor: '#FFF'
	},
  main: {
    flex: 3,
    paddingLeft: 20
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
  favoriteTransactions: {
    flex: 1
  }
})

Home.propTypes = {
  currentMonthTotal: PropTypes.object
}

export default connect(
  (state) => ({
    isAuthed: state.account.isAuthed,
    currentMonth: state.data.currentMonth,
    currentMonthTotal: state.data.currentMonthTotal,
    yearTotal: state.data.yearTotal,
    categories: state.data.categories,
    transactions: state.data.transactions,
    currentMonth: state.data.currentMonth
  }),
  (dispatch) => ({
    actions: {
      account: bindActionCreators(accountActions, dispatch),
      data: bindActionCreators(dataActions, dispatch)
    }
  })
)(Home)
