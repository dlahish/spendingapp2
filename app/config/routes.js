import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Router, Scene, Switch, Actions, ActionConst } from 'react-native-router-flux'
import { bindActionCreators } from 'redux'
import * as accountActions from '../actions/accounts'
import Button from 'react-native-button'
import { connect } from 'react-redux'
import {
  Home,
  Signin,
  Signup,
  TabIcon,
  TabView,
  NewTransaction
} from '../components'

const RouterWithRedux = connect()(Router)

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'transparent', justifyContent: 'center',
    alignItems: 'center',
  },
  tabBarStyle: {
    backgroundColor: '#eee',
  },
  tabBarSelectedItemStyle: {
    backgroundColor: '#ddd',
  }
})

class Routes extends Component {
  componentDidMount = () => {
 		this.props.actions.account.fetchIfCurrentUser()
 	}

  render() {
    return (
      <RouterWithRedux>
        <Scene key="root" hideNavBar>
          <Scene
            key="switcher"
            component={connect(state => ({isAuthed: state.account.isAuthed}))(Switch)}
            selector={(props) => props.isAuthed ? 'authed' : 'authentication'}
            tabs={true}
          >
            <Scene key="authentication">
              <Scene key="signin" title="Signin" component={Signin} hideNavBar={false} />
              <Scene key="signup" title="Signup" component={Signup} hideNavBar={false} />
            </Scene>
            <Scene key="authed">
              <Scene key="tabbar" tabs={true} tabBarSelectedItemStyle={styles.tabBarSelectedItemStyle}>
                <Scene key="home" title="Home" hideNavBar={true} component={Home} icon={TabIcon} />
              </Scene>
              <Scene key="newTransaction" title="New Transaction" component={NewTransaction} hideNavBar/>
            </Scene>
          </Scene>
        </Scene>
      </RouterWithRedux>
    )
  }
}

export default connect(
  (state) => ({
    isAuthed: state.account.isAuthed
  }),
  (dispatch) => ({
    actions: {
      account: bindActionCreators(accountActions, dispatch)
    }
  })
)(Routes)
