import React, { Component, PropTypes } from 'react'
import { View, Text, StyleSheet, AsyncStorage } from 'react-native'

export default class Transactions extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>
          Hello Transactions
        </Text>
      </View>
    )
  }
}

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
}
