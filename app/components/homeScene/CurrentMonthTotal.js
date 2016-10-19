'use strict'

import React, { Component, PropTypes } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import I18n from 'react-native-i18n'
import ReactNativeI18n from 'react-native-i18n'

function displayText(currentMonthTotal, type, currencySymbol) {
  if (type === 'balance') {
    let balance = currentMonthTotal.income - currentMonthTotal.expenses
    return <Text style={styles.text}>
            {I18n.toCurrency(balance, {
              unit: getSymbol(currencySymbol),
              format: "%u %n",
              precision: 0,
              sign_first: false})}
            </Text>
  }
  if (currentMonthTotal.hasOwnProperty([type])) {
    return <Text style={styles.text}>
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
          <View style={styles.titleWrapper}>
              <Text style={styles.titleText}>Month Balance</Text>
          </View>

          <View style={styles.line}></View>

          <View style={styles.textContainer}>
            <Text style={styles.text}>
              Income
            </Text>
            <View>
              {displayText(this.props.currentMonthTotal, 'income', this.props.currencySymbol)}
            </View>
          </View>

          <View style={styles.textContainer}>
            <Text style={styles.text}>
              Expense
            </Text>
            <View>
              {displayText(this.props.currentMonthTotal, 'expenses', this.props.currencySymbol)}
            </View>
          </View>

          <View style={[styles.line, {marginHorizontal: 15}]}></View>

          <View style={styles.textContainer}>
            <Text style={styles.text}>
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
    marginVertical: 15,
    backgroundColor: '#eaeaea',
  },
  titleWrapper: {
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  titleText: {
    color: 'black',
    fontSize: 15,
    fontWeight: '400'
  },
  line: {
    height: 1,
    backgroundColor: '#b3b3b3'
  },
  textContainer: {
    paddingHorizontal: 15,
    paddingVertical: 6,
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'space-between'
  },
  text: {
    color: 'black',
    fontSize: 17,
    fontWeight: '400'
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
