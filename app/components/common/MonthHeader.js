import React from 'react'
import { View, Text, TouchableHighlight } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
const rightArrow = (<Icon name='angle-right' size={22} />)
const leftArrow = (<Icon name='angle-left' size={22} />)

export default MonthHeader = (props) =>
  <View style={styles.monthHeaderContainer}>
    <View style={{flex: 1, alignItems: 'flex-start', paddingLeft: 10}}>
      <TouchableHighlight onPress={() => props.onSortPress()}>
        <Text style={styles.monthText}>Sort</Text>
      </TouchableHighlight>
    </View>

    <View style={styles.monthHeader}>
      <View style={{paddingRight: 15, justifyContent: 'center'}}>
        <TouchableHighlight onPress={() => props.onPressLeft()}>
          {leftArrow}
        </TouchableHighlight>
      </View>

      <Text style={styles.monthText}>
        {props.currentMonthName}
      </Text>

      <View style={{paddingLeft: 15, justifyContent: 'center'}}>
        <TouchableHighlight onPress={() => props.onPressRight()}>
          {rightArrow}
        </TouchableHighlight>
      </View>
    </View>

    <View style={{flex: 1}}>
      <Text style={styles.monthText}></Text>
    </View>
  </View>

const styles = {
  monthHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10
  },
  monthHeader: {
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  monthText: {
    alignSelf: 'center',
    fontSize: 20
  }
}
