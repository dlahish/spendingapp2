import React, { Component, PropTypes } from 'react'
import { View, Text, ScrollView, TouchableHighlight } from 'react-native'
import { getTransactions } from '../../actions/data'
import { bindActionCreators } from 'redux'
import * as dataActions from '../../actions/data'
import * as formActions from '../../actions/form'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import {
  ItemRow,
  ChangeMonthArrows,
  MonthHeader, MenuModal,
  FilteredAndSortedTransactionsTotal } from '../../components'
import I18n from 'react-native-i18n'
import SearchBar from 'react-native-search-bar'
import {searchTransactions, sortTransactions} from '../../functions/transactionsSearchAndFilter'
import Icon from 'react-native-vector-icons/FontAwesome'
const upArrow = (<Icon name='angle-up' size={24} color='#FFF' />)
import {
  setAmountColor,
  setMainText,
  getSymbol } from '../../functions/transactionsScene'

class Transactions extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedItemIndex: null,
      searchValue: '',
      isOpen: false,
      isDisabled: false,
      swipeToClose: true,
      sortType: '',
      dateSortDirection: true,
      amountSortDirection: true,
      categorySortDirection: true,
      scrollY: 44
    }
  }

  componentDidMount() {
    this.refs._scrollView.scrollTo({y: this.state.scrollY})
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
        Actions.newTransaction({editMode: true, transaction})
    }
  }

  openModal = () => {
    this.setState({isOpen: true})
  }

  closeModal = () => {
    this.setState({isOpen: false})
  }

  setFilter = (filter) => {
    this.setState({
      sortType: filter,
      [`${filter}SortDirection`]: !this.state[`${this.state.sortType}SortDirection`],
      isOpen: false
    })

  }

  render() {
    const p = this.props
    let transactionsToRender = searchTransactions(p.visibleTransactions, this.state.searchValue)
    transactionsToRender = sortTransactions(transactionsToRender,
                                            this.state.sortType,
                                            this.state[`${this.state.sortType}SortDirection`])

    return (
      <View style={styles.container}>

        <MonthHeader
          currentMonthName={p.currentMonthName}
          onPressLeft={() => {
            p.actions.data.setMonth('previous',
              p.currentMonthIndex,
              p.yearTotal,
              p.transactions)
            this.refs._scrollView.scrollTo({y: this.state.scrollY})}}
          onPressRight={() => {
            p.actions.data.setMonth('next',
              p.currentMonthIndex,
              p.yearTotal,
              p.transactions)
            this.refs._scrollView.scrollTo({y: this.state.scrollY})}}
          onSortPress={() => this.openModal()}
        />

        {/* contentOffset={{y:44}} */}
        <ScrollView ref='_scrollView'>

            <View style={{backgroundColor: '#c8c7cc'}}>
              <SearchBar
                ref='searchBar'
                placeholder='Search Category, Amount or Notes'
                text={p.searchTransactionsValue}
                onChangeText={(value) => this.setState({searchValue: value})}
                onSearchButtonPress={() => this.refs.searchBar.unFocus() }
                onCancelButtonPress={() => {
                  this.setState({searchValue: ''})
                  this.refs._scrollView.scrollTo({y: this.state.scrollY})}}
                showsCancelButton={true}/>

              <View style={{alignItems: 'center', justifyContent: 'center'}}>{upArrow}</View>

              <FilteredAndSortedTransactionsTotal
                transactions={transactionsToRender}
                currencySymbol={this.props.currencySymbol}/>

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
                secondaryText={`${(new Date(transaction.date).toLocaleDateString('en-GB'))}, ${transaction.category}`}
                onSelecetItem={this.onSelecetItem}
                onDeleteItem={p.removeTransaction}
              />
            )}
        </ScrollView>

        <MenuModal
          isOpen={this.state.isOpen}
          closeModal={this.closeModal}
          button1='Date'
          button1OnPress={() => this.setFilter('date')}
          button2='Amount'
          button2OnPress={() => this.setFilter('amount')}
          button3='Category'
          button3OnPress={() => this.setFilter('category')}
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
