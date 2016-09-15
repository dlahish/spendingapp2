import React, { Component, PropTypes } from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { CustomNavBar } from '../components'
import Icon from 'react-native-vector-icons/FontAwesome'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as dataActionCreators from '../actions/data'
import Button from 'react-native-button'

const plusIcon = (<Icon name='plus' size={26} color='#FFF' />)
const plusIconBlack = (<Icon name='plus' size={22} color='#CCC' />)
const plusIconBlackDisabled = (<Icon name='plus' size={26} color='#BBBBBB' />)
const editIcon = (<Icon name='minus-circle' size={22} color='red' />)

class Categories extends Component {
  constructor(props) {
    super(props)
    this.state = {
      deleteOptionOn: false
    }
  }
  componentDidMount() {
    this.props.getCategories()
  }

  onAddNewCategory() {
    console.log('add new category')
    this.props.addNewCategory('Clothes')
  }

  onDeleteCategory = () => {
    this.setState({ deleteOptionOn: !this.state.deleteOptionOn})
  }

  categoryRow = (category, i, editMode) =>
    <View style={styles.categoryRow} key={i}>
      {editMode ? <Button onPress={() => this.onDeleteCategory()}><View style={styles.icon}>{editIcon}</View></Button>
                : <View style={styles.icon}>{plusIconBlack}</View>}
      <Text style={styles.text}>{category}</Text>
      {this.state.deleteOptionOn ? <Text>Delete</Text> : <View></View>}
    </View>


  renderCategories(categories, editMode) {
    return categories.map((category, i) => this.categoryRow(category, i, editMode))
  }

  render() {
    const editMode = this.props.editMode
    return (
      <View style={styles.container}>
        <ScrollView>
          {this.renderCategories(this.props.categories, editMode)}
        </ScrollView>
      </View>
    )
  }
}

const styles = {
  container: {
    flex: 1,
    paddingTop: 64,
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
