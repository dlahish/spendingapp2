import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Button from 'react-native-button'
import Icon from 'react-native-vector-icons/FontAwesome'

export default () => {
  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button
          style={styles.btnText}
  				containerStyle={[styles.btn, styles.bgGreen]}
        >
          <Icon name="plus-circle" style={{fontSize: 15}}/>
          Income
        </Button>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          style={styles.btnText}
          containerStyle={[styles.btn, styles.bgRed]}
        >
          <Icon name="plus-circle" style={{fontSize: 15}}/>
          Expense
        </Button>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 20
  },
  buttonContainer: {
    flex: 1
    //alignItems: 'center'
  },
  btnText: {
		color: 'black',
    fontSize: 20,
    paddingLeft: 10
	},
	btn: {
    width:130,
		padding:4,
		borderRadius:6,
    alignItems: 'center'
	},
  bgDark: {
		backgroundColor: "#333",
	},
  bgGreen: {
		backgroundColor: "#2ecc71",
	},
  bgRed: {
		backgroundColor: "#ff4d4d",
	},
})
