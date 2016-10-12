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
import * as dataActions from '../../actions/data'
import * as formActions from '../../actions/form'
import ActionButton from 'react-native-action-button'
import Icon from 'react-native-vector-icons/Ionicons'
import { Actions } from 'react-native-router-flux'
import { ItemRow } from '../../components'

import {
  setAmountColor,
  setMainText,
  getSymbol } from '../../functions/transactionsScene'

const data = [
  {
    type: 'receive',
    name: 'Yoni',
    note: 'grocery shopping',
    date: '',
    amount: 200
  },
  {
    type: 'lent',
    name: 'Rotem',
    note: 'beer',
    date: '',
    amount: 50
  }
]

class Reminders extends Component {
  render() {
    const p = this.props
    return (
      <View style={styles.container}>

          <ScrollView style={{flex: 1}}>
            {data.map((d,i) =>
              <ItemRow
                key={i}
                itemIndex={i}
                // editMode={p.editMode}
                // selected={i === this.state.selectedItemIndex ? true : false}
                item={d}
                mainText={d.name}
                rightText={I18n.toCurrency(Math.abs(d.amount),
                  {unit: getSymbol(p.currencySymbol),
                  format: "%u %n",
                  sign_first: false,
                  precision: 0})}
                rightTextStyle={setAmountColor(d.type)}
                secondaryText={`${(new Date(d.date).toLocaleDateString('en-GB'))}, ${d.note}`}
                // onSelecetItem={this.onSelecetItem}
                // onDeleteItem={p.removeTransaction}
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
          </ActionButton>

      </View>
    )
  }
}


var styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    paddingTop: 64,
    backgroundColor: 'rgb(253,253,253)',
  },
  actionButtonIcon: {
    fontSize: 10,
    height: 10,
    color: 'white',
  }
})

export default connect(
  (state) => ({
    currencySymbol: state.settings.currencySymbol
  }),
  (dispatch) => ({
    actions: {
      data: bindActionCreators(dataActions, dispatch)
    }
  })
)(Reminders)
