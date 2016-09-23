import React, { Component, PropTypes } from 'react'
import { View, Text, ScrollView, TouchableHighlight } from 'react-native'
import { getTransactions } from '../actions/data'
import { Actions } from 'react-native-router-flux'
import { ItemRow } from '../components'

function getVisibleTransactions(transactions, month) {
  monthFilter = (transaction) => {
    const transactionMonth = new Date(transaction.date).getMonth()
    return transactionMonth === month
  }
  sortDownDate = (a, b) => a.date > b.date ? 1 : a.date < b.date ? -1 : 0
  sortUpDate = (a, b) => a.date < b.date ? 1 : a.date > b.date ? -1 : 0

  if (transactions === undefined) { return [] }
  else {
    const filteredTransactions = transactions.filter(monthFilter)
    return filteredTransactions.sort((a,b) => sortUpDate(a,b))
  }
}

function setAmountColor(type) {
  if (type === 'Income') return {color: 'green'}
  else return {color: 'red'}
}

function setMainText(transaction) {
  if (transaction.notes) return transaction.notes
  else return transaction.category
}

export default class Transactions extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedItemIndex: null
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.selectedItemIndex) this.setState({selectedItemIndex: null})
  }

  onSelecetItem = (itemIndex, selected, transaction) => {
    const selectedItemIndex = this.state.selectedItemIndex
    if (this.props.editMode) {
        if (selected) this.setState({ selectedItemIndex: null})
        else if (selectedItemIndex !== null && itemIndex !== selectedItemIndex) this.setState({ selectedItemIndex: null})
        else this.setState({ selectedItemIndex: itemIndex })
    } else {
        console.log('ItemRow was clicked!!!!')
        console.log(transaction)
        Actions.newTransaction({isEdit: true, transaction})
    }
  }

  render() {
    const currentMonthIndex = new Date().getMonth()
    const currentYear = new Date().getFullYear()
    const VisibleTransactions = getVisibleTransactions(this.props.transactions[currentYear], currentMonthIndex)

    return (
      <View style={styles.container}>
        <View style={styles.monthHeader}>
          <View style={styles.monthWrapper}>
            <Text style={styles.monthText}>
              {this.props.currentMonth}
            </Text>
          </View>
        </View>
        <ScrollView>
            {VisibleTransactions.map((transaction, i) =>
              <ItemRow
                key={i}
                itemIndex={i}
                editMode={this.props.editMode}
                selected={i === this.state.selectedItemIndex ? true : false}
                item={transaction}
                mainText={setMainText(transaction)}
                rightText={transaction.amount}
                rightTextStyle={setAmountColor(transaction.type)}
                secondaryText={new Date(transaction.date).toLocaleDateString('en-GB')}
                onSelecetItem={this.onSelecetItem}
                onDeleteItem={this.props.removeTransaction}
              />
            )}
        </ScrollView>
      </View>
    )
  }
}

const styles = {
  container: {
    flex: 1,
    paddingTop: 64,
    paddingBottom: 50
  },
  monthHeader: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 5,
    marginBottom: 5
  },
  monthWrapper: {
    borderColor: '#BBB',
    borderWidth: 2,
    borderRadius: 5,
    paddingTop: 2,
    paddingBottom: 2,
    paddingLeft: 5,
    paddingRight: 5
  },
  monthText: {
    fontSize: 18
  },
  transactionRow: {
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 5,
    paddingTop: 5
  },
  nameAndAmount: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  date: {
    fontSize: 12
  },
  text: {
    fontSize: 22
  },
  icon: {
    paddingRight: 10,
    alignItems: 'center',
    justifyContent: 'center'
  }
}
