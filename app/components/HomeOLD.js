import React, { Component } from 'react'
import { View, Text, StyleSheet, AsyncStorage } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { GuestActions, UserActions } from '../components'
import * as accountActions from '../actions/accounts'

class Home extends Component {
  componentWillMount() {
    console.log('--- COMPONENT WILL MOUNT ---')
    console.log(AsyncStorage.getItem('spending-user-token'))
  }

  componentDidMount = () => {
 		this.props.actions.account.fetchIfCurrentUser()
 	// 	this.props.actions.location.getAndSetCurrentLocation()
 	}

  availableActions = (isAuthed) => {
		if(isAuthed === true) return <UserActions handleLogout={this.props.actions.account.logoutAndUnauthUser} />
		else if(isAuthed === false) return <GuestActions />
		else return <Text>Loading...</Text>
	}

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>Spending</Text>
        <View>
          {this.availableActions(this.props.isAuthed)}
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
		flex:1,
		alignItems: "center",
		justifyContent:"space-around",
		backgroundColor: '#f2f2f2',
	},
	heading: {
		fontSize: 30,
		fontWeight: "100",
	}
})

export default connect(
  (state) => ({
    isAuthed: state.account.isAuthed
  }),
  (dispatch) => ({
    actions: {
      account: bindActionCreators(accountActions, dispatch)
    }
  })
)(Home)
