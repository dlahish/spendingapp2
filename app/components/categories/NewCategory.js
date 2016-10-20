import React, { Component, PropTypes } from 'react'
import { NewCategoryForm } from '../../components'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Actions } from 'react-native-router-flux'
import * as dataActionCreators from '../../actions/data'
import { View, Text, StyleSheet } from 'react-native'

class NewCategory extends Component {
  constructor(props) {
    super(props)
    this.state = {
      category: '',
      type: 'Income',
      isValid: false,
      error: '',
      formValidateInfo: undefined
    }
  }

  componentDidMount() {
    this.setState({category: {type: this.props.categoryType }})
  }

  // onInputChange = (field, value) => {
  //   this.setState({
  //     ...this.state,
  //     category: {...this.state.category, [field]:value}
  //    })
  // }

  handleValueChange = (values, formValidateInfo) => {
    let error = this.state.error
    if (values.category.length === 0) error = ''
    this.setState({
      isValid: formValidateInfo.isValid,
      category: values.amount,
      error,
      formValidateInfo
    })
  }

  onSaveNewCategory = (isValid) => {
    const s = this.state
    if (s.form.isValid) {
      this.props.actions.reminders.setNewReminder(this.state.form)
      Actions.pop()
    } else {
      if (s.formValidateInfo === undefined) return this.setState({ errors: 'Please choose type of reminder'})
      let errors = ''
      if (!s.formValidateInfo.results.amount[0].isValid) errors += s.formValidateInfo.results.amount[0].message + '\n'
      if (!s.formValidateInfo.results.name[0].isValid) errors += s.formValidateInfo.results.name[0].message + '\n'
      if (!s.formValidateInfo.results.type[0].isValid) errors += s.formValidateInfo.results.type[0].message + '\n'
      this.setState({ errors })
    }
  }

  // onSaveNewCategory = () => {
  //   this.props.addNewCategory(this.state.category)
  //   Actions.pop()
  // }

  onTypeChange = (type) => {
    this.setState({ category: {type: type }})
  }

  render() {
    return (
      <View style={styles.container}>
        <CustomNavBar
          onLeftPress={Actions.pop}
          onRightPress={this.onSaveNewCategory}
          title='New Category'
          leftButton='Cancel'
          rightButton='Save'
        />
        <NewCategoryForm
          handleValueChange={this.handleValueChange}
          // onInputChange={this.onInputChange}
          onTypeChange={this.onTypeChange}
          categoryType={this.state.type}
          categoryName={this.state.name}
        />
      </View>
    )
  }
}

NewCategory.PropTypes = {
  categoryType: PropTypes.string,
  addNewCategory: PropTypes.func.isRequired
}

const styles = {
  container: {
    flex: 1
  }
}

export default connect(
  (state) => ({}),
  (dispatch) => (bindActionCreators(dataActionCreators, dispatch))
)(NewCategory)
