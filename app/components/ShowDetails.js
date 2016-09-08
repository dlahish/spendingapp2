import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'

const data = {
  income: 1200,
  expense: 240
}

export default class ShowDetails extends Component {
  displayText(text, type) {
    // if (!text) console.log('DISPLAY TEXT - ' + text)
    if (!text.income) return <Text>Loading...</Text>
    else return <Text style={styles.amount}>
                  {text[type]}
                </Text>
  }

  render() {
    // this.displayText(this.props.monthBalance, 'income')
    return (
      <View style={styles.container}>

        <View style={styles.innerContainer}>
          <Text style={styles.title}>
            Income
          </Text>
          {this.displayText(this.props.monthBalance, 'income')}
        </View>

        <View style={styles.innerContainer}>
          <Text style={styles.title}>
            Expense
          </Text>
          {this.displayText(this.props.monthBalance, 'income')}
        </View>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'stretch',
    paddingTop: 10
  },
  innerContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'center'
  },
  title: {
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 22,
    fontWeight: '500',
    color: 'rgb(0, 153, 204)',
    textAlign: 'center',
    paddingBottom: 5
  },
  amount: {
    flex: 1,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '500',
  }
})
