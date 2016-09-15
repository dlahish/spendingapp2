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
      categoryName: ''
    }
  }

  onInputChange = (value) => {
    this.setState({ categoryName: value })
  }

  onSaveNewCategory = () => {
    this.props.addNewCategory(this.state.categoryName)
    Actions.pop()
  }

  render() {
    return (
      <View style={styles.container}>
        <CustomNavBar
          onLeftPress={Actions.pop}
          // onRightPress={() => this.onAddNewCategory()}
          onRightPress={this.onSaveNewCategory}
          title='New Category'
          leftButton='Cancel'
          rightButton='Save'
        />
        <NewCategoryForm onInputChange={this.onInputChange}/>
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
