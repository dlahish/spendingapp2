import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native'
import { Actions } from 'react-native-router-flux'
import Button from 'react-native-button'

class AccountForm extends Component {

  constructor (props) {
    super(props)
    this.state = {
      email: '',
      password: ''
    }
  }

  onFormSubmit = () => {
    this.props.onSubmit(this.state, this.props.authError)
    this.setState({ password: '' })
  }

  onInputChange = (field, value) => {
    this.setState({
      ...this.state,
      ...{[field]:value}
    })
  }

  onSigninPress = () => {
    this.props.setAuthError('')
    Actions.pop()
  }

  render () {
    return (
      <View style={styles.container}>

        <TextInput style={styles.input}
          placeholder='Email'
          onChangeText={(value) => this.onInputChange('email', value)}
          value={this.state.email}
          autoCapitalize='none'
          />

        <TextInput style={styles.input}
          onChangeText={(value) => this.onInputChange('password', value)}
          secureTextEntry={true}
          value={this.state.password}
          placeholder='Password'
          autoCapitalize='none'
          />

        <Text>{this.props.authError}</Text>

        <Button style={styles.btnText}
          containerStyle={styles.btn}
          onPress={this.onFormSubmit}>Submit
        </Button>

        <Button style={styles.btnText}
          containerStyle={[styles.btn, styles.bgBlue]}
          onPress={() => this.onSigninPress()}>Sign in
        </Button>

      </View>
    )
  }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f2f2f2"
    },
    btnText: {
        color: "#f2f2f2"
    },
    btn: {
        backgroundColor:"#333",
        padding:8,
        borderRadius:6,
        width:200,
        margin: 8
    },
    input: {
        backgroundColor: "#fff",
        textAlign:"center",
        height: 40,
        marginBottom: 10,
        padding:10
    },
    bgBlue : {
  		backgroundColor:"#3498db",
  	},
});

export default AccountForm
