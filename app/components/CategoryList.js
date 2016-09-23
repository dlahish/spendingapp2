import React, { Component, PropTypes} from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as formActionCreators from '../actions/form'
import { Actions } from 'react-native-router-flux'
import Button from 'react-native-button'
import {
  View,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Keyboard,
  Dimensions,
  StyleSheet
} from 'react-native'

import Icon from 'react-native-vector-icons/Ionicons'
const myIcon = (<Icon name="ios-add-circle" size={26} />)

const CategoryRow = (props) => {
  return (
    <TouchableOpacity onPress={() => props.onCategorySelect(props.category)}>
      <View style={styles.row}>
        {myIcon}
        <View style={styles.categoryWrapper}>
          <Text style={styles.category}>
            {props.category.name}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

class CategoryList extends Component {
  renderCategories(categories) {
    let filteredCategories = categories.filter((category) => category.type === this.props.categoryType)
    return filteredCategories.map((category,i) =>
      <CategoryRow onCategorySelect={() => this.handleCategoryPress(category)} category={category} key={i}/>)
  }

  handleCategoryPress(category) {
    console.log('handle category press --------')
    console.log(category)
    this.props.setNewCategory(category.name)
    Actions.pop({categoryType: category.type})
  }

  render () {
    return (
      <ScrollView>
        <View style={styles.container}>
          {this.renderCategories(this.props.categories)}
        </View>
        <Button style={styles.btnText}
          containerStyle={styles.btn}
          onPress={() => Actions.newCategory()}>Add Category
        </Button>
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
  },
  btnText: {
    color: "#f2f2f2"
  },
  btn: {
    backgroundColor:"#555",
    padding:4,
    borderRadius: 6,
    width:150,
    margin: 8,
    marginLeft: 15,
  }
})

CategoryList.propTypes = {
  categories: PropTypes.array
}

export default connect(
	(state) => ({ categories: state.data.categories }),
	(dispatch) => (bindActionCreators(formActionCreators, dispatch))
)(CategoryList)
