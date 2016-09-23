import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  DatePickerIOS,
  TouchableHighlight
} from 'react-native'
import Button from 'react-native-button'
import { addBorder, DatePicker, DatePickerModal, CategorySelector } from '../components'
import { Actions } from 'react-native-router-flux'

export default class NewCategoryForm extends Component {
  render() {
    let incomeSelected, expenseSelected
    if (this.props.categoryType === 'Income') { incomeSelected = true, expenseSelected = false }
    else { incomeSelected = false, expenseSelected = true }

    return (
      <View style={styles.container}>
        <CategorySelector
          incomeSelected={incomeSelected}
          expenseSelected={expenseSelected}
          onTypeChange={this.props.onTypeChange}
        />

        <View style={[styles.inputWrapper]}>
          <Text style={styles.inputTitle}>
            Name:
          </Text>
          <TextInput style={styles.input}
            placeholder='Name'
            onChangeText={(value) => this.props.onInputChange('name', value)}
            value={this.props.amount}
            maxLength = {10}
            multiline={true}
            numberOfLines = {1}
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
    backgroundColor: "#FFF"
  },
  inputWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 10,
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
  input: {
    flex: 2,
    backgroundColor: "#fff",
    fontSize: 20,
    marginBottom: 10,
    padding:10,
    borderBottomWidth: 2,
    borderBottomColor: '#BBBBBB'
  },
  typeWrapper: {
    flexDirection: 'row',
    marginBottom: 20,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5
  },
  typeButton: {
    flex:1,
    alignItems: 'center',
    borderRadius: 5
  }
})

NewCategoryForm.propTypes = {
  onInputChange: PropTypes.func.isRequired,
  categoryType: PropTypes.string.isRequired
}
