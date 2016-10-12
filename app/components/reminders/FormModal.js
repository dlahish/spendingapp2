import React, {Component} from 'react'
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native'
import DatePicker from 'react-native-datepicker'

export default class FormModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      date: '',
      time: '20:00',
      datetime: '2016-05-05 20:00',
      datetime1: '2016-05-05 20:00'
    };
  }

  componentWillUnmount () {
    this.props.updateDisplayValue();
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to react-native-datepicker example!
        </Text>
        <DatePicker
          style={{width: 200}}
          date={this.state.date}
          mode="date"
          placeholder="placeholder"
          format="YYYY-MM-DD"
          minDate="2016-05-01"
          maxDate="2016-06-01"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          // iconSource={require('./google_calendar.png')}
          onDateChange={(date) => {this.setState({date: date});}}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  }
});

FormModal.propTypes = {
  renderScene: React.PropTypes.func,
  updateDisplayValue: React.PropTypes.func
};
