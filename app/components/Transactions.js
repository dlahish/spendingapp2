import React, { Component, PropTypes } from 'react'
import { View, Text, ScrollView, TouchableHighlight } from 'react-native'
import { getTransactions } from '../actions/data'
import { bindActionCreators } from 'redux'
import * as dataActions from '../actions/data'
import * as formActions from '../actions/form'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import { ItemRow, ChangeMonthArrows, MonthHeader, MenuModal} from '../components'
import I18n from 'react-native-i18n'
import SearchBar from 'react-native-search-bar'
import {searchTransactions} from '../functions/transactionsSearchAndFilter'

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
      selectedItemIndex: null,
      searchValue: '',
      isOpen: false,
      isDisabled: false,
      swipeToClose: true
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

  openModal = () => {
    this.setState({isOpen: true})
  }

  closeModal = () => {
    this.setState({isOpen: false});
  }

  render() {
    const p = this.props
    const transactionsToRender = searchTransactions(p.visibleTransactions, this.state.searchValue)

    return (
      <View style={styles.container}>

        <MonthHeader
          currentMonthName={p.currentMonthName}
          onPressLeft={() =>
            p.actions.data.setMonth('previous',
              p.currentMonthIndex,
              p.yearTotal,
              p.transactions)}
          onPressRight={() => p.actions.data.setMonth('next',
              p.currentMonthIndex,
              p.yearTotal,
              p.transactions)}
          onSortPress={() => this.openModal()}
        />

        <ScrollView contentOffset={{y:50}}>

            <View style={{paddingBottom: 20, backgroundColor: '#c8c7cc'}}>
              <SearchBar
                ref='searchBar'
                placeholder='Search Category, Amount or Notes'
                text={p.searchTransactionsValue}
                onChangeText={(value) => this.setState({searchValue: value})}
                onSearchButtonPress={() => this.refs.searchBar.unFocus() }
                onCancelButtonPress={() => this.setState({searchValue: ''})}
                showsCancelButton={true}
                />
            </View>

            {transactionsToRender.map((transaction, i) =>
              <ItemRow
                key={i}
                itemIndex={i}
                editMode={p.editMode}
                selected={i === this.state.selectedItemIndex ? true : false}
                item={transaction}
                mainText={setMainText(transaction)}
                rightText={I18n.toCurrency(Math.abs(transaction.amount),
                  {unit: getSymbol(p.currencySymbol),
                  format: "%u %n",
                  sign_first: false,
                  precision: 0})}
                rightTextStyle={setAmountColor(transaction.type)}
                secondaryText={new Date(transaction.date).toLocaleDateString('en-GB')}
                onSelecetItem={this.onSelecetItem}
                onDeleteItem={p.removeTransaction}
              />
            )}
        </ScrollView>

        <MenuModal
          isOpen={this.state.isOpen}
          closeModal={this.closeModal}
          button1='Date'
          button1OnPress={() => console.log('button 1 was pressed')}
          button2='Amount'
          button2OnPress={() => console.log('button 2 was pressed')}
          button3='Category'
          button3OnPress={() => console.log('button 3 was pressed')}
        />

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
    currencySymbol: state.settings.currencySymbol,
    transactionsSearchValue: state.form.transactionsSearchValue
  }),
  (dispatch) => ({
    actions: {
      data: bindActionCreators(dataActions, dispatch),
      form: bindActionCreators(formActions, dispatch)
    }
  }))(Transactions)

const styles = {
  container: {
    flex: 1,
    paddingTop: 64,
    paddingBottom: 50
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
