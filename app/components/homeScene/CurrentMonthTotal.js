'use strict'

import React, { Component, PropTypes } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import I18n from 'react-native-i18n'
import ReactNativeI18n from 'react-native-i18n'

function displayText(currentMonthTotal, type, currencySymbol) {
  if (type === 'balance') {
    let balance = currentMonthTotal.income - currentMonthTotal.expenses
    return <Text style={styles.amount}>
            {I18n.toCurrency(balance, {
              unit: getSymbol(currencySymbol),
              format: "%u %n",
              precision: 0,
              sign_first: false})}
            </Text>
  }
  if (currentMonthTotal.hasOwnProperty([type])) {
    return <Text style={styles.amount}>
            {I18n.toCurrency(currentMonthTotal[type], {
              unit: getSymbol(currencySymbol),
              format: "%u %n",
              precision: 0,
              sign_first: false})}
            </Text>
  } else { return <Text style={styles.loading}>Loading...</Text> }
}

function getSymbol(symbol) {
  if (symbol === 'default') return null
  if (typeof symbol === 'number') return String.fromCharCode(symbol)
  else return symbol
}

export default class CurrentMonthTotal extends Component {
  render() {
    return (
      <View style={styles.container}>

        <View style={styles.innerContainer}>
          <Text style={styles.title}>
            Income
          </Text>
          <View>
            {displayText(this.props.currentMonthTotal, 'income', this.props.currencySymbol)}
          </View>
        </View>

        <View style={styles.innerContainer}>
          <Text style={styles.title}>
            Expense
          </Text>
          <View>
            {displayText(this.props.currentMonthTotal, 'expenses', this.props.currencySymbol)}
          </View>
        </View>

        <View style={styles.line}></View>

        <View style={styles.innerContainer}>
          <Text style={styles.title}>
            Total
          </Text>
          <View>
            {displayText(this.props.currentMonthTotal, 'balance', this.props.currencySymbol)}
          </View>
        </View>

      </View>
    )
  }
}

CurrentMonthTotal.propTypes = {
  currentMonthTotal: PropTypes.object
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 5
  },
  innerContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'space-between',
    marginBottom: 5,
    paddingLeft: 15,
    paddingRight: 15
  },
  title: {
    justifyContent: 'center',
    color: '#333',
    fontSize: 17,
    fontWeight: '400',
    // color: 'rgb(0, 153, 204)',
    paddingBottom: 5
  },
  amount: {
    flex: 1,
    color: '#333',
    fontSize: 17,
    fontWeight: '400'
  },
  loading: {
    flex: 1,
    fontSize: 15,
    fontWeight: '300',
  },
  line: {
    height: 1,
    backgroundColor: '#b3b3b3',
    marginBottom: 10
  },
  summeryLineWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
})

I18n.fallbacks = true

I18n.translations = {
  en: {
    greeting: 'Hi!'
  }
  // [deviceLocale]: {
  //   number: {
  //     currency: {
  //       format: {
  //         format: "%u %n",
  //         unit: "USD",
  //         delimiter: ".",
  //         separator: ",",
  //         precision: 2
  //       }
  //     }
  //   }
  // }
}
