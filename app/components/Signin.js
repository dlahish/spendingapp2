import React from 'react';
import { AccountForm } from '../components'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Actions } from 'react-native-router-flux'
import * as accountActionCreators from '../actions/accounts'

function Signin (props) {

	handleFormSubmit = (credentials, authError) => {
		console.log('handleFormSubmit ----')
		console.log('authError - ' + authError)
		props.signinAndAuthUser(credentials)
			.then((authError) => {
				if (!authError) Actions.home()
			})
	}

  return (
    <AccountForm onSubmit={handleFormSubmit} authError={props.authError}/>
  )
}

export default connect(
	(state) => ({ authError: state.account.user.authError }),
	(dispatch) => (bindActionCreators(accountActionCreators, dispatch))
)(Signin)
