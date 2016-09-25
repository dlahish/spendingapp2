import React, { Component, PropTypes } from 'react'
import { View, Text, StyleSheet, AsyncStorage } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Actions } from 'react-native-router-flux'
import Button from 'react-native-button'
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

const incomeFavoriteTransactions = [
  {name: 'Night', date: '09/30/2016', category: 'Madame', amount: 100, notes: ''},
  {name: 'Day', date: '09/11/2016', category: 'Madame', amount: 120, notes: ''},
  {name: 'Tip', date: '09/12/2016', category: 'Madame', amount: 28, notes: ''}
]

const expeseFavoriteTransactions = [
  {name: 'Beer', date: '09/05/2016', category: 'Food', amount: -7, notes: ''},
  {name: 'Coffee', date: '09/05/2016', category: 'Food', amount: -5, notes: ''},
  {name: 'Train Ticket', date: '09/02/2016', category: 'General', amount: -70, notes: 'September'}
]

SummeryLine = (leftText, rightText) => {
  return (
    <View style={styles.summeryLineWrapper}>
      <View><Text>{leftText}</Text></View>
      <View><Text>{rightText}</Text></View>
    </View>
  )
}

function getFavTransactionText(favTransaction) {
  return `${favTransaction.category}, ${favTransaction.amount}, ${favTransaction.notes}`
}

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

  renderFavoriteTransactions = (favTransaction) => {
    const favTransactionText = `${favTransaction.category}, ${favTransaction.amount}, ${favTransaction.notes}`
    return (
      <View style={styles.favTransactionWrapper}>
        <View style={styles.buttonWrapper}>
          <Button
            style={styles.btnText}
            containerStyle={[styles.btn, styles.bgGreen]}
            // onPress={props.handleLogout}
          >Add
          </Button>
        </View>
        <View style={styles.favTransactionText}>
          <Button
            // style={styles.btnText}
            containerStyle={[]}
            // onPress={props.handleLogout}
          >{favTransactionText}
          </Button>
        </View>
      </View>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={[styles.main, addBorder(2, 'black')]}>

          <View style={[styles.monthSummary, addBorder(2, 'green')]}>
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

          <View style={[styles.favoriteTransactions, addBorder(2, 'red')]}>
            <View>
              <Text style={{fontSize: 20}}>Favorite Transactions</Text>
            </View>
            <View>
              {this.renderFavoriteTransactions({name: 'Train Ticket', date: '09/02/2016', category: 'General', amount: -70, notes: 'September'})}
            </View>
          </View>

        </View>

        <View style={styles.addTransactionButtonsWrapper}>
          <View style={styles.addTransactionButtons}>
            <AddTransactionButtons />
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
    paddingBottom: 55,
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: '#FFF'
	},
  main: {
    flex: 1
  },
  monthSummary: {
    flex: 1,
    paddingTop: 3
  },
  favoriteTransactions: {
    flex: 2
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
    flexDirection: 'row'
  },
  favTransactionText: {
    flexDirection: 'row'
  },
  btnText: {
		color: "#f2f2f2"
	},
	btn: {
		width: 50,
		// padding:8,
		// borderRadius:6,
		// margin:8
	},
  bgGreen: {
		backgroundColor:"#2ecc71",
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
    currencySymbol: state.settings.currencySymbol
  }),
  (dispatch) => ({
    actions: {
      account: bindActionCreators(accountActions, dispatch),
      data: bindActionCreators(dataActions, dispatch)
    }
  })
)(Home)
