import React, { Component, PropTypes } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  ScrollView
} from 'react-native'
import I18n from 'react-native-i18n'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as remindersActions from '../../actions/reminders'
import ActionButton from 'react-native-action-button'
import Icon from 'react-native-vector-icons/Ionicons'
import { Actions } from 'react-native-router-flux'
import { ItemRow } from '../../components'

import {
  setAmountColor,
  setMainText,
  getSymbol } from '../../functions/transactionsScene'

function filterReminders(reminders, title) {
  let filteredReminders
  if (title === 'Reminders') filteredReminders = reminders.filter((reminder) => !reminder.completed)
  else filteredReminders = reminders.filter((reminder) => reminder.completed)
  return filteredReminders
}

class Reminders extends Component {
  onCheckRow = (itemId) => {
    this.props.actions.reminders.setCheckedReminder(itemId)
  }

  render() {
    const p = this.props
    const filteredReminders = filterReminders(p.reminders, p.title)
    return (
      <View style={styles.container}>
        <ScrollView style={{flex: 1}}>
          {p.reminders.map((reminder,i) =>
            <ItemRow
              key={i}
              itemIndex={i}
              icon='checkBox'
              completed={reminder.completed}
              onCheckRow={this.onCheckRow}
              item={reminder}
              mainText={reminder.name}
              rightText={I18n.toCurrency(Math.abs(reminder.amount),
                {unit: getSymbol(reminder.currencySymbol),
                format: "%u %n",
                sign_first: false,
                precision: 0})}
              rightTextStyle={setAmountColor(reminder.type[0])}
              secondaryText={
                `${(new Date(reminder.date).toLocaleDateString('en-GB'))}, ${reminder.notes}, ${reminder.type[0]}`}
              onSelecetItem={() => {}}
            />
          )}
        </ScrollView>

        <ActionButton buttonColor="rgba(231,76,60,1)" offsetY={40} offsetX={15}>
          <ActionButton.Item
            buttonColor='#9b59b6'
            title="New Reminder"
            onPress={() => Actions.newReminder()}>
            <Icon name="md-create" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item
            buttonColor='#1abc9c'
            title="Clear all completed reminders"
            onPress={() => this.props.actions.reminders.clearCompletedReminders()}>
            <Icon name="md-warning" style={[styles.actionButtonIcon, {fontSize: 20}]}/>
          </ActionButton.Item>
        </ActionButton>
      </View>
    )
  }
}


var styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 64,
    backgroundColor: 'rgb(253,253,253)',
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 20,
    color: 'white',
  }
})

export default connect(
  (state) => ({
    currencySymbol: state.settings.currencySymbol,
    reminders: state.reminders.reminders
  }),
  (dispatch) => ({
    actions: {
      reminders: bindActionCreators(remindersActions, dispatch)
    }
  })
)(Reminders)
