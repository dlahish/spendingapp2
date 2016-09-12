import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Router, Scene, Switch, Actions, ActionConst } from 'react-native-router-flux'
import { bindActionCreators } from 'redux'
import * as accountActions from '../actions/accounts'
import * as dataActions from '../actions/data'
import Button from 'react-native-button'
import { connect } from 'react-redux'
import {
  Home,
  Signin,
  Signup,
  TabIcon,
  TabView,
  NewTransaction,
  CategoryList
} from '../components'

const RouterWithRedux = connect()(Router)

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'transparent', justifyContent: 'center',
    alignItems: 'center',
  },
  navBar: {
    backgroundColor: '#rgb(0, 153, 204)',
  },
  navBarTitleStlye: {
    color: '#FFF',
    fontWeight: '600'
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
    this.props.actions.data.setCurrentMonth()
 	}

  render() {
    return (
      <RouterWithRedux navigationBarStyle={styles.navBar} titleStyle={styles.navBarTitleStlye}>
        <Scene key="root" hideNavBar>
          <Scene
            key="switcher"
            component={connect(state => ({isAuthed: state.account.isAuthed}))(Switch)}
            selector={(props) => props.isAuthed ? 'authed' : 'authentication'}
            tabs={true}
          >
            <Scene key="authentication">
              <Scene key="signin" title="Signin" component={Signin} />
              <Scene key="signup" title="Signup" component={Signup} />
            </Scene>
            <Scene key="authed">
              <Scene key="tabbar" tabs={true} tabBarSelectedItemStyle={styles.tabBarSelectedItemStyle}>
                <Scene key="home" component={Home} icon={TabIcon} title={this.props.currentMonth}/>
              </Scene>
              <Scene
                key="newTransaction"
                title="New Transaction"
                component={NewTransaction}
                hideNavBar={true}
              />
              <Scene key="categoryList"  title="Categories" component={CategoryList} />
            </Scene>
          </Scene>
        </Scene>
      </RouterWithRedux>
    )
  }
}

export default connect(
  (state) => ({
    isAuthed: state.account.isAuthed,
    currentMonth: state.data.currentMonth
  }),
  (dispatch) => ({
    actions: {
      account: bindActionCreators(accountActions, dispatch),
      data: bindActionCreators(dataActions, dispatch)
    }
  })
)(Routes)
