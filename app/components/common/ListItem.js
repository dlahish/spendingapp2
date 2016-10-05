import React from 'react'
import {Text, TouchableHighlight, View} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

var styles = require('./ListItemStyles.js')

var Listitem = React.createClass({
  getDefaultProps: function() {
    return {
      onPress: null,
      text: null,
      underlayColor: "rgba(0,0,0,.015)",
    }
  }
, _handlePress: function() {
    var onPress = this.props.onPress
    if (onPress) onPress()
  }
, render: function() {
    var self = this
    var p = self.props

    //  style container (for backgroundColor and indent)
    var styleLiContainer = [styles.liContainer]
    if (p.backgroundColor) styleLiContainer.push([{ backgroundColor: p.backgroundColor }])
    if (p.indent > -1) styleLiContainer.push([{ paddingLeft: p.indent }])

    var listitemChild = <Text style={[styles.liText, p.styleText]}>{p.text}</Text>

    if (p.children) var listitemChild = <View>{p.children}</View>

    var listitem = <View style={[styles.li, p.style]}>{listitemChild}</View>

    return (
      p.onPress && p.icon ?
        <View style={[styleLiContainer, {flexDirection: 'row'}]}>
          <TouchableHighlight
            underlayColor={p.underlayColor}
            onPress={self._handlePress}
          >
            <Icon name={p.icon} style={[styles.li, styles.icon, {color: p.iconColor}]}/>
          </TouchableHighlight>
          <View style={{flex: 1}}>
              {listitem}
          </View>
        </View>
      : <View style={styleLiContainer}>{listitem}</View>
    )
  }
})

module.exports = Listitem
