import React, { PropTypes, Component } from 'react'
import { Text, View, StyleSheet, ScrollView, TouchableHighlight } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as settingsActionCreators from '../actions/settings'

SettingLine = (props) => {
  return (
    <TouchableHighlight onPress={() => Actions.currencySymbols({setCurrencySymbol: props.setCurrencySymbol})}>
      <View style={styles.settingLine}>
        <View>
          <Text style={styles.text}>{props.subject}</Text>
        </View>
        <View>
          <Text style={styles.text}>{props.value}</Text>
        </View>
      </View>
    </TouchableHighlight>
  )
}

function getSymbol(symbol) {
  if (typeof symbol === 'number') return String.fromCharCode(symbol)
  else return symbol
}

class Settings extends Component {
  render() {
    return (
      <ScrollView style={styles.container}>
        <SettingLine
          subject='Currency Symbol'
          value={getSymbol(this.props.currencySymbol)}
          setCurrencySymbol={this.props.setCurrencySymbol}/>
      </ScrollView>
    )
  }
}

const styles = {
  container: {
    flex: 1,
    marginTop: 64
  },
  settingLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#eee',
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 5,
    paddingBottom: 5
  },
  text: {
    fontSize: 20
  }
}

export default connect(
  (state) => ({ currencySymbol: state.settings.currencySymbol }),
  (dispatch) => (bindActionCreators(settingsActionCreators, dispatch))
)(Settings)
