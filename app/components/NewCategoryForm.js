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
import { addBorder, DatePicker, DatePickerModal } from '../components'
import { Actions } from 'react-native-router-flux'

function isSelected(selected) {
  if (selected) return {backgroundColor: '#BBB'}
  else return {backgroundColor: '#FFF'}
}

export default class NewCategoryForm extends Component {
  render() {
    let incomeSelected, expenseSelected
    if (this.props.categoryType === 'Income') { incomeSelected = true, expenseSelected = false }
    else { incomeSelected = false, expenseSelected = true }
    return (
      <View style={[styles.container]}>
        <View style={[styles.typeWrapper]}>
            <TouchableHighlight
              style={[styles.typeButton, isSelected(incomeSelected)]}
              onPress={()=> this.props.onInputChange('type', 'Income')}
            >
              <Text>Income</Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={[styles.typeButton, isSelected(expenseSelected)]}
              onPress={() => this.props.onInputChange('type', 'Expense')}
            >
              <Text>Expense</Text>
            </TouchableHighlight>
        </View>
        <View style={[styles.inputWrapper]}>
          <Text style={styles.inputTitle}>
            Name:
          </Text>
          <TextInput style={styles.input}
            placeholder='Name'
            onChangeText={(value) => this.props.onInputChange('name', value)}
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
    paddingTop: 20,
    paddingLeft: 10,
    paddingRight: 10
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
