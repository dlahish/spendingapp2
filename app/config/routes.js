import React from 'react'
import { View, Text } from 'react-native'
import { Router, Scene, Switch, Actions, ActionConst } from 'react-native-router-flux'
import Button from 'react-native-button'
import { connect } from 'react-redux'
import {
  Home,
  Signin,
  Signup
} from '../components'

const RouterWithRedux = connect()(Router)

export default function Routes() {
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
            <Scene key="home" title="Home" component={Home} />
          </Scene>
        </Scene>
      </Scene>
    </RouterWithRedux>
  )
}
