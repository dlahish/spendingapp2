import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'

function displayText(currentMonthTotal, type) {
  if (currentMonthTotal.hasOwnProperty([type])) {
    return <Text style={styles.amount}>
            {currentMonthTotal[type]}
            </Text>
  } else { return <Text style={styles.loading}>Loading...</Text> }
}

export default class CurrentMonthTotal extends Component {
  componentDidMount() {
    let currentYear = new Date().getFullYear()
    this.props.getYearTotal(currentYear)
  }

  render() {
    return (
      <View style={styles.container}>

        <View style={styles.innerContainer}>
          <Text style={styles.title}>
            Income
          </Text>
          {displayText(this.props.currentMonthTotal, 'income')}
        </View>

        <View style={styles.innerContainer}>
          <Text style={styles.title}>
            Expense
          </Text>
          {displayText(this.props.currentMonthTotal, 'expenses')}
        </View>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    flexDirection: 'row',
    alignItems: 'stretch',
    paddingTop: 10,
  },
  innerContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
    // justifyContent: 'center'
  },
  title: {
    justifyContent: 'center',
    // alignItems: 'center',
    fontSize: 22,
    fontWeight: '500',
    color: 'rgb(0, 153, 204)',
    // textAlign: 'center',
    paddingBottom: 5
  },
  amount: {
    flex: 1,
    // textAlign: 'center',
    fontSize: 20,
    fontWeight: '500',
  },
  loading: {
    flex: 1,
    // textAlign: 'center',
    fontSize: 15,
    fontWeight: '300',
  }
})
