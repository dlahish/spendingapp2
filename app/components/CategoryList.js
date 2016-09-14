import React, { Component, PropTypes} from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as formActionCreators from '../actions/form'
import { Actions } from 'react-native-router-flux'
import {
  View,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Keyboard,
  LayoutAnimation,
  Dimensions,
  StyleSheet
} from 'react-native'

import Icon from 'react-native-vector-icons/Ionicons'
const myIcon = (<Icon name="ios-add-circle" size={26} />)

const categories = ['General', 'Coffee', 'Beer/Wine', 'Eating Out', 'Grocery', 'Shopping']

import { addBorder } from '../components'

const CategoryRow = (props) => {
  return (
    <TouchableOpacity onPress={() => props.onCategorySelect(props.category)}>
      <View style={styles.row}>
        {myIcon}
        <View style={styles.categoryWrapper}>
          <Text style={styles.category}>
            {props.category}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

class CategoryList extends Component {
  renderCategories(categories) {
    return categories.map((category,i) =>
      <CategoryRow onCategorySelect={() => this.handleCategoryPress(category)} category={category} key={i}/>)
  }

  handleCategoryPress(category) {
    console.log(category)
    this.props.setNewCategory(category)
    Actions.pop()
  }

  render () {
    return (
      <ScrollView>
        <View style={styles.container}>
          {this.renderCategories(categories)}
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 74
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    paddingBottom: 5,
    paddingTop: 5,
    paddingLeft: 15
  },
  categoryWrapper: {
    flex: 1,
    marginLeft: 15,
    borderBottomColor: 'gray',
    borderBottomWidth: 1
  },
  category: {
    fontSize: 20
  }
})

export default connect(
	(state) => ({}),
	(dispatch) => (bindActionCreators(formActionCreators, dispatch))
)(CategoryList)
