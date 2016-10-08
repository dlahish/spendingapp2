import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Router, Scene, Switch, Actions, ActionConst } from 'react-native-router-flux'
import { bindActionCreators } from 'redux'
import * as accountActions from '../actions/accounts'
import * as dataActions from '../actions/data'
import * as settingsActions from '../actions/settings'
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
  Transaction,
  CurrencySymbols,
  PresetTransactions,
  Loader
} from '../components'
import Icon from 'react-native-vector-icons/FontAwesome'
const plusIcon = (<Icon name='plus' size={26} color='#FFF' />)
const plusIconBlackDisabled = (<Icon name='plus' size={26} color='#BBBBBB' />)

const RouterWithRedux = connect()(Router)

class Routes extends Component {
  componentDidMount() {
    this.props.actions.account.checkIfAuthed()
    this.props.actions.data.setCurrentMonth()
  }

  render() {
    return (
      this.props.loading ?
          <Loader /> :
          <RouterWithRedux
            navigationBarStyle={styles.navBar}
            titleStyle={styles.navBarTitleStlye}
            leftButtonIconStyle={{tintColor: '#FFF'}}
          >
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
                  <Scene
                    key="home"
                    title="Home"
                    component={Home}
                    icon={TabIcon}
                    hideNavBar={true}
                  />
                  <Scene key="transactions"
                    component={Transactions}
                    removeTransaction={this.props.actions.data.removeTransaction}
                    icon={TabIcon}
                    title='Transactions'
                    leftTitle='Edit'
                    leftButtonStyle={{paddingTop: 10}}
                    leftButtonTextStyle={{color: '#FFF'}}
                    onLeft={() => Actions.editTransactions({editMode: true, selectedItemIndex: false})}
                    rightTitle={plusIcon}
                    onRight={() => Actions.newTransaction()}
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
                  <Scene key="settings" component={Settings} icon={TabIcon} title='Settings' />
                  <Scene
                    key="categories"
                    component={Categories}
                    title='Categories'
                    hideNavBar={true}
                  >
                    <Scene key="viewCategoties" hideTabBar={false}/>
                    <Scene key="editCategory"
                      leftTitle='Done'
                      leftButtonTextStyle={{color: '#fff'}}
                      onLeft={() => Actions.viewCategoties({
                        editMode: false, deleteButtonWidth: 0, selectedCategoryIndex: null})}
                      rightTitle={plusIconBlackDisabled}
                      onRight={() => {}}
                      hideTabBar={true}
                    />
                  </Scene>
                  <Scene
                    key="PresetTransactions"
                    component={connect(state =>
                      ({favoriteTransactions: state.data.favoriteTransactions}))(PresetTransactions)}
                    removeFavoriteTransaction={this.props.actions.data.removeFavoriteTransaction}
                    hideNavBar={true}
                  >
                    <Scene key="viewFavoriteTransactions" />
                    <Scene key="editFavoriteTransactions" />
                  </Scene>
                  <Scene
                    key="currencySymbols"
                    title="Currency Symbols"
                    component={CurrencySymbols}
                    hideNavBar={false}
                    setCurrancySymbol={this.props.actions.settings.setCurrancySymbol}
                    leftTitle='Back'
                    onLeft={() => Actions.settings()}
                    leftButtonTextStyle={{color: '#fff'}}
                  />
                </Scene>

                <Scene
                  key="newTransaction"
                  component={NewTransaction}
                  hideNavBar={true}
                  removeTransaction={this.props.actions.data.removeTransaction}
                  title="New Transaction"
                >
                  <Scene key="viewNewTransaction" />
                  <Scene key="newFavoriteTransaction" />
                </Scene>
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
  (state) => ({
    token: state.account.token,
    loading: !state.storage.storageLoaded
  }),
  (dispatch) => ({
    actions: {
      account: bindActionCreators(accountActions, dispatch),
      data: bindActionCreators(dataActions, dispatch),
      settings: bindActionCreators(settingsActions, dispatch)
    }
  }))(Routes)

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
  }
})
