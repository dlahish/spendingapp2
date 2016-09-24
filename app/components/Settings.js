import React, { PropTypes, Component } from 'react'
import { Text, View, StyleSheet, ScrollView } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as settingsActionCreators from '../actions/settings'

const propTypes = {
  selected: PropTypes.bool,
  title: PropTypes.string
}

SettingLine = (props) => {
  return (
    <View style={styles.settingLine}>
      <View>
        <Text style={styles.text}>{props.subject}</Text>
      </View>
      <View>
        <Text style={styles.text}>{props.value}</Text>
      </View>
    </View>
  )
}
class Settings extends Component {
  render() {
    return (
      <ScrollView style={styles.container}>
        <SettingLine subject='Curreny Symbol' value={this.props.currencySymbol}/>
      </ScrollView>
    )
  }
}

Settings.propTypes = propTypes;

const styles = {
  container: {
    flex: 1,
    marginTop: 64
  },
  settingLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#eee',
    paddingLeft: 10,
    paddingRight: 10,
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
