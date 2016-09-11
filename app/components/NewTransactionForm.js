import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  DatePickerIOS,
  TouchableHighlight,
  Modal,
  ListView,
  TouchableOpacity
} from 'react-native'
import Button from 'react-native-button'
import { addBorder, DatePicker, DatePickerModal } from '../components'
import { Actions } from 'react-native-router-flux'

export default class NewTransactionForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      date: new Date(),
      amount: null,
      category: null,
      notes: null,
      dateModalVisible: false,
      timeZoneOffsetInHours: (-1) * (new Date()).getTimezoneOffset() / 60,
      dataSource: null
    }
  }

  componentWillMount() {
    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.setState({
      dataSource: ds.cloneWithRows(['row 1', 'row 2']),
    })
  }

  setModalVisible = (visible) => {
    this.setState({ dateModalVisible: visible })
  }

  onDateChange = (date) => {
    this.setState({ date: date })
  }

  onInputChange = (field, value) => {
    this.setState({
      ...this.state,
      [field]: value
    })
  }

  render() {
    console.log(this.state)
    return (
      <View style={[styles.container, addBorder(3, 'red')]}>
        <View style={[styles.inputWrapper, addBorder(3, 'yellow')]}>
          <Text style={styles.inputTitle}>
            Date:
          </Text>
          <TouchableHighlight onPress={this.setModalVisible.bind(this, true)} style={styles.dateWrapper} >
            <Text style={styles.date}>
              {this.state.date.toLocaleDateString('en-GB')}
            </Text>
          </TouchableHighlight>
        </View>

        <View style={[styles.inputWrapper, addBorder(3, 'yellow')]}>
          <Text style={styles.inputTitle}>
            Amount:
          </Text>
          <TextInput style={styles.input}
            placeholder='Amount'
            onChangeText={(value) => this.onInputChange('amount', value)}
            value={this.state.Amount}
            keyboardType='numeric'
            autoCapitalize='none'
            />
        </View>

        <View style={[styles.inputWrapper, addBorder(3, 'yellow')]}>
          <Text style={styles.inputTitle} onPress={() => Actions.categoryList}>
            Category:
          </Text>
          <TouchableHighlight onPress={Actions.categoryList} style={styles.dateWrapper} >
            <TextInput style={styles.date}
              placeholder='Category'
              editable={false}
              autoCapitalize='none'
              />
          </TouchableHighlight>
        </View>

        <View style={[styles.inputWrapper, addBorder(3, 'yellow')]}>
          <Text style={styles.inputTitle}>
            Notes:
          </Text>
          <TextInput style={styles.input}
            placeholder='Notes'
            onChangeText={(value) => this.onInputChange('notes', value)}
            // value={this.state.email}
            autoCapitalize='none'
            />
        </View>
        <DatePickerModal
          setModalVisible={this.setModalVisible}
          modalVisible={this.state.dateModalVisible}
          date={this.state.date}
          timeZoneOffsetInHours={this.state.timeZoneOffsetInHours}
          onDateChange={this.onDateChange}
        />
      </View>
    )
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: 'stretch',
    backgroundColor: "#f2f2f2"
  },
  input: {
    flex: 2,
    backgroundColor: "#fff",
    fontSize: 20,
    marginBottom: 10,
    padding:10
  },
  inputTitle: {
    flex: 1,
    backgroundColor: "#fff",
    marginBottom: 10,
    padding:10,
    paddingRight: 0,
    fontWeight: '600',
    fontSize: 20
  },
  inputWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  dateWrapper: {
    flex: 2,
    backgroundColor: "#fff",
    marginBottom: 10,
    padding:10,
    paddingRight: 0
  },
  date: {
    fontWeight: '600',
    fontSize: 20
  }
})
