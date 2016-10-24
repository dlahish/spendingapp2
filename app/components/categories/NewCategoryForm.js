import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Button from 'react-native-button'
import { GiftedForm, GiftedFormManager } from 'react-native-gifted-form'
import { addBorder, CategorySelector, RowWidgetWithTitle } from '../../components'
import { Actions } from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/Ionicons'
import {
  View,
  Text,
  StyleSheet,
  TextInput
} from 'react-native'

function getIcon(icon) {
  if (icon) return <Icon name={icon} size={16} color='black' style={{paddingLeft: 10}}/>
  return ''
}

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

        <GiftedForm
          formName='newCategoryForm'
          onValueChange={(values) => {
            this.props.handleValueChange(values, GiftedFormManager.validate('newCategoryForm'))
          }}
          validators={{
            name: {
              title: 'Category',
              validate: [{
                validator: 'isLength',
                arguments: [1, 15],
                message: '{TITLE} is required'
              }]
            }
          }}
        >
            <GiftedForm.TextInputWidget
              name='name'
              title='Category'
              placeholder='Category name'
              clearButtonMode='while-editing'
              value={this.props.categoryName}
              image={getIcon('md-person')}
            />

            <RowWidgetWithTitle
              title='Icon'
              disclosure={true}
              onPress={() => Actions.categoryIcons()}
              image={getIcon('ios-list-box')}
              mainContent={getIcon(this.props.iconName)}
              placeholder='Select an icon'
            />

            <GiftedForm.NoticeWidget title={this.props.error} style={{color: 'red'}}/>

        </GiftedForm>
        {/* <View style={[styles.inputWrapper]}>
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
        </View> */}
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
  categoryType: PropTypes.string.isRequired,
  iconName: PropTypes.string
}
