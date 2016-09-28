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
  FavoriteTransactions,
  AddTransactionButtons,
  ChangeMonthArrows
} from '../components'
import * as accountActions from '../actions/accounts'
import * as dataActions from '../actions/data'
import * as formActions from '../actions/form'
import * as settingsActions from '../actions/settings'

SummeryLine = (leftText, rightText) => {
  return (
    <View style={styles.summeryLineWrapper}>
      <View><Text>{leftText}</Text></View>
      <View><Text>{rightText}</Text></View>
    </View>
  )
}

// function getFavTransactionText(favTransaction) {
//   return `${favTransaction.category}, ${favTransaction.amount}, ${favTransaction.notes}`
// }

function getFavortieTransactionText(favTransaction) {
  if (!favTransaction.notes) return `${favTransaction.category}, ${favTransaction.amount}`
  else return `${favTransaction.category}, ${favTransaction.amount}, ${favTransaction.notes}`
}

function getAddButtonColor(favTransaction) {
  if (favTransaction.amount > 0) return '#2ecc71'
  else return '#ff4d4d'
}

class Home extends Component {
  componentDidMount() {
    let currentYear = new Date().getFullYear()
    this.props.actions.data.getTransactions(currentYear)
    this.props.actions.data.getYearTotal()
    this.props.actions.data.getCategories()
    this.props.actions.data.getFavoriteTransactions()
    this.props.actions.settings.getCurrencySymbol()
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.isAuthed === false && nextProps.isAuthed) {
      let currentYear = new Date().getFullYear()
      this.props.actions.data.getTransactions(currentYear)
      this.props.actions.data.getYearTotal()
      this.props.actions.data.getCategories()
      this.props.actions.data.getFavoriteTransactions()
      this.props.actions.settings.getCurrencySymbol()
    }
  }

  renderFavoriteTransactions = (favTransaction, i) => {
    const favTransactionText = getFavortieTransactionText(favTransaction)
    const addButtonColor = getAddButtonColor(favTransaction)
    return (
      <View style={styles.favTransactionWrapper} key={i}>
        <View style={[styles.buttonWrapper, {backgroundColor: addButtonColor}]}>
          <TouchableHighlight onPress={() => this.onAddNewFavortieTransaction(favTransaction)}>
            <View style={[styles.buttonWrapper, {backgroundColor: addButtonColor}]}>
              <Text style={styles.favTransactionText}>Add</Text>
            </View>
          </TouchableHighlight>
        </View>
        <View style={styles.favTransactionTextWrapper}>
          <Text
            numberOfLines={1}
            style={styles.favTransactionText}>{favTransactionText}
          </Text>
        </View>
      </View>
    )
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
              <Text style={{fontSize: 20, paddingBottom: 10}}>Favorite Transactions</Text>
            </View>
            <View>
              {this.props.favoriteTransactions !== null
                ? this.props.favoriteTransactions.map((transaction, i) => {
                    return this.renderFavoriteTransactions(transaction, i)
                  })
                : <View><Text style={{opacity: 0.6}}>Go to settings to add your favorite Transactions</Text></View>}
            </View>
          </View>

        </View>

        <View style={styles.addTransactionButtonsWrapper}>
          <View style={styles.addTransactionButtons}>
            <AddTransactionButtons dispatch={this.props.dispatch} setCategoryType={this.props.actions.form.setCategoryType}/>
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
		paddingTop: 64,
    paddingBottom: 85,
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
  favoriteTransactions: {
    flex: 2,
    paddingTop: 10,
    paddingLeft: 15,
    paddingRight: 15
  },
  addTransactionButtons: {
    flex: 1,
    paddingTop: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  summeryLineWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  favTransactionWrapper: {
    flexDirection: 'row',
    marginTop: 3,
    marginBottom: 3
  },
  favTransactionTextWrapper: {
    flex: 1,
    flexDirection: 'row',
    paddingLeft: 5,
    paddingRight: 5,
    backgroundColor: '#BBB',
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    paddingTop: 4,
    paddingBottom: 2
  },
  favTransactionText: {
    fontSize: 22,
    flex: 0.5
  },
  buttonWrapper: {
    backgroundColor: '#2ecc71',
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 2,
    paddingBottom: 2,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5
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
    currentMonth: state.data.currentMonth,
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
