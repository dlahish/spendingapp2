import React, { Component, PropTypes } from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { CustomNavBar } from '../components'
import Icon from 'react-native-vector-icons/FontAwesome'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as dataActionCreators from '../actions/data'

const plusIcon = (<Icon name='plus' size={26} color='#FFF' />)
const plusIconBlack = (<Icon name='plus' size={22} color='#CCC' />)

categoryRow = (category, i) =>
  <View style={styles.categoryRow} key={i}>
    <View style={styles.icon}>{plusIconBlack}</View>
    <Text style={styles.text}>{category}</Text>
  </View>


function renderCategories(categories) {
  return categories.map((category, i) => categoryRow(category, i))
}

class Categories extends Component {
  componentDidMount() {
    this.props.getCategories()
  }

  onAddNewCategory() {
    console.log('add new category')
    this.props.addNewCategory('Clothes')
  }

  render() {
    return (
      <View style={styles.container}>
        <CustomNavBar
          onLeftPress={() => {}}
          onRightPress={() => this.onAddNewCategory()}
          title='Categories'
          leftButton='Edit'
          rightButton={plusIcon}
        />
        <ScrollView>
          {renderCategories(this.props.categories)}
        </ScrollView>
      </View>
    )
  }
}

const styles = {
  container: {
    flex: 1
  },
  categoryRow: {
    flexDirection: 'row',
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
    paddingLeft: 10,
    paddingBottom: 5,
    paddingTop: 5
  },
  text: {
    fontSize: 22
  },
  icon: {
    paddingRight: 10,
    alignItems: 'center',
    justifyContent: 'center'
  }
}

export default connect(
  (state) => ({ categories: state.data.categories }),
  (dispatch) => (bindActionCreators(dataActionCreators, dispatch))
)(Categories)
