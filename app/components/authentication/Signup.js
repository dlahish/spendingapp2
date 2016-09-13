import React from 'react';
import { SignupForm } from '../../components'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Actions } from 'react-native-router-flux'
import * as accountActionCreators from '../../actions/accounts'

function Signup (props) {

	handleFormSubmit = (credentials) => {
		props.signupAndAuthUser(credentials)
			.then((error) => {
				if (!error) Actions.home()
				else console.log('Hello from submit form - ' + error)
			})
	}

  return (
    <SignupForm onSubmit={handleFormSubmit} authError={props.authError}/>
  )
}

export default connect(
	(state) => ({authError: state.account.user.error}),
	(dispatch) => (bindActionCreators(accountActionCreators, dispatch))
	)(Signup)
