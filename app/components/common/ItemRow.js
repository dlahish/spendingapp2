import React, { Component, PropTypes } from 'react'
import { View, Text, ScrollView, TouchableHighlight, LayoutAnimation } from 'react-native'
import Button from 'react-native-button'
import Icon from 'react-native-vector-icons/FontAwesome'
const editIcon = (<Icon name='minus-circle' size={22} color='red' />)
const plusIconBlack = (<Icon name='plus' size={22} color='#CCC' />)
import { addBorder } from '../../components'

export default class ItemRow extends Component {
  componentWillUpdate() {
    LayoutAnimation.easeInEaseOut();
  }

  render() {
    const {
      item,
      itemIndex,
      editMode,
      selected,
      mainText,
      rightText,
      rightTextStyle,
      secondaryText,
      onSelecetItem,
      onDeleteItem } = this.props
    let deleteButtonWidth, sameRow
    selected ? deleteButtonWidth = 100 : deleteButtonWidth = 0

    return(
      <View style={styles.itemRow}>
        <View style={styles.container}>
          {editMode && selected
            ? <View></View>
            : editMode ?
              <View style={styles.iconWrapper}>
                <Button onPress={() => onSelecetItem(itemIndex, selected, item)}>
                  <View>{editIcon}</View>
                </Button>
              </View>
            : <View style={styles.iconWrapper}>{plusIconBlack}</View>}

          <TouchableHighlight
            style={styles.textWrapper}
            onPress={() => onSelecetItem(itemIndex, selected, item)}
            underlayColor='#FFF'
          >
            <View>
              <View style={styles.mainAndRightText}>
                <View>
                  <Text style={styles.mainText}>{mainText}</Text>
                </View>
                <View>
                  <Text style={[styles.mainText, rightTextStyle]}>{rightText}</Text>
                </View>
              </View>
              <View>
                <Text style={styles.secondaryText}>{secondaryText}</Text>
              </View>
            </View>
          </TouchableHighlight>
        </View>

        <View >
          {editMode && selected
            ? <TouchableHighlight
              style={[styles.deleteWrapper, {width: deleteButtonWidth}]}
              onPress={() => onDeleteItem(item)}
              >
                <Text style={{fontSize: 15}}>Delete</Text>
              </TouchableHighlight>
            : <View></View>}
        </View>
      </View>
    )
  }
}

  const styles = {
    container: {
      flex: 1,
      flexDirection: 'row',
      paddingTop: 2,
      paddingBottom: 2
    },
    itemRow: {
      flexDirection: 'row',
      borderBottomColor: 'gray',
      borderBottomWidth: 1,
      paddingLeft: 10
    },
    textWrapper: {
      flex: 1,
      paddingRight: 10
    },
    mainText: {
      fontSize: 22
    },
    iconWrapper: {
      paddingRight: 10,
      alignItems: 'center',
      justifyContent: 'center'
    },
    itemTypeWrapper: {
      flexDirection: 'row',
      marginBottom: 20
    },
    itemTypeButton: {
      flex:1,
      alignItems: 'center',
      paddingTop: 5,
      paddingBottom: 5
    },
    deleteWrapper: {
      flex: 1,
      width: 0,
      backgroundColor: 'red',
      alignItems: 'center',
      justifyContent: 'center'
    },
    mainAndRightText: {
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    secondaryText: {
      fontSize: 12
    }
  }
