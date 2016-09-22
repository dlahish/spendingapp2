import React, { PropTypes, Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'

const propTypes = {
  selected: PropTypes.bool,
  title: PropTypes.string
}

class Settings extends Component {
  render() {
    return (
      <View>
        <Text>hello Settings</Text>
      </View>
    )
  }
}

Settings.propTypes = propTypes;

export default Settings;
