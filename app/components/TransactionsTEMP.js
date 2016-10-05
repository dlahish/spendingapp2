import React, { Component, PropTypes } from 'react'
import { View, Text, ScrollView, TouchableHighlight } from 'react-native'
import { getTransactions } from '../actions/data'
import { bindActionCreators } from 'redux'
import * as dataActions from '../actions/data'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import { ItemRow, ChangeMonthArrows } from '../components'
import I18n from 'react-native-i18n'

function setAmountColor(type) {
  if (type === 'Income') return {color: 'green'}
  else return {color: 'red'}
}

function setMainText(transaction) {
  if (transaction.notes) return transaction.notes
  else return transaction.category
}

function getSymbol(symbol) {
  if (symbol === 'default') return null
  if (typeof symbol === 'number') return String.fromCharCode(symbol)
  else return symbol
}

class Transactions extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedItemIndex: null
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.selectedItemIndex) this.setState({selectedItemIndex: null})
  }

  onSelecetItem = (itemIndex, selected, transaction) => {
    const selectedItemIndex = this.state.selectedItemIndex
    if (this.props.editMode) {
        if (selected) this.setState({ selectedItemIndex: null})
        else if (selectedItemIndex !== null && itemIndex !== selectedItemIndex) this.setState({ selectedItemIndex: null})
        else this.setState({ selectedItemIndex: itemIndex })
    } else {
        Actions.newTransaction({isEdit: true, transaction})
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.monthHeader}>
          <View style={styles.monthWrapper}>
            <Text style={styles.monthText}>
              {this.props.currentMonthName}
            </Text>
          </View>
          <View style={styles.monthArrows}>
            <ChangeMonthArrows
              onPressLeft={() =>
                this.props.actions.data.setMonth('previous',
                                                  this.props.currentMonthIndex,
                                                  this.props.yearTotal,
                                                  this.props.transactions)}
              onPressRight={() => this.props.actions.data.setMonth('next',
                                                                    this.props.currentMonthIndex,
                                                                    this.props.yearTotal,
                                                                    this.props.transactions)}
            />
          </View>
        </View>
        <ScrollView>
            {this.props.visibleTransactions.map((transaction, i) =>
              <ItemRow
                key={i}
                itemIndex={i}
                editMode={this.props.editMode}
                selected={i === this.state.selectedItemIndex ? true : false}
                item={transaction}
                mainText={setMainText(transaction)}
                rightText={I18n.toCurrency(Math.abs(transaction.amount),
                  {unit: getSymbol(this.props.currencySymbol),
                  format: "%u %n",
                  sign_first: false,
                  precision: 0})}
                rightTextStyle={setAmountColor(transaction.type)}
                secondaryText={new Date(transaction.date).toLocaleDateString('en-GB')}
                onSelecetItem={this.onSelecetItem}
                onDeleteItem={this.props.removeTransaction}
              />
            )}
        </ScrollView>
      </View>
    )
  }
}

export default connect(
  (state) => ({
    transactions: state.data.transactions['2016'],
    visibleTransactions: state.data.visibleTransactions,
    currentMonthName: state.data.currentMonthName,
    currentMonthIndex: state.data.currentMonthIndex,
    yearTotal: state.data.yearTotal,
    currencySymbol: state.settings.currencySymbol
  }),
  (dispatch) => ({
    actions: {
      data: bindActionCreators(dataActions, dispatch)
    }
  }))(Transactions)

const styles = {
  container: {
    flex: 1,
    paddingTop: 64,
    paddingBottom: 50
  },
  monthHeader: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 5,
    marginBottom: 5
  },
  monthWrapper: {
    borderColor: '#BBB',
    borderWidth: 2,
    borderRadius: 5,
    paddingTop: 2,
    paddingBottom: 2,
    paddingLeft: 5,
    paddingRight: 5
  },
  monthText: {
    fontSize: 18
  },
  transactionRow: {
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 5,
    paddingTop: 5
  },
  nameAndAmount: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  date: {
    fontSize: 12
  },
  text: {
    fontSize: 22
  },
  icon: {
    paddingRight: 10,
    alignItems: 'center',
    justifyContent: 'center'
  }
}