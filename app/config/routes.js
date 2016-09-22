import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Router, Scene, Switch, Actions, ActionConst } from 'react-native-router-flux'
import { bindActionCreators } from 'redux'
import * as accountActions from '../actions/accounts'
import * as dataActions from '../actions/data'
import { fetchIfCurrentUser } from '../actions/accounts'
import Button from 'react-native-button'
import { connect } from 'react-redux'
import {
  Home,
  Signin,
  Signup,
  TabIcon,
  TabView,
  NewTransaction,
  CategoryList,
  Transactions,
  Categories,
  NewCategory,
  Settings,
  Transaction
} from '../components'
import Icon from 'react-native-vector-icons/FontAwesome'
const plusIcon = (<Icon name='plus' size={26} color='#FFF' />)
const plusIconBlackDisabled = (<Icon name='plus' size={26} color='#BBBBBB' />)

const RouterWithRedux = connect()(Router)

// import styles from '../styles/routes'
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'transparent', justifyContent: 'center',
    alignItems: 'center',
  },
  navBar: {
    backgroundColor: '#rgb(0, 153, 204)',
  },
  tabBar: {
    borderTopColor: '#BBB',
    borderTopWidth: 1,
    backgroundColor: '#FFF'
  },
  navBarTitleStlye: {
    color: '#FFF',
    fontWeight: '600'
  },
  tabBarStyle: {},
  tabBarSelectedItemStyle: {}
})

class Routes extends Component {
  componentDidMount() {
    this.props.actions.account.fetchIfCurrentUser()
    this.props.actions.data.setCurrentMonth()
  }

  render() {
    return (
      <RouterWithRedux navigationBarStyle={styles.navBar} titleStyle={styles.navBarTitleStlye}>
        <Scene
          key="root"
          component={connect(state => ({isAuthed: state.account.isAuthed}))(Switch)}
          selector={(props) => props.isAuthed ? 'authed' : 'authentication'}
          tabs={true}
        >
          <Scene key="authentication" >
            <Scene key="signin" title="Signin" component={Signin} />
            <Scene key="signup" title="Signup" component={Signup} />
          </Scene>

          <Scene key="authed">
            <Scene key="tabbar" tabs={true} tabBarStyle={styles.tabBar}>
              <Scene key="home" component={Home} icon={TabIcon} title={this.props.currentMonth} />
              <Scene key="transactions"
                component={connect(state =>
                  ({transactions: state.data.transactions,
                    currentMonth: state.data.currentMonth}))(Transactions)}
                removeTransaction={this.props.actions.data.removeTransaction}
                icon={TabIcon}
                title='Transactions'
                leftTitle='Edit'
                leftButtonStyle={{paddingTop: 10}}
                leftButtonTextStyle={{color: '#FFF'}}
                onLeft={() => Actions.editTransactions({editMode: true, selectedItemIndex: false})}
              >
                <Scene key="viewTransactions" />
                <Scene key="editTransactions"
                  leftTitle='Done'
                  onLeft={() => Actions.viewTransactions({
                    editMode: false,
                    selectedItemIndex: false})}
                  rightTitle={plusIconBlackDisabled}
                  onRight={() => {}}
                  hideTabBar={true}
                />
              </Scene>
              <Scene
                key="categories"
                component={Categories}
                icon={TabIcon}
                title='Categories'
                leftTitle='Edit'
                leftButtonTextStyle={{color: '#FFF'}}
                onLeft={() => Actions.editCategory({editMode: true})}
                rightTitle={plusIcon}
                onRight={() => Actions.newCategory()}
              >
                <Scene key="viewCategoties" hideTabBar={false}/>
                <Scene key="editCategory"
                  leftTitle='Done'
                  onLeft={() => Actions.viewCategoties({editMode: false, deleteButtonWidth: 0, selectedCategoryIndex: null})}
                  rightTitle={plusIconBlackDisabled}
                  onRight={() => {}}
                  hideTabBar={true}
                />
              </Scene>
              <Scene key="settings" component={Settings} icon={TabIcon} title='Settings' />
            </Scene>
            <Scene
              key="newTransaction"
              title="New Transaction"
              component={NewTransaction}
              hideNavBar={true}
              type={ActionConst.RESET}
            />
            <Scene
              key="categoryList"
              title="Categories"
              component={CategoryList}
              hideNavBar={false}
              hideBackImage={true}
              backTitle='Back'
              backButtonTextStyle={{color: 'white'}}
              onBack={() => Actions.pop()}
              rightTitle={plusIcon}
              onRight={() => Actions.newCategory()}
            />
            <Scene
              key="newCategory"
              title="New Category"
              component={NewCategory}
              hideNavBar={true}
            />
          </Scene>
        </Scene>
      </RouterWithRedux>
    )
  }
}

export default connect(
  (state) => ({currentMonth: state.data.currentMonth}),
  (dispatch) => ({
    actions: {
      account: bindActionCreators(accountActions, dispatch),
      data: bindActionCreators(dataActions, dispatch)
    }
  }))(Routes)
