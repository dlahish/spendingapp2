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

let currentSwitchPage = 'text1'

const SwitcherPage = (props) => (
  <View>
    <Text style={{ marginTop: 100, textAlign: 'center' }}>current page: {props.text}</Text>
    <Button
      onPress={() => {
        console.log('SWITCH ---------')
        currentSwitchPage = currentSwitchPage === 'text1' ? 'text2' : 'text1';
        Actions.refresh({ key: 'switcher' });
      }}
    >
      Switch!
    </Button>
    <Button
      onPress={() => {
        Actions.home({ type: ActionConst.RESET });
      }}
    >
      Exit
    </Button>
  </View>
);

export default function Routes() {
  return (
    <RouterWithRedux>
      <Scene key="root" hideNavBar>
        <Scene
          key="switcher"
          component={Switch}
          selector={() => { return currentSwitchPage }}
        >
          <Scene
            key="text1"
            component={(props) => <SwitcherPage {...props} text={currentSwitchPage} />}
          />
          <Scene
            key="text2"
            component={(props) => <SwitcherPage {...props} text={currentSwitchPage} />}
          />
        </Scene>
        <Scene key="home" title="Home" component={Home} />
        <Scene key="signin" title="Signin" component={Signin} hideNavBar={false} />
        <Scene key="signup" title="Signup" component={Signup} hideNavBar={false} />
      </Scene>
    </RouterWithRedux>
  )
}
