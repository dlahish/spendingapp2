import React, { Component } from 'react'

import {
  StyleSheet,
  Text,
  View,
} from 'react-native'
import * as Progress from 'react-native-progress'

function getProgress(income, expense) {
  if (income === expense) return 0.5
  if (income === 0 && expense > 0) return 0
  if (expense === 0 && income > 0) return 1
  if (income > expense) {
    return ((1 - expense / income) * 0.5) + 0.5
  } else {
    return (income / expense) * 0.5
  }
}

export default ProgressBar = (props) => {
  return (
    <View style={styles.container}>
      <Progress.Bar
        style={styles.progress}
        progress={getProgress(props.currentMonthTotal.income, props.currentMonthTotal.expenses)}
        indeterminate={false}
        color='#2ecc71'
        unfilledColor='#ff4d4d'
        borderWidth={0}
        height={8}
        width={250}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 5,
  },
  progress: {

  }
})
