import React, { Component, PropTypes } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { Actions } from 'react-native-router-flux'
import icons from './icons'
import {
  CustomNavBar
} from '../../components'

export default class CategoryIcons extends Component {
  render() {
    console.log('icons', icons)
    return (
      <View style={styles.container}>
        <CustomNavBar
          onLeftPress={Actions.pop}
          onRightPress={() => {}}
          title='Category Icons'
          leftButton='Cancel'
        />

        <View style={styles.iconsContainer}>
          {icons.map((icon, i) => {
            return (
              <View key={i} style={styles.iconWrapper}>
                <TouchableOpacity onPress={() => console.log('icon num', i)}>
                  <Text><Icon name={icons[i]} size={36} color='black' style={{paddingLeft: 10}}/></Text>
                </TouchableOpacity>
              </View>
            )
          })}
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  iconsContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  iconWrapper: {
    padding: 10
  }
})
