import React, { Component } from 'react'
import { GiftedForm, GiftedFormManager } from 'react-native-gifted-form'
import Icon from 'react-native-vector-icons/FontAwesome'
const upArrow = (<Icon name='angle-up' size={24} color='black' style={{paddingLeft: 10}}/>)
import DatePicker from 'react-native-datepicker'
import { Actions, ActionConst } from 'react-native-router-flux'
import { View, Text } from 'react-native'

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
          <GiftedForm.OptionWidget   image={upArrow} title='Borrow' value='borrow'/>
          <GiftedForm.OptionWidget   image={upArrow} title='Lent' value='lent'/>
        </GiftedForm.SelectWidget>

        <GiftedForm.SeparatorWidget />
        <GiftedForm.GroupWidget title='enter details'/>
        <GiftedForm.TextInputWidget
          name='name'
          title='Name'
          placeholder='Enter name'
          clearButtonMode='while-editing'
          value={name}
          image={upArrow}
        />
        <GiftedForm.TextInputWidget
          name='amount'
          title='Amount'
          placeholder='Enter amount'
          clearButtonMode='while-editing'
          value={amount}
          image={upArrow}
        />
        <GiftedForm.RowDatePicker
          name='dateRow'
          title='Date'
          placeholder='Enter date'
          image={upArrow}
          date={date}
          onDateChange={onDateChange}
        />
        <GiftedForm.TextAreaWidget
          name='notes'
          title='Notes'
          placeholder='Enter Notes'
          clearButtonMode='while-editing'
          value={notes}
          image={upArrow}
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
              console.log('submitted', values)
              GiftedFormManager.reset('newReminderForm')
              this.props.onSubmitReminder()
              // postSubmit(['An error occurred, please try again'])
              // prepare object
              // values.gender = values.gender[0];
              // values.birthday = moment(values.birthday).format('YYYY-MM-DD');

              /* Implement the request to your server using values variable
              ** then you can do:
              ** postSubmit(); // disable the loader
              ** postSubmit(['An error occurred, please try again']); // disable the loader and display an error message
              ** postSubmit(['Username already taken', 'Email already taken']); // disable the loader and display an error message
              ** GiftedFormManager.reset('signupForm'); // clear the states of the form manually. 'signupForm' is the formName used
              */
            } else {
              console.log('validationResults', validationResults)

            }
          }}
        />
      </GiftedForm>
    )
  }
}
