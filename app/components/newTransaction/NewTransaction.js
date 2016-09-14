import React, { Component, PropTypes } from 'react'
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  LayoutAnimation,
  Keyboard,
  Dimensions
} from 'react-native'
import Button from 'react-native-button'
import { NewTransactionForm, CustomNavBar, addBorder } from '../../components'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as dataActionCreators from '../../actions/data'

class NewTransaction extends Component {
  constructor(props) {
    super(props)
    this.state = {
      date: new Date(),
      amount: null,
      category: 'Category',
      categoryColor: '#BBBBBB',
      notes: null,
      error: '',
      visibleHeight: null,
      windowHeight: null
    }
  }

  componentWillMount () {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow)
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide)
    const height = Dimensions.get('window').height
    this.setState({windowHeight: height, visibleHeight: height})
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
    this.setState({category: nextProps.newCategory, categoryColor: 'black'})
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
    if (this.state.categoryColor === 'gray') {
      this.setState({error: 'Category must be selected'})
    } else if (this.state.amount === null || this.state.amount.length === 0) {
      this.setState({error: 'Please enter an amount'})
    } else {
      const transaction = {
        date: this.state.date,
        amount: this.state.amount,
        category: this.state.category,
        notes: this.state.notes,
      }
      this.props.addNewTransaction(transaction)
      Actions.tabbar()
    }
  }

  onCancelPress = () => {
    Actions.tabbar()
    this.setState({
      date: new Date(),
      amount: '',
      category: 'Category',
      categoryColor: 'gray',
      notes: '',
      error: ''
    })
  }

  render() {
    return (
      <View style={[styles.container, {height: this.state.visibleHeight}]}>
        <CustomNavBar
          onLeftPress={this.onCancelPress}
          onRightPress={this.onSaveNewTransaction}
          title='New Transaction'
          leftButton='Cancel'
          rightButton='Save'
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
            notes={this.state.notes}
            error={this.state.error}
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
  (dispatch) => (bindActionCreators(dataActionCreators, dispatch))
)(NewTransaction)
