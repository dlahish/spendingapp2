import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
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

export default class NewCategoryForm extends Component {
  render() {
    return (
      <View style={[styles.container]}>
        <View style={[styles.inputWrapper]}>
          <Text style={styles.inputTitle}>
            Name:
          </Text>
          <TextInput style={styles.input}
            placeholder='Name'
            onChangeText={(value) => this.props.onInputChange(value)}
            value={this.props.amount}
            maxLength = {10}
          />
        </View>
      </View>
    )
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    backgroundColor: "#FFF",
    paddingTop: 20
  },
  input: {
    flex: 2,
    backgroundColor: "#fff",
    fontSize: 20,
    marginBottom: 10,
    padding:10,
    borderBottomWidth: 1,
    borderBottomColor: '#828287'
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
    flexDirection: 'row',
    marginBottom: 10
  },
  notesWrapper: {
    height: 84,
    alignItems: 'flex-start'
  },
  notesTitle: {
    flex: 1,
    height: 74,
    backgroundColor: "#fff",
    marginBottom: 10,
    padding:10,
    paddingRight: 0,
    fontWeight: '600',
    fontSize: 20
  },
  touchableHighlight: {
    flex: 2,
    backgroundColor: "#fff",
    marginBottom: 10,
    padding:10,
    paddingRight: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#828287'
  },
  date: {
    flex: 1,
    fontWeight: '600',
    fontSize: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#828287'
  },
  categoryPlaceHolder: {
    flex: 1,
    fontSize: 20,
    opacity: 0.5,
    fontWeight: '400',
    paddingTop: 10
  },
  errorWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 10
  },
  error: {
    color: 'red',
    fontSize: 20,
    marginBottom: 10,
    padding:10
  }
})

NewCategoryForm.propTypes = {
  onInputChange: PropTypes.func.isRequired
}
