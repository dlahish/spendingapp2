import React, { Component, PropTypes } from 'react'
import { View, Text, ScrollView } from 'react-native'
import { getTransactions } from '../actions/data'

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

function renderTransactions(transactions) {
  return transactions.map((transaction, i) => transactionRow(transaction, i))
}

function setAmountColor(type) {
  if (type === 'Income') return {color: 'green'}
  else return {color: 'red'}
}

function transactionRow(transaction, i) {
  const transactionMonth = new Date(transaction.date)
  return (
    <View style={styles.transactionRow} key={i}>
      <View style={styles.nameAndAmount}>
        <View style={styles.name}>
          {transaction.notes ? <Text style={styles.text}>{transaction.notes}</Text> : <Text style={styles.text}>{transaction.category}</Text>}
        </View>
        <View style={styles.amount}>
          <Text style={[styles.text, setAmountColor(transaction.type)]}>{transaction.amount}</Text>
        </View>
      </View>
      <View>
        <Text style={styles.date}>{transactionMonth.toLocaleDateString('en-GB')}</Text>
      </View>
    </View>
  )
}

export default Transactions = (props) => {
  const currentMonthIndex = new Date().getMonth()
  const currentYear = new Date().getFullYear()
  const VisibleTransactions = getVisibleTransactions(props.transactions[currentYear], currentMonthIndex)

  return (
    <View style={styles.container}>
      <View style={styles.monthHeader}>
        <View style={styles.monthWrapper}>
          <Text style={styles.monthText}>
            {props.currentMonth}
          </Text>
        </View>
      </View>
      <ScrollView>
        {renderTransactions(VisibleTransactions)}
      </ScrollView>
    </View>
  )
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
