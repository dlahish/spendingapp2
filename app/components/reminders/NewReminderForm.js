import React, { Component } from 'react'
import { GiftedForm, GiftedFormManager } from 'react-native-gifted-form'
import Icon from 'react-native-vector-icons/Ionicons'
// const upArrow = (<Icon name='angle-up' size={24} color='black' style={{paddingLeft: 10}}/>)
import DatePicker from 'react-native-datepicker'
import { Actions, ActionConst } from 'react-native-router-flux'
import { View, Text } from 'react-native'

function getIcon(name) {
  return <Icon name={name} size={16} color='black' style={{paddingLeft: 10}}/>
}

export default class NewReminderForm extends Component {
  render() {
    const { name, type, amount, date, notes, handleValueChange, onDateChange } = this.props
    return (
      <GiftedForm
        formName='newReminderForm'
        openModal={route => Actions.formModal({ ...route, title: route.getTitle() })}
        onValueChange={handleValueChange}
        validators={{
          name: {
            title: 'name',
            validate: [{
              validator: 'isLength',
              arguments: [1, 15],
              message: '{TITLE} is required'
            }]
          },
          amount: {
            title: 'Amount',
            validate: [{
              validator: 'isNumeric',
              message: '{TITLE} must be a number'
            }]
          },
          type: {
            title: 'Type',
            validate: [{
              validator: (...args) => {
                if (args[0] === undefined) {
                  return false;
                }
                return true;
              },
              message: '{TITLE} is required',
            }]
          }
        }}
      >
        <GiftedForm.SeparatorWidget />
        <GiftedForm.GroupWidget title='Choose One'/>
        <GiftedForm.SelectWidget name='type' title='Type' multiple={false}>
          <GiftedForm.OptionWidget image={getIcon('ios-arrow-down')} title='Borrow' value='borrow'/>
          <GiftedForm.OptionWidget image={getIcon('ios-arrow-up')} title='Lent' value='lent'/>
        </GiftedForm.SelectWidget>

        <GiftedForm.SeparatorWidget />
        <GiftedForm.GroupWidget title='enter details'/>
        <GiftedForm.TextInputWidget
          name='name'
          title='Name'
          placeholder='Enter name'
          clearButtonMode='while-editing'
          value={name}
          image={getIcon('md-person')}
        />
        <GiftedForm.TextInputWidget
          name='amount'
          title='Amount'
          placeholder='Enter amount'
          clearButtonMode='while-editing'
          value={amount}
          image={getIcon('ios-cash')}
        />
        <GiftedForm.RowDatePicker
          name='dateRow'
          title='Date'
          placeholder='Enter date'
          image={getIcon('ios-calendar')}
          date={date}
          onDateChange={onDateChange}
        />
        <GiftedForm.TextAreaWidget
          name='notes'
          title='Notes'
          placeholder='Enter Notes'
          clearButtonMode='while-editing'
          value={notes}
        />
        <GiftedForm.ErrorsWidget />
        <GiftedForm.SubmitWidget
          title='Add new reminder'
          widgetStyles={{
            submitButton: {
              backgroundColor: 'green',
            }
          }}
          onSubmit={(isValid, values, validationResults, postSubmit = null, modalNavigator = null) => {
            if (isValid === true) {
              values.date = date
              GiftedFormManager.reset('newReminderForm')
              this.props.onSubmitReminder(isValid)
            } else {
              console.log('validationResults', validationResults)

            }
          }}
        />
      </GiftedForm>
    )
  }
}
