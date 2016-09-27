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
import { Actions, ActionConst } from 'react-native-router-flux'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as dataActionCreators from '../../actions/data'
import * as formActionCreators from '../../actions/form'
import Button from 'react-native-button'

class NewTransaction extends Component {
  constructor(props) {
    super(props)
    this.state = {
      date: new Date(),
      amount: null,
      category: 'Category',
      notes: null,
      error: '',
      visibleHeight: null,
      windowHeight: null,
      categoryType: ''
    }
  }

  componentWillMount () {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow)
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide)
    const height = Dimensions.get('window').height
    if (this.props.isEdit && this.props.title === 'New Favorite Transaction' || !this.props.isEdit) {
      this.setState({
        windowHeight: height,
        visibleHeight: height,
        categoryType: this.props.categoryType
      })
    } else {
      const tempDate = new Date(this.props.transaction.date)
      const tempAmount = Math.abs(this.props.transaction.amount).toString()
      this.setState({
        windowHeight: height,
        visibleHeight: height,
        date: tempDate,
        amount: tempAmount,
        category: this.props.transaction.category,
        notes: this.props.transaction.notes,
        categoryType: this.props.transaction.type
      })
    }
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
      if (this.state.categoryType === 'Expense') { newAmount = this.state.amount * -1 }
      else { newAmount = this.state.amount }
      const transaction = {
        date: this.state.date,
        amount: newAmount,
        category: this.state.category,
        notes: this.state.notes,
        type: this.state.categoryType
      }
      if (this.props.title === 'New Transaction') {
        this.props.actions.data.addNewTransaction(transaction)
      } else {
        this.props.actions.data.addNewFavoriteTransaction(transaction)
      }

      this.setState({
        date: new Date(),
        amount: '',
        category: 'Category',
        notes: '',
        error: '',
        categoryType: ''
      })
      Actions.pop()
    }
  }

  onCancelPress = () => {
    this.setState({
      date: new Date(),
      amount: '',
      category: 'Category',
      notes: '',
      error: '',
      type: '',
      categoryType: ''
    })
    this.props.actions.form.clearForm()
    Actions.pop()
  }

  onTypeChange = (categoryType) => {
    // this.setState({ categoryType: type })
    this.props.actions.form.setCategoryType(categoryType)
  }

  onDeleteTransaction = () => {
    if (this.props.title === 'New Transaction') {
      this.props.removeTransaction(this.props.transaction)
      Actions.pop()
    } else {
      this.props.actions.data.removeNewFavoriteTransaction(transaction)
    }
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
          title={this.props.title}
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
          {this.props.isEdit
            ? <View style={{alignItems: 'center'}}>
                <Button style={styles.btnText}
                  containerStyle={styles.btn}
                  onPress={this.onDeleteTransaction}>Delete transaction
                </Button>
              </View>
            : <View></View>}
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch'
  },
  btnText: {
    color: "#f2f2f2"
  },
  btn: {
    backgroundColor:"red",
    padding:4,
    borderRadius: 5,
    width:200,
    margin: 8,
    marginLeft: 15,
  }
})

export default connect(
  (state) => ({
    newCategory: state.form.category,
    categoryType: state.form.categoryType}),
  (dispatch) => ({
    actions: {
      data: bindActionCreators(dataActionCreators, dispatch),
      form: bindActionCreators(formActionCreators, dispatch)
    }
  })
)(NewTransaction)
