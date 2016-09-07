import React, { Component } from 'react'
import { View, Text, StyleSheet, AsyncStorage } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { GuestActions, UserActions, NewTransaction, ShowDetails } from '../components'
import * as accountActions from '../actions/accounts'
import * as dataActions from '../actions/data'
import Chart from 'react-native-chart'

function getMonth() {
  const monthNames = ["January", "February", "March", "April", "May", "June",
                      "July", "August", "September", "October", "November", "December"];
  const d = new Date();
  return monthNames[d.getMonth()]
}

class Home extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.toolbar}>
          <Text style={styles.monthTitle}>{getMonth()}</Text>
        </View>
        <View style={styles.content}>
          <View style={styles.details}>
            <ShowDetails monthTotal={this.props.actions.data.getMonthTotal} />
          </View>
          <View style={styles.actions}>
            <NewTransaction />
            <UserActions handleLogout={this.props.actions.account.logoutAndUnauthUser} />
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
		backgroundColor: '#f2f2f2',
	},
  details: {
    flex: 1
  },
  actions: {
    flex: 1
  },
  toolbar: {
    alignItems: 'center',
    paddingTop:30,
    paddingBottom:10,
    backgroundColor: 'rgb(0, 153, 204)'
  },
  monthTitle: {
    fontSize: 18,
    textAlign:'center',
    fontWeight:'bold',
    color:'#fff',
  },
  content: {
    flex: 9,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#eeccff',
    paddingBottom: 60
  },
  messageBox:{
    backgroundColor:'#ef553a',
    width:300,
    paddingTop:10,
    paddingBottom:20,
    paddingLeft:20,
    paddingRight:20,
    borderRadius:10
  },
  messageBoxTitleText:{
    fontWeight:'bold',
    color:'#fff',
    textAlign:'center',
    fontSize:20,
    marginBottom:10
  },
  messageBoxBodyText:{
    color:'#fff',
    fontSize:16
  }
})

export default connect(
  (state) => ({
    isAuthed: state.account.isAuthed
  }),
  (dispatch) => ({
    actions: {
      account: bindActionCreators(accountActions, dispatch),
      data: bindActionCreators(dataActions, dispatch)
    }
  })
)(Home)
