import React, { Component, PropTypes } from 'react'
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableHighlight,
  LayoutAnimation
} from 'react-native'
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

const CategoryRow = (props) =>
  <View style={styles.categoryRow}>
    {props.showIcon === false && props.selectedCategoryIndex === props.categoryIndex ?
    <View></View> :
    props.editMode ?
    <View style={styles.iconWrapper}>
      <Button onPress={() => props.onSelecetCategory(props.categoryIndex)}>
        <View style={styles.icon}>{editIcon}</View>
      </Button>
    </View> : <View style={styles.iconWrapper}>{plusIconBlack}</View>}
    <TouchableHighlight
      style={styles.textWrapper}
      onPress={() => props.onSelecetCategory(props.categoryIndex)}
      underlayColor='#FFF'
    >
      <Text style={styles.text}>{props.category.name}</Text>
    </TouchableHighlight>
    {props.editMode && props.selectedCategoryIndex === props.categoryIndex ?
    <TouchableHighlight
      style={[styles.deleteWrapper, {width: props.deleteButtonWidth}]}
      onPress={() => props.onDeleteCategory(props.category)}
    >
      <Text>Delete</Text>
    </TouchableHighlight> : <View></View> }
  </View>

class Categories extends Component {
  constructor(props) {
    super(props)
    this.state = {
      deleteOptionOn: false,
      displayCategoryType: 'Income',
      deleteButtonWidth: 0,
      selectedCategoryIndex: null,
      showIcon: true
    }
  }

  componentWillReceiveProps() {
    this.setState({
      deleteButtonWidth: this.props.deleteButtonWidth,
      selectedCategoryIndex: this.props.selectedCategoryIndex
    })
  }

  componentWillUpdate() {
    LayoutAnimation.easeInEaseOut();
  }

  componentDidMount() {
    this.props.getCategories()
  }

  onInputChange(type) {
    this.setState({ displayCategoryType: type })
  }

  onSelecetCategory = (categoryIndex) => {
    if (this.props.editMode) {
      if (this.state.deleteButtonWidth === 100 ) {
        this.setState({
          deleteButtonWidth: 0,
          selectedCategoryIndex: categoryIndex,
          showIcon: true
        })
      } else {
        this.setState({
          deleteButtonWidth: 100,
          selectedCategoryIndex: categoryIndex,
          showIcon: false
        })
      }
    }
  }


  renderCategories(categories, displayCategoryType, editMode) {
    let filteredCategories = categories.filter((category) => category.type === displayCategoryType)
    return filteredCategories.map((category, i) =>
      <CategoryRow
        category={category}
        key={i}
        categoryIndex={i}
        editMode={editMode}
        showIcon={this.state.showIcon}
        deleteButtonWidth={this.state.deleteButtonWidth}
        onSelecetCategory={this.onSelecetCategory}
        onDeleteCategory={() => this.props.removeCategory(category)}
        selectedCategoryIndex={this.state.selectedCategoryIndex}
      />)
  }

  render() {
    let incomeSelected, expenseSelected
    if (this.state.displayCategoryType === 'Income') { incomeSelected = true, expenseSelected = false }
    else { incomeSelected = false, expenseSelected = true }

    return (
      <View style={styles.container}>
        <View style={[styles.categoryTypeWrapper]}>
            <TouchableHighlight
              style={[styles.categoryTypeButton, isSelected(incomeSelected)]}
              onPress={()=> this.onInputChange('Income')}
            >
              <Text>Income</Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={[styles.categoryTypeButton, isSelected(expenseSelected)]}
              onPress={() => this.onInputChange('Expense')}
            >
              <Text>Expense</Text>
            </TouchableHighlight>
        </View>
        <ScrollView>
          {this.renderCategories(this.props.categories, this.state.displayCategoryType, this.props.editMode)}
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
    borderBottomWidth: 1,
    paddingLeft: 10,
    height: 30
  },
  textWrapper: {
    flex: 1,
    // paddingBottom: 20
  },
  text: {
    fontSize: 22
  },
  iconWrapper: {
    paddingRight: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  icon: {

  },
  categoryTypeWrapper: {
    flexDirection: 'row',
    marginBottom: 20,
    borderColor: 'black',
    borderWidth: 1
  },
  categoryTypeButton: {
    flex:1,
    alignItems: 'center',
    paddingTop: 5,
    paddingBottom: 5
  },
  deleteWrapper: {
    width: 0,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center'
  }
}

Categories.propType = {
  categories: PropTypes.array
}

export default connect(
  (state) => ({ categories: state.data.categories }),
  (dispatch) => (bindActionCreators(dataActionCreators, dispatch))
)(Categories)
