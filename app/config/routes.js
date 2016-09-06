import React from 'react'
import { View } from 'react-native'
import { Router, Scene } from 'react-native-router-flux'
import {
  Home,
  Signin,
  Signup
} from '../components'

export default function Routes() {
  return (
    <Router>
      <Scene key="root">
        <Scene key="home" title="Home" component={Home} initial={true} hideNavBar={true} />
        <Scene key="signin" title="Signin" component={Signin} hideNavBar={false} />
        <Scene key="signup" title="Signup" component={Signup} hideNavBar={false} />
      </Scene>
    </Router>
  )
}
