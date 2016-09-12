import Icon from 'react-native-vector-icons/Ionicons'
const homeIcon = (<Icon name="ios-home" size={26} />)
import React, {
  PropTypes,
} from 'react';
import {
  Text, View
} from 'react-native';

const propTypes = {
  selected: PropTypes.bool,
  title: PropTypes.string,
};

const TabIcon = (props) => (
  <View>
    {homeIcon}
  </View>
);

TabIcon.propTypes = propTypes;

export default TabIcon;
