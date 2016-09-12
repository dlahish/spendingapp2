import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Button from 'react-native-button'
import { NewTransactionForm, NewTransactionNavBar, addBorder } from '../components'
import { Actions } from 'react-native-router-flux'

export default () => {
  onPress = () => {
    Actions.pop()
  }

  return (
    <View style={styles.container}>
      <NewTransactionNavBar onPress={onPress}/>
      <NewTransactionForm />
    </View>
  )
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch'
  }
})
