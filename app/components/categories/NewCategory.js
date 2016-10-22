import React, { Component, PropTypes } from 'react'
import { NewCategoryForm } from '../../components'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Actions, ActionConst } from 'react-native-router-flux'
import * as dataActionCreators from '../../actions/data'
import { View, Text, StyleSheet } from 'react-native'

class NewCategory extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      type: 'Income',
      iconName: '',
      isValid: false,
      error: '',
      formValidateInfo: undefined
    }
  }

  componentDidMount() {
    console.log('COMPOENET DID MOUNT -----')
    if (this.props.editMode) {
      this.setState({
        name: this.props.category.name,
        type: this.props.categoryType,
        iconName: this.props.categoryIconIndex[this.props.category.name]
      })
    } else {
      this.setState({
        type: this.props.categoryType
      })
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log('component will receive props ----')
    console.log('this.props', this.props)
    console.log('nextProps', nextProps)
    this.setState({ iconName: nextProps.iconName })
  }

  // onInputChange = (field, value) => {
  //   this.setState({
  //     ...this.state,
  //     category: {...this.state.category, [field]:value}
  //    })
  // }

  handleValueChange = (values, formValidateInfo) => {
    console.log('handle value change - values', values)
    // let error = this.state.error
    // if (values.category.length === 0) error = ''
    this.setState({
      isValid: formValidateInfo.isValid,
      name: values.name,
      error: '',
      formValidateInfo
    })
  }

  onSaveNewCategory = () => {
    const s = this.state
    if (s.isValid) {
      if (this.props.editMode) this.props.saveCategoryIcon(this.state)
      else this.props.addNewCategory(this.state)
      this.setState({
        name: '',
        type: 'Income',
        iconName: '',
        isValid: false,
        error: ''
      })
      Actions.categories()
    } else {
      this.setState({ error: 'Category name is required' })
    }
  }

  // onSaveNewCategory = () => {
  //   this.props.addNewCategory(this.state.category)
  //   Actions.pop()
  // }

  onTypeChange = (type) => {
    this.setState({ type: type })
  }

  render() {
    // console.log('new category PROPS', this.props)
    // console.log('new category STATE', this.state)
    return (
      <View style={styles.container}>
        <CustomNavBar
          // onLeftPress={() => Actions.categories()}
          onLeftPress={() => Actions.pop()}
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
          iconName={this.state.iconName}
          error={this.state.error}
        />
      </View>
    )
  }
}

NewCategory.PropTypes = {
  categoryType: PropTypes.string,
  iconName: PropTypes.string,
  categoryIconIndex: PropTypes.array,
  addNewCategory: PropTypes.func.isRequired
}

const styles = {
  container: {
    flex: 1
  }
}

export default connect(
  (state) => ({
    iconName: state.form.categoryIconName,
    categoryIconIndex: state.categories.categoryIconIndex }),
  (dispatch) => (bindActionCreators(dataActionCreators, dispatch))
)(NewCategory)
