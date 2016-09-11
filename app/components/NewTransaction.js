import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Button from 'react-native-button'
import { NewTransactionForm, addBorder } from '../components'

export default () => {
  return (
    <View style={[styles.container, addBorder(2, 'black')]}>
      <NewTransactionForm />
    </View>
  )
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch'
    // justifyContent: "center",
    // alignItems: "center",
    // backgroundColor: "#f2f2f2"
  }
})
