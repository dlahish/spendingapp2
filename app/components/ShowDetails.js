import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'

const data = {
  income: 1200,
  expense: 240
}

export default ShowDetails = (props) => {
  return (
    <View style={styles.container}>

      <View style={styles.innerContainer}>
        <Text style={styles.title}>
          Income
        </Text>
        <Text style={styles.amount}>
          {data.income}
        </Text>
      </View>

      <View style={styles.innerContainer}>
        <Text style={styles.title}>
          Expense
        </Text>
        <Text style={styles.amount}>
          {data.expense}
        </Text>
      </View>

    </View>
  )
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
