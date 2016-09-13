import React, { Component, PropTypes } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Button from 'react-native-button'
import { NewTransactionForm, NewTransactionNavBar, addBorder } from '../../components'
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
      categoryColor: 'gray',
      notes: null,
      error: ''
    }
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
      <View style={styles.container}>
        <NewTransactionNavBar
          onCancelPress={this.onCancelPress}
          onSaveNewTransaction={this.onSaveNewTransaction}
        />
        <NewTransactionForm
          date={this.state.date}
          amount={this.state.amount}
          category={this.state.category}
          notes={this.state.notes}
          error={this.state.error}
          onDateChange={this.onDateChange}
          onInputChange={this.onInputChange}
        />
      </View>
    )
  }
}

NewTransaction.propTypes = {
  newCategory: PropTypes.object
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch'
  }
})

export default connect(
  (state) => ({newCategory: state.form.category}),
  (dispatch) => (bindActionCreators(dataActionCreators, dispatch))
)(NewTransaction)
