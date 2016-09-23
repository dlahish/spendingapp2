import React, { Component, PropTypes } from 'react'
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  LayoutAnimation,
  Keyboard,
  Dimensions,
  TouchableHighlight
} from 'react-native'

import { NewTransactionForm, CustomNavBar, addBorder, CategorySelector } from '../../components'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as dataActionCreators from '../../actions/data'
import * as formActionCreators from '../../actions/form'

class NewTransaction extends Component {
  constructor(props) {
    super(props)
    this.state = {
      date: new Date(),
      amount: null,
      category: 'Category',
      notes: null,
      error: '',
      type: '',
      visibleHeight: null,
      windowHeight: null,
      categoryType: 'Income'
    }
  }

  componentWillMount () {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow)
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide)
    const height = Dimensions.get('window').height
    this.setState({
      windowHeight: height,
      visibleHeight: height,
      categoryType: this.props.categoryType
    })
  }

  componentWillUnmount () {
    this.keyboardDidShowListener.remove()
    this.keyboardDidHideListener.remove()
  }

  keyboardDidShow = (e) => {
    // Animation types easeInEaseOut/linear/spring
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring)
    let newSize = this.state.visibleHeight - e.endCoordinates.height
    this.setState({
      visibleHeight: newSize
    })
    _scrollView.scrollTo({y: 80});
  }

  keyboardDidHide = (e) => {
    // Animation types easeInEaseOut/linear/spring
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    this.setState({
      visibleHeight: this.state.windowHeight
    })
    _scrollView.scrollTo({y: 0});
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      category: nextProps.newCategory,
      type: nextProps.categoryType,
      categoryType: nextProps.categoryType
    })
  }

  onDateChange = (date) => {
    this.setState({ date: date })
  }

  onInputChange = (field, value) => {
    this.setState({
      ...this.state,
      [field]: value
    })
  }

  onSaveNewTransaction = () => {
    if (this.state.category === 'Category') {
      this.setState({error: 'Category must be selected'})
    } else if (this.state.amount === null || this.state.amount.length === 0) {
      this.setState({error: 'Please enter an amount'})
    } else {
      let newAmount
      if (this.state.type === 'Expense') { newAmount = this.state.amount * -1 }
      else { newAmount = this.state.amount }
      const transaction = {
        date: this.state.date,
        amount: newAmount,
        category: this.state.category,
        notes: this.state.notes,
        type: this.state.type
      }
      this.props.actions.data.addNewTransaction(transaction)
      Actions.tabbar()
    }
  }

  onCancelPress = () => {
    this.setState({
      date: new Date(),
      amount: '',
      category: 'Category',
      notes: '',
      error: '',
      type: 'Income'
    })
    this.props.actions.form.clearForm()
    Actions.tabbar()
  }

  onTypeChange = (type) => {
    this.setState({ categoryType: type })
  }

  render() {
    let incomeSelected, expenseSelected
    if (this.state.categoryType === 'Income') { incomeSelected = true, expenseSelected = false }
    else { incomeSelected = false, expenseSelected = true }

    return (
      <View style={[styles.container, {height: this.state.visibleHeight}]}>
        <CustomNavBar
          onLeftPress={this.onCancelPress}
          onRightPress={this.onSaveNewTransaction}
          title='New Transaction'
          leftButton='Cancel'
          rightButton='Save'
        />
        <CategorySelector
          incomeSelected={incomeSelected}
          expenseSelected={expenseSelected}
          onTypeChange={this.onTypeChange}
        />
        <ScrollView
          keyboardDismissMode='interactive'
          keyboardShouldPersistTaps={false}
          ref={(scrollView) => { _scrollView = scrollView }}
        >
          <NewTransactionForm
            date={this.state.date}
            amount={this.state.amount}
            category={this.state.category}
            categoryType={this.state.categoryType}
            notes={this.state.notes}
            error={this.state.error}
            type={this.state.type}
            onDateChange={this.onDateChange}
            onInputChange={this.onInputChange}
          />
        </ScrollView>
      </View>
    )
  }
}

NewTransaction.propTypes = {
  newCategory: PropTypes.string
}

var styles = StyleSheet.create({
  container: {
    alignItems: 'stretch'
  }
})

export default connect(
  (state) => ({newCategory: state.form.category}),
  (dispatch) => ({
    actions: {
      data: bindActionCreators(dataActionCreators, dispatch),
      form: bindActionCreators(formActionCreators, dispatch)
    }
  })
)(NewTransaction)
