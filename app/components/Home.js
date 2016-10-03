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

  onAddNewFavortieTransaction = (favTransaction) => {
    delete favTransaction['_id']
    this.props.actions.data.addNewFavoriteTransaction(favTransaction)
  }

  render() {
    return (
      <View style={styles.container}>
        <CustomNavBar
          onLeftPress={() => {}}
          onRightPress={() => {}}
          title={this.props.currentMonthName}
        />
        <View style={styles.main}>

          <View style={styles.monthSummary}>
            <View style={styles.monthArrows}>
              <ChangeMonthArrows
                onPressLeft={() =>
                  this.props.actions.data.setMonth('previous',
                                                    this.props.currentMonthIndex,
                                                    this.props.yearTotal,
                                                    this.props.transactions)}
                onPressRight={() => this.props.actions.data.setMonth('next',
                                                                      this.props.currentMonthIndex,
                                                                      this.props.yearTotal,
                                                                      this.props.transactions)}
              />
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
  currencySymbol: PropTypes.node,
  favoriteTransactions: PropTypes.array,
  token: PropTypes.string
}

export default connect(
  (state) => ({
    isAuthed: state.account.isAuthed,
    token: state.account.token,
    currentMonthTotal: state.data.currentMonthTotal,
    currentMonthIndex: state.data.currentMonthIndex,
    currentMonthName: state.data.currentMonthName,
    currencySymbol: state.settings.currencySymbol,
    favoriteTransactions: state.data.favoriteTransactions,
    yearTotal: state.data.yearTotal,
    transactions: state.data.transactions['2016']
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
