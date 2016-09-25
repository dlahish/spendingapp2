import React, { Component, PropTypes } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import I18n from 'react-native-i18n'
import ReactNativeI18n from 'react-native-i18n'
const deviceLocale = ReactNativeI18n.locale

function displayText(currentMonthTotal, type, currencySymbol) {
  if (currentMonthTotal.hasOwnProperty([type])) {
    return <Text style={styles.amount}>
            {I18n.toCurrency(currentMonthTotal[type], {unit: getSymbol(currencySymbol), format: "%u %n"})}
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
    console.log(deviceLocale)
    return (
      <View style={styles.container}>

        <View style={styles.innerContainer}>
          <Text style={styles.title}>
            Income
          </Text>
          {displayText(this.props.currentMonthTotal, 'income', this.props.currencySymbol)}
        </View>

        <View style={styles.innerContainer}>
          <Text style={styles.title}>
            Expense
          </Text>
          {displayText(this.props.currentMonthTotal, 'expenses', this.props.currencySymbol)}
        </View>

      </View>
    )
  }
}

CurrentMonthTotal.propTypes = {
  // getYearTotal: PropTypes.func.isRequired,
  currentMonthTotal: PropTypes.object
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'stretch',
    paddingTop: 10,
  },
  innerContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
  },
  title: {
    justifyContent: 'center',
    fontSize: 22,
    fontWeight: '500',
    color: 'rgb(0, 153, 204)',
    paddingBottom: 5
  },
  amount: {
    flex: 1,
    fontSize: 20,
    fontWeight: '500',
  },
  loading: {
    flex: 1,
    fontSize: 15,
    fontWeight: '300',
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
