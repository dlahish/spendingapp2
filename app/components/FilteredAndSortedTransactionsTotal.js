import React, { Component, PropTypes } from 'react'
import { View, Text } from 'react-native'
import I18n from 'react-native-i18n'

export default FilteredAndSortedTransactionsTotal = (props) => {

  function getTotalBalace(transactions, type) {
    let totalBalance = 0
    transactions.forEach((transaction) => {
      if (type === 'income' && transaction.type === 'Income') totalBalance += transaction.amount
      else if (type === 'expense' && transaction.type === 'Expense') totalBalance += Math.abs(transaction.amount)
    })
    return totalBalance
  }

  return (
    <View style={{paddingTop: 0}}>

        <View style={{flexDirection: 'row'}}>
            <View style={styles.balanceWrapper}>
              <Text>{`${props.currencySymbol} ${getTotalBalace(props.transactions, 'income')}`}</Text>
            </View>
            <View style={[styles.balanceWrapper, {backgroundColor: 'red'}]}>
              <Text>{`${props.currencySymbol} ${getTotalBalace(props.transactions, 'expense')}`}</Text>
            </View>
        </View>

        <View style={{paddingLeft: 35, paddingBottom: 2}}>
            <Text>{I18n.p(props.transactions.length, 'transactions')}</Text>
        </View>

    </View>
  )
}

const styles = {
  balanceWrapper: {
    flex: 1,
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 2,
    paddingBottom: 2
  },
  balanceText: {

  },
  ransactionsFoundText: {

  }
}

I18n.fallbacks = true
I18n.translations.en = {
  transactions: {
    one: '1 transaction found',
    other: '{{count}} transactions found',
    zero: 'No transactions found'
  }
}
