import React, { Component, PropTypes} from 'react'
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

const categories = ['General', 'Coffee', 'Beer/Wine', 'Eating Out', 'Grocery', 'Shopping',
'General', 'Coffee', 'Beer/Wine', 'Eating Out', 'Grocery', 'Shopping','General', 'Coffee', 'Beer/Wine', 'Eating Out', 'Grocery', 'Shopping',
'General', 'Coffee', 'Beer/Wine', 'Eating Out', 'Grocery', 'Shopping','General', 'Coffee', 'Beer/Wine', 'Eating Out', 'Grocery', 'Shopping']

import { addBorder } from '../components'

const CategoryRow = (props) => {
  return (
    <TouchableOpacity onPress={() => props.handleCategoryPress(props.category)}>
      <View style={styles.categoryWrapper}>
        {myIcon}
        <Text style={styles.category}>
          {props.category}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

export default class CategoryList extends Component {
  renderCategories(categories) {
    return categories.map((category,i) =>
      <CategoryRow handleCategoryPress={this.handleCategoryPress} category={category} key={i}/>)
  }

  handleCategoryPress(category) {
    console.log(category)
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
    paddingTop: 64,
  },
  categoryWrapper: {
    flex: 1,
    flexDirection: 'row',
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    paddingBottom: 5,
    paddingTop: 5,
    paddingLeft: 15
  },
  category: {
    fontSize: 20,
    paddingLeft: 15
  }
})
