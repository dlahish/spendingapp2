import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { addBorder } from '../components'
import Button from 'react-native-button'
import Icon from 'react-native-vector-icons/Ionicons'
const myIcon = (<Icon name="ios-add-circle" size={26} />)

export default (props) => {
  return(
    <View style={[styles.container]}>
      <Text style={styles.transactionName}>
        {props.transaction.name}
      </Text>
      {/* <Button
        style={styles.btnText}
        containerStyle={[styles.btn, styles.bgDark]}
        onPress={() => props.addTransaction(props.transaction)}
      >
      </Button> */}
      <Button onPress={() => props.addTransaction(props.transaction)}>
        {myIcon}
      </Button>
    </View>
  )
}

var styles = StyleSheet.create({
	container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // alignItems: 'center',
    // paddingLeft: 15,
    paddingRight: 18,
    paddingBottom: 5
	},
	btnText: {
		color: "#f2f2f2",
    fontSize: 18
	},
	btn: {
		width:45,
		// padding: 8,
    paddingTop: 4,
    paddingBottom: 4,
		borderRadius:6,
		margin:4
	},
	bgGreen: {
		backgroundColor:"#2ecc71",
	},
	bgDark: {
		backgroundColor:"#333",
	},
	btnDisabled:{
		opacity: 0.8
	},
  transactionName: {
    fontSize: 20,
    marginRight: 4
  }
})
