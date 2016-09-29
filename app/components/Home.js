'use strict'

import React, { Component, PropTypes } from 'react'
import { View, Text, TouchableHighlight, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Actions } from 'react-native-router-flux'
import {
  GuestActions,
  NewTransaction,
  CurrentMonthTotal,
  addBorder,
  AddTransactionButtons,
  ChangeMonthArrows,
  DisplayFavoriteTransactions
} from '../components'
import * as accountActions from '../actions/accounts'
import * as dataActions from '../actions/data'
import * as formActions from '../actions/form'
import * as settingsActions from '../actions/settings'

class Home extends Component {
  loadingActions = () => {
    let currentYear = new Date().getFullYear()
    this.props.actions.data.getTransactions(currentYear)
    this.props.actions.data.getYearTotal()
    this.props.actions.data.getCategories()
    this.props.actions.data.getFavoriteTransactions()
    this.props.actions.settings.getCurrencySymbol()
  }

  componentDidMount() {
    this.loadingActions()
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.isAuthed === false && nextProps.isAuthed) {
      this.loadingActions()
    }
  }

  onAddNewFavortieTransaction = (favTransaction) => {
    delete favTransaction['_id'];
    console.log(favTransaction)
    this.props.actions.data.addNewFavoriteTransaction(favTransaction)
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.main}>

          <View style={styles.monthSummary}>
            <View style={styles.monthArrows}>
              <ChangeMonthArrows />
            </View>
            <View style={styles.summary}>
              <CurrentMonthTotal
                currentMonthTotal={this.props.currentMonthTotal}
                currencySymbol={this.props.currencySymbol}
              />
            </View>
          </View>

          <View style={styles.favoriteTransactions}>
            <View>
              <Text style={{fontSize: 15, paddingBottom: 10}}>Favorite Transactions</Text>
            </View>
            <DisplayFavoriteTransactions
              favoriteTransactions={this.props.favoriteTransactions}
              onAddNewFavortieTransaction={this.onAddNewFavortieTransaction}
            />
          </View>

        </View>

        <View style={styles.addTransactionButtonsWrapper}>
            <AddTransactionButtons setCategoryType={this.props.actions.form.setCategoryType}/>
        </View>

      </View>
    )
  }
}

Home.propTypes = {
  currentMonthTotal: PropTypes.object,
  isAuthed: PropTypes.bool.isRequired,
  currencySymbol: PropTypes.string,
  favoriteTransactions: PropTypes.array
}

export default connect(
  (state) => ({
    isAuthed: state.account.isAuthed,
    currentMonthTotal: state.data.currentMonthTotal,
    currencySymbol: state.settings.currencySymbol,
    favoriteTransactions: state.data.favoriteTransactions
  }),
  (dispatch) => ({
    actions: {
      account: bindActionCreators(accountActions, dispatch),
      data: bindActionCreators(dataActions, dispatch),
      form: bindActionCreators(formActions, dispatch),
      settings: bindActionCreators(settingsActions, dispatch)
    }
  })
)(Home)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
		paddingTop: 64,
    paddingBottom: 65,
    backgroundColor: '#FFF'
	},
  main: {
    flex: 1
  },
  monthSummary: {
    flex: 1,
    paddingTop: 3,
    borderBottomWidth: 1,
    borderBottomColor: '#BBB',
    paddingLeft: 15,
    paddingRight: 15
  },
  summary: {
    flex: 1
  },
  favoriteTransactions: {
    flex: 2,
    paddingTop: 10,
    paddingLeft: 15,
    paddingRight: 15
  }
})
