import React, { Component } from 'react'
import { NewCategoryForm } from '../components'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Actions } from 'react-native-router-flux'
import * as dataActionCreators from '../actions/data'
import { View, Text, StyleSheet, ScrollView } from 'react-native'

class NewCategory extends Component {
  constructor(props) {
    super(props)
    this.state = {
      category: {
        name: '',
        type: 'Income'
      }
    }
  }

  onInputChange = (field, value) => {
    this.setState({
      ...this.state,
      category: {...this.state.category, [field]:value}
     })
  }

  onSaveNewCategory = () => {
    this.props.addNewCategory(this.state.category)
    Actions.pop()
  }

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
          onInputChange={this.onInputChange}
          categoryType={this.state.category.type}
          onTypeChange={this.onTypeChange}
        />
      </View>
    )
  }
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
