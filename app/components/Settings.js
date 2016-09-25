import React, { PropTypes, Component } from 'react'
import { Text, View, StyleSheet, ScrollView, TouchableHighlight } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as settingsActionCreators from '../actions/settings'
import Icon from 'react-native-vector-icons/FontAwesome'
const smallRightArrow = (<Icon name='angle-right' size={22} />)
import { UserActions, addBorder } from '../components'

SettingLine = (props) => {
  return (
    <TouchableHighlight onPress={() => Actions.currencySymbols({setCurrencySymbol: props.setCurrencySymbol})}>
      <View style={styles.settingLine}>
        <View>
          <Text style={styles.text}>{props.subject}</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.text}>{props.value}</Text>
          <View>{smallRightArrow}</View>
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
      <View style={{flex: 1}}>
        <View>
          <ScrollView style={styles.scrollView}>
            <SettingLine
              subject='Currency Symbol'
              value={getSymbol(this.props.currencySymbol)}
              setCurrencySymbol={this.props.actions.settings.setCurrencySymbol}/>
          </ScrollView>
        </View>

        <View style={[styles.actionsWrapper, addBorder(2, 'black')]}>
          <View style={styles.actions}>
            <UserActions handleLogout={this.props.actions.account.logoutAndUnauthUser} />
          </View>
        </View>

      </View>

    )
  }
}

const styles = {
  scrollView: {
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
    fontSize: 20,
    paddingRight: 10
  },
  actionsWrapper: {
    flex: 1,
    paddingBottom: 60,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  actions: {
    // alignItems: 'center',
    // justifyContent: 'flex-end'
  }
}

export default connect(
  (state) => ({ currencySymbol: state.settings.currencySymbol }),
  (dispatch) => ({
    actions: {
      settings: bindActionCreators(settingsActionCreators, dispatch),
      account:  bindActionCreators(settingsActionCreators, dispatch)
    }})
)(Settings)
