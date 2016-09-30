import React from 'react';
import { SignupForm } from '../../components'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Actions } from 'react-native-router-flux'
import * as accountActionCreators from '../../actions/accounts'

function Signup (props) {

	handleFormSubmit = (credentials) => {
		props.signupAndAuthUser(credentials)
			.then((authError) => {
				if (!authError) Actions.home()
			})
	}

  return (
    <SignupForm
			onSubmit={handleFormSubmit}
			authError={props.authError}
			setAuthError={props.setAuthError}/>
  )
}

export default connect(
	(state) => ({authError: state.account.authError}),
	(dispatch) => (bindActionCreators(accountActionCreators, dispatch))
	)(Signup)
