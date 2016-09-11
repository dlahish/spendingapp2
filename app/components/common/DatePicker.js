import React, { Component } from 'react'
import { DatePickerIOS, StyleSheet, View } from 'react-native'

export default class DatePickerExample extends Component {
  render() {
    return (
      <View>
        <DatePickerIOS
          date={this.props.date}
          mode="date"
          timeZoneOffsetInMinutes={this.props.timeZoneOffsetInHours * 60}
          onDateChange={this.props.onDateChange}
          style={{width: 300}}
        />
      </View>
    );
  }
}
