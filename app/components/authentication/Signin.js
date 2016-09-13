import React from 'react';
import { SigninForm } from '../../components'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Actions } from 'react-native-router-flux'
import * as accountActionCreators from '../../actions/accounts'

function Signin (props) {

	handleFormSubmit = (credentials, authError) => {
		props.signinAndAuthUser(credentials)
			.then((authError) => {
				if (!authError) Actions.home()
			})
	}

  return (
    <SigninForm onSubmit={handleFormSubmit} authError={props.authError}/>
  )
}

export default connect(
	(state) => ({ authError: state.account.user.authError }),
	(dispatch) => (bindActionCreators(accountActionCreators, dispatch))
)(Signin)
