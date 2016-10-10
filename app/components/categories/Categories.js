import React, { Component, PropTypes } from 'react'
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableHighlight,
  LayoutAnimation
} from 'react-native'
import { CustomNavBar, CategorySelector, ItemRow } from '../../components'
import Icon from 'react-native-vector-icons/FontAwesome'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as dataActionCreators from '../../actions/data'

const plusIcon = (<Icon name='plus' size={26} color='#FFF' />)
const plusIconBlack = (<Icon name='plus' size={22} color='#CCC' />)
const plusIconBlackDisabled = (<Icon name='plus' size={26} color='#BBBBBB' />)
const editIcon = (<Icon name='minus-circle' size={22} color='red' />)

class Categories extends Component {
  constructor(props) {
    super(props)
    this.state = {
      categoryType: 'Income',
      selectedItemIndex: null
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.selectedItemIndex) this.setState({selectedItemIndex: null})
  }

  componentWillUpdate() {
    LayoutAnimation.easeInEaseOut();
  }

  componentDidMount() {
    this.props.getCategories()
  }

  onTypeChange = (type) => {
    this.setState({ categoryType: type })
  }

  onSelecetItem = (itemIndex, selected) => {
    const selectedItemIndex = this.state.selectedItemIndex
    if (this.props.editMode) {
      if (selected) this.setState({ selectedItemIndex: null})
      else if (selectedItemIndex !== null && itemIndex !== selectedItemIndex) this.setState({ selectedItemIndex: null})
      else this.setState({ selectedItemIndex: itemIndex })
    }
  }

  render() {
    let incomeSelected, expenseSelected
    if (this.state.categoryType === 'Income') { incomeSelected = true, expenseSelected = false }
    else { incomeSelected = false, expenseSelected = true }
    let filteredCategories = this.props.categories.filter((category) => category.type === this.state.categoryType)

    return (
      <View style={styles.container}>
        <CustomNavBar
          onSecondLeftPress={() => Actions.editCategory({editMode: true, hideNavBar: false})}
          onRightPress={() => Actions.newCategory({categoryType: this.state.categoryType})}
          title='Categories'
          secondLeftButton='Edit'
          rightButton={plusIcon}
          leftButton='Back'
          onLeftPress={() => Actions.settings()}
        />
        <CategorySelector
          incomeSelected={incomeSelected}
          expenseSelected={expenseSelected}
          onTypeChange={this.onTypeChange}
        />
        <ScrollView>
          {filteredCategories.map((category, i) =>
            <ItemRow
              key={i}
              itemIndex={i}
              editMode={this.props.editMode}
              selected={i === this.state.selectedItemIndex ? true : false}
              item={category}
              mainText={category.name}
              onSelecetItem={this.onSelecetItem}
              onDeleteItem={() => this.props.removeCategory(category)}
            />
          )}
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
    borderBottomWidth: 1,
    paddingLeft: 10,
    height: 30
  },
  textWrapper: {
    flex: 1,
  },
  text: {
    fontSize: 22
  },
  iconWrapper: {
    paddingRight: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  icon: {},
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
