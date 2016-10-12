import React, { Component, PropTypes } from 'react'
import { View, StyleSheet } from 'react-native'
// import I18n from 'react-native-i18n'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as remindersActions from '../../actions/reminders'
// import * as formActions from '../../actions/form'
// import ActionButton from 'react-native-action-button'
// import Icon from 'react-native-vector-icons/Ionicons'
import { Actions } from 'react-native-router-flux'
// import { ItemRow } from '../../components'
import NewReminderForm from './NewReminderForm'

class NewReminder extends Component {
  constructor(props) {
    super(props)
    this.state = {
      form: {
        name: '',
        type: '',
        amount: '',
        date: new Date(),
        notes: ''
      }
    }
  }

  handleValueChange = (values) => {
    console.log('handleValueChange', values)
    values.date = this.state.form.date
    this.setState({ form: values })
  }

  onDateChange = (date) => {
    this.setState({ ...this.state, form: {...this.state.form, date: date } })
  }

  onSubmitReminder = () => {
    this.props.actions.reminders.setNewReminder(this.state.form)
    Actions.pop()
  }

  render() {
    console.log('new reminder form state -  ', this.state.form)
    return (
      <View style={styles.container}>
        <NewReminderForm
          date={this.state.form.date}
          name={this.state.form.name}
          type={this.state.form.type}
          amount={this.state.form.amount}
          notes={this.state.form.notes}
          handleValueChange={this.handleValueChange}
          onDateChange={this.onDateChange}
          onSubmitReminder={this.onSubmitReminder}
        />
      </View>
    )
  }
}


var styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 64,
    backgroundColor: 'rgb(253,253,253)',
  }
})

export default connect(
  (state) => ({}),
  (dispatch) => ({
    actions: {
      reminders: bindActionCreators(remindersActions, dispatch)
    }
  })
)(NewReminder)
