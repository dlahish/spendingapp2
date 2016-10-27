import React, { PropTypes, Component } from 'react'
import { Text, View, StyleSheet, ScrollView, TouchableHighlight } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as settingsActionCreators from '../../actions/settings'
import * as accountActions from '../../actions/accounts'
import Icon from 'react-native-vector-icons/FontAwesome'
const smallRightArrow = (<Icon name='angle-right' size={22} />)
import SettingsList from 'react-native-settings-list'

function getSymbol(symbol) {
  if (typeof symbol === 'number') return String.fromCharCode(symbol)
  else return symbol
}

class Settings extends Component {
  render() {
    var bgColor = '#DCE3F4'
    return (
      <View style={{backgroundColor:'#EFEFF4',flex:1, paddingTop: 64, paddingBottom: 50}}>
        <View style={{backgroundColor:'#EFEFF4',flex:1}}>
          <SettingsList borderColor='#c8c7cc' defaultItemSize={50}>
            <SettingsList.Header headerStyle={{marginTop:15}}/>
            <SettingsList.Item
              title='Currency Symbol'
              titleInfo={getSymbol(this.props.currencySymbol)}
              titleInfoStyle={styles.titleInfoStyle}
              onPress={() =>
                Actions.currencySymbols()}
            />
            <SettingsList.Header headerStyle={{marginTop:15}}/>
            <SettingsList.Item
              title='Edit Favorite Transaction'
              onPress={() => Actions.presetTransactions({editMode: false})}
            />
            <SettingsList.Header headerStyle={{marginTop:15}}/>
            <SettingsList.Item
              title='Categories'
              onPress={() => Actions.categories({editMode: false})}
            />
            <SettingsList.Header headerStyle={{marginTop:15}}/>
            <SettingsList.Item
              title='Custom Favorites'
              hasSwitch={true}
              hasNavArrow={false}
              switchState={this.props.customFavorites}
              switchOnValueChange={() => this.props.actions.settings.setCustomFavorites()}
            />
            <SettingsList.Header headerStyle={{marginTop:15}}/>
            <SettingsList.Item
              title='Log Out'
              hasNavArrow={false}
              onPress={() => this.props.actions.account.logoutAndUnauthUser()}
            />
          </SettingsList>
        </View>
      </View>
    )
  }
}

const styles = {
  titleInfoStyle: {
    color: 'black'
  }
}

export default connect(
  (state) => ({
    currencySymbol: state.settings.currencySymbol,
    customFavorites: state.settings.customFavorites }),
  (dispatch) => ({
    actions: {
      settings: bindActionCreators(settingsActionCreators, dispatch),
      account:  bindActionCreators(accountActions, dispatch)
    }})
)(Settings)
