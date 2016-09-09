import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Button from 'react-native-button'
import axios from 'axios'
import { AsyncStorage } from 'react-native'

class NewTransaction extends Component {
  onAddTransaction() {
    var token
    const getToken = AsyncStorage.getItem('spending-user-token')
    getToken.then((gettoken) => {
      fetch('https://spendingapi2.herokuapp.com/addrecord', {
        method: 'POST',
        headers: {
          authorization: gettoken,
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          date: '09/02/2016',
          category: 'Madam',
          amount: '240',
          notes: 'Night'
        })
      })
      .then((response) => response.json())
      .then((responseJson) => {
        let currentYear = new Date().getFullYear()
        this.props.getYearTotal('2016')
      })
      .catch((error) => {
        console.error(error);
      });
    })
    .catch((error) => {
      console.error(error);
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Button
          style={styles.btnText}
          containerStyle={[styles.btn, styles.bgGreen]}
          onPress={this.onAddTransaction.bind(this)}
        >Add Transaction
        </Button>
      </View>
    )
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1
  },
	btnText: {
		color: "#f2f2f2"
	},
	btn: {
		width:200,
		padding:8,
		borderRadius:6,
		margin:8
	},
	bgGreen: {
		backgroundColor:"#2ecc71",
	},
	bgDark: {
		backgroundColor:"#333",
	},
	btnDisabled:{
		opacity: 0.8
	}
})


export default NewTransaction
