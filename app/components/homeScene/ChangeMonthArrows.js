import React, { PropTypes } from 'react'
import { View, Text, TouchableHighlight } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
const rightArrow = (<Icon name='angle-right' size={22} />)
const leftArrow = (<Icon name='angle-left' size={22} />)

export default changeMonthArrows = (props) => {
  return (
    <View style={styles.container}>
        <View style={{paddingRight: 50}}>
            <TouchableHighlight onPress={() => props.onPressLeft()}>
                {leftArrow}
            </TouchableHighlight>
        </View>
        <View>
            <TouchableHighlight onPress={() => props.onPressRight()}>
                {rightArrow}
            </TouchableHighlight>
        </View>
    </View>
  )
}

changeMonthArrows.propTypes = {
  onPressLeft: PropTypes.func.isRequired,
  onPressRight: PropTypes.func.isRequired
}

const styles = {
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  }
}
