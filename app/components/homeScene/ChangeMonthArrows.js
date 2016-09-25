import React, { Component, PropTypes } from 'react'
import { View, Text } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
const rightArrow = (<Icon name='angle-right' size={22} />)
const leftArrow = (<Icon name='angle-left' size={22} />)

export default changeMonthArrows = () => {
  return (
    <View style={styles.container}>
      <View style={{paddingRight: 50}}>
        {leftArrow}
      </View>
      <View>
        {rightArrow}
      </View>
    </View>
  )
}

const styles = {
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  iconWrapper: {

  }
}
