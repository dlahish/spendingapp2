import React, { Component, PropTypes } from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableHighlight } from 'react-native'
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

function isSelected(selected) {
  if (selected) return {backgroundColor: '#BBB'}
  else return {backgroundColor: '#FFF'}
}

class Categories extends Component {
  constructor(props) {
    super(props)
    this.state = {
      deleteOptionOn: false,
      categoryType: 'Income'
    }
  }
  componentDidMount() {
    this.props.getCategories()
  }

  onInputChange(type) {
    this.setState({ categoryType: type})
  }

  onDeleteCategory = () => {
    this.setState({ deleteOptionOn: !this.state.deleteOptionOn})
  }

  categoryRow = (category, i, editMode) =>
    <View style={styles.categoryRow} key={i}>
      {editMode ? <Button onPress={() => this.onDeleteCategory()}><View style={styles.icon}>{editIcon}</View></Button>
                : <View style={styles.icon}>{plusIconBlack}</View>}
      <Text style={styles.text}>{category.name}</Text>
      {this.state.deleteOptionOn ? <Text>Delete</Text> : <View></View>}
    </View>


  renderCategories(categories, categoryType, editMode) {
    let filteredCategories = categories.filter((category) => category.type === categoryType)
    return filteredCategories.map((category, i) => this.categoryRow(category, i, editMode))
  }

  render() {
    const editMode = this.props.editMode
    let incomeSelected, expenseSelected
    if (this.state.categoryType === 'Income') { incomeSelected = true, expenseSelected = false }
    else { incomeSelected = false, expenseSelected = true }
    return (
      <View style={styles.container}>
        <View style={[styles.typeWrapper]}>
            <TouchableHighlight
              style={[styles.typeButton, isSelected(incomeSelected)]}
              onPress={()=> this.onInputChange('Income')}
            >
              <Text>Income</Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={[styles.typeButton, isSelected(expenseSelected)]}
              onPress={() => this.onInputChange('Expense')}
            >
              <Text>Expense</Text>
            </TouchableHighlight>
        </View>
        <ScrollView>
          {this.renderCategories(this.props.categories, this.state.categoryType, editMode)}
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
  },
  typeWrapper: {
    flexDirection: 'row',
    marginBottom: 20,
    borderColor: 'black',
    borderWidth: 1
  },
  typeButton: {
    flex:1,
    alignItems: 'center',
    paddingTop: 5,
    paddingBottom: 5
  }
}

export default connect(
  (state) => ({ categories: state.data.categories }),
  (dispatch) => (bindActionCreators(dataActionCreators, dispatch))
)(Categories)
