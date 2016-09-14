import React, { PropTypes } from 'react'
import { Text, View, StyleSheet, TouchableHighlight } from 'react-native'

export default CustomNavBar = (props) =>
  <View style={styles.container}>
    <TouchableHighlight
      style={styles.button}
      onPress={() => props.onLeftPress()}
    >
      <Text style={styles.buttonText}>
        {props.leftButton}
      </Text>
    </TouchableHighlight>
    <View style={styles.titleWrapper}>
      <Text style={styles.title}>{props.title}</Text>
    </View>
    <TouchableHighlight
        style={styles.button}
        onPress={() => props.onRightPress()}
      >
        <Text style={styles.buttonText}>
          {props.rightButton}
        </Text>
    </TouchableHighlight>
  </View>

CustomNavBar.propTypes = {
  onLeftPress: PropTypes.func.isRequired,
  onRightPress: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  leftButton: PropTypes.node,
  rightButton: PropTypes.node
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 64,
    backgroundColor: 'rgb(0, 153, 204)',
    borderBottomWidth: 0.5,
    borderBottomColor: '#828287'
  },
  titleWrapper: {
    marginTop: 20,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    textAlign: 'center',
    color: '#FFF',
    fontSize: 18,
    fontWeight: '500',
    width: 180,
    alignSelf: 'center',
  },
  button: {
    marginTop: 20,
    width: 70,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    color: '#FFF',
    fontSize: 17,
  }
})
