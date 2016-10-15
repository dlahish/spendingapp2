'use strict'
import React, {Component} from 'react'
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
	Dimensions,
	TouchableOpacity
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Actions } from 'react-native-router-flux'
import * as accountActions from '../../actions/accounts'
import KeyboardSpacer from 'react-native-keyboard-spacer'
import { LoadingOverlay } from '../../components'
var windowSize = Dimensions.get('window')

class Signin extends Component {
	constructor (props) {
    super(props)
    this.state = {
      email: '',
      password: '',
			isLoading: false
    }
  }

	onFormSubmit = () => {
		this.setState({ isLoading: true })
		this.props.signinAndAuthUser(this.state)
			.then(() => {
				console.log('autherror', this.props.authError)
				if (!this.props.authError) {
					this.setState({ isLoading: false })
					Actions.home()
				} else {
					this.setState({ isLoading: false })
				}
			})
    this.setState({ password: '' })
  }

  onInputChange = (field, value) => {
    this.setState({
      ...this.state,
      ...{[field]:value}
    })
  }

  onSignupPress = () => {
    this.props.setAuthError('')
    Actions.signup()
  }

  render() {
    return (
        <View style={styles.container}>
            {/* <Image style={styles.bg} source={{uri: 'http://i.imgur.com/xlQ56UK.jpg'}} /> */}
            <View style={styles.header}>
                {/* <Image style={styles.mark} source={{uri: 'http://i.imgur.com/da4G0Io.png'}} /> */}
            </View>
            <View style={styles.inputs}>
                <View style={styles.inputContainer}>
										<Icon name='md-person' size={22} color='#FFF' style={styles.inputUsername}/>
                    <TextInput
                        style={[styles.input, styles.whiteFont]}
                        placeholder="Email"
                        placeholderTextColor="#FFF"
                        value={this.state.email}
												onChangeText={(value) => this.onInputChange('email', value)}
												autoCapitalize='none'
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Icon name='md-lock' size={22} color='#FFF' style={styles.inputUsername}/>
                    <TextInput
                        password={true}
                        style={[styles.input, styles.whiteFont]}
                        placeholder="Pasword"
                        placeholderTextColor="#FFF"
                        value={this.state.password}
												onChangeText={(value) => this.onInputChange('password', value)}
												autoCapitalize='none'
                    />
                </View>
                <View style={styles.forgotContainer}>
										<Text style={{color: 'red'}}>{this.props.authError}</Text>
                    <Text style={styles.greyFont}>Forgot Password</Text>
                </View>
            </View>
            <View style={styles.signin}>
							<TouchableOpacity onPress={this.onFormSubmit}>
								<Text style={styles.whiteFont}>Sign In</Text>
							</TouchableOpacity>
            </View>
            <View style={styles.signup}>
                <Text style={styles.greyFont}>Don't have an account?
								<Text onPress={() => this.onSignupPress()} style={styles.whiteFont}>  Sign Up</Text></Text>
            </View>
            <KeyboardSpacer />
						<LoadingOverlay isLoading={this.state.isLoading} />
        </View>
    )
  }
}

export default connect(
	(state) => ({ authError: state.account.authError }),
	(dispatch) => (bindActionCreators(accountActions, dispatch))
)(Signin)

var styles = StyleSheet.create({
    container: {
      flexDirection: 'column',
      flex: 1,
      // backgroundColor: 'transparent'
			backgroundColor: 'rgb(0, 153, 204)'
    },
    bg: {
        position: 'absolute',
        left: 0,
        top: 0,
        width: windowSize.width,
        height: windowSize.height
    },
    header: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: .5,
        backgroundColor: 'transparent'
    },
    mark: {
        width: 150,
        height: 150
    },
    signin: {
        backgroundColor: '#FF3366',
        padding: 20,
        alignItems: 'center'
    },
    signup: {
      justifyContent: 'center',
      alignItems: 'center',
      flex: .15
    },
    inputs: {
        marginTop: 10,
        marginBottom: 10,
        flex: .25
    },
    inputPassword: {
        marginLeft: 15,
        width: 20,
        height: 21
    },
    inputUsername: {
      marginLeft: 15,
      width: 20,
      height: 20
    },
    inputContainer: {
        padding: 10,
        borderWidth: 1,
        borderBottomColor: '#CCC',
        borderColor: 'transparent'
    },
    input: {
        position: 'absolute',
        left: 61,
        top: 12,
        right: 0,
        height: 20,
        fontSize: 14
    },
    forgotContainer: {
			flexDirection: 'row',
      justifyContent: 'space-between',
			alignItems: 'stretch',
      padding: 15,
			paddingLeft: 25
    },
    greyFont: {
      color: '#D8D8D8'
    },
    whiteFont: {
      color: '#FFF'
    }
})
