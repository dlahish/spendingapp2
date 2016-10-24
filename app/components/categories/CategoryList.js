import React, { Component, PropTypes} from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as formActionCreators from '../../actions/form'
import { Actions } from 'react-native-router-flux'
import Button from 'react-native-button'
import { ItemRow } from '../../components'
import { View, ScrollView, StyleSheet } from 'react-native'

class CategoryList extends Component {
  renderCategories(categories) {
    let filteredCategories = categories.filter((category) => category.type === this.props.categoryType)
    return filteredCategories.map((category,i) =>
      <ItemRow
        key={i}
        itemIndex={i}
        item={category}
        mainText={category.name}
        icon={this.getIcon(category.name)}
        onSelecetItem={() => this.handleCategoryPress(category)}
      />)
  }

  handleCategoryPress(category) {
    this.props.setNewCategory(category.name)
    Actions.pop({categoryType: category.type})
  }

  getIcon = (categoryName) => {
    if (this.props.categoryIcons[categoryName]) return this.props.categoryIcons[categoryName]
    else return 'ios-pricetag'
  }

  render () {
    return (
        <ScrollView>

            <View style={styles.container}>
              {this.renderCategories(this.props.categories)}
            </View>

            <Button style={styles.btnText}
              containerStyle={styles.btn}
              onPress={() => Actions.newCategory({categoryType: this.props.categoryType})}>Add Category
            </Button>

        </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 64
  },
  btnText: {
    color: "#f2f2f2"
  },
  btn: {
    backgroundColor:"#555",
    padding:4,
    borderRadius: 4,
    width:150,
    margin: 8,
    marginLeft: 15,
  }
})

CategoryList.propTypes = {
  categories: PropTypes.array,
  categoryIcons: PropTypes.object
}

export default connect(
	(state) => ({
    categories: state.data.categories,
    categoryIcons: state.categories.categoryIconIndex }),
	(dispatch) => (bindActionCreators(formActionCreators, dispatch))
)(CategoryList)
