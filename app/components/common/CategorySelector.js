import React, { Component, PropTypes } from 'react'
import {
  View,
  Text,
  TouchableHighlight,
} from 'react-native'

function isSelected(selected, type) {
  if (type === 'button') {
    if (selected) return {backgroundColor: '#BBB'}
    else return {backgroundColor: '#FFF'}
  } else {
    if (selected) return {fontSize: 17, fontWeight: 'bold'}
  }
}

export default CategorySelector = (props) => {
  const {
    incomeSelected,
    expenseSelected,
    onTypeChange
  } = props

  return (
    <View style={[styles.categoryTypeWrapper]}>
      <TouchableHighlight
        style={[styles.categoryTypeButton, {borderTopLeftRadius: 5, borderBottomLeftRadius: 5}, isSelected(incomeSelected, 'button')]}
        onPress={()=> onTypeChange('Income')}
      >
        <Text style={isSelected(incomeSelected, 'text')}>Income</Text>
      </TouchableHighlight>
      <TouchableHighlight
        style={[styles.categoryTypeButton, {borderTopRightRadius: 5, borderBottomRightRadius: 5}, isSelected(expenseSelected, 'button')]}
        onPress={() => onTypeChange('Expense')}
      >
        <Text style={isSelected(expenseSelected, 'text')}>Expense</Text>
      </TouchableHighlight>
    </View>
  )
}

const styles = {
  categoryTypeWrapper: {
    flexDirection: 'row',
    marginBottom: 20,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    padding: 10,
    backgroundColor: '#6666ff',
  },
  categoryTypeButton: {
    flex:1,
    alignItems: 'center',
    paddingTop: 5,
    paddingBottom: 5
  }
}
