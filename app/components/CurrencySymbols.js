import React, { PropTypes, Component } from 'react'
import { Text, View, StyleSheet, ScrollView, TouchableHighlight } from 'react-native'
import { Actions } from 'react-native-router-flux'

symbols = ['default',36,8364,8362,163,'CHF']

function getSymbol(symbol) {
  if (typeof symbol === 'number') return String.fromCharCode(symbol)
  else return symbol
}

export default CurrencySymbols = (props) => {
  onSymbolPress = (symbol) => {
    props.saveCurrancySymbol(symbol)
    Actions.pop()
  }

  return (
    <ScrollView style={styles.container}>
      {symbols.map((symbol,i) =>
        <TouchableHighlight style={styles.symbolLine} key={i} onPress={() => this.onSymbolPress(symbol)}>
          <Text style={{fontSize: 20}}>{getSymbol(symbol)}</Text>
        </TouchableHighlight>
      )}
    </ScrollView>
  )
}

const styles = {
  container: {
    marginTop: 64
  },
  symbolLine: {
    backgroundColor: '#eee',
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 5,
    paddingBottom: 5,
    borderBottomColor: '#000',
    borderBottomWidth: 0.5
  }
}
