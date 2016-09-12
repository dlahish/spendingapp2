import React from 'react'
import { Text, View, StyleSheet, TouchableHighlight } from 'react-native'
import { addBorder } from '../components'

export default NewTransactionNavBar = (props) =>
  <View style={styles.container}>
    <TouchableHighlight
      style={styles.button}
      onPress={() => props.onPress()}
    >
      <Text style={styles.buttonText}>
        Cancel
      </Text>
    </TouchableHighlight>
    <View style={styles.titleWrapper}>
      <Text style={styles.title}>New Transaction</Text>
    </View>
    <TouchableHighlight
        style={styles.button}
        onPress={() => props.onPress()}
      >
        <Text style={styles.buttonText}>
          Save
        </Text>
    </TouchableHighlight>
  </View>

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 64,
    backgroundColor: 'rgb(0, 153, 204)',
    borderBottomWidth: 0.5,
    borderBottomColor: '#828287'
  },
  titleWrapper: {
    marginTop: 20,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    textAlign: 'center',
    color: '#FFF',
    fontSize: 18,
    fontWeight: '500',
    width: 180,
    alignSelf: 'center',
  },
  button: {
    marginTop: 20,
    width: 70,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    color: '#FFF',
    fontSize: 17,
  }
})

// const styles = StyleSheet.create({
//   title: {
//     textAlign: 'center',
//     color: '#FFF',
//     fontSize: 18,
//     width: 180,
//     alignSelf: 'center',
//   },
//   titleWrapper: {
//     marginTop: 10,
//     position: 'absolute',
//     top: 20,
//     left: 0,
//     right: 0,
//   },
//   container: {
//     backgroundColor: 'rgb(0, 153, 204)',
//     paddingTop: 0,
//     top: 0,
//     height: 64,
//     right: 0,
//     left: 0,
//     borderBottomWidth: 0.5,
//     borderBottomColor: '#828287'
//     // position: 'absolute',
//   },
//   rightButton: {
//     width: 100,
//     height: 37,
//     position: 'absolute',
//     top: 22,
//     right: 2,
//     padding: 8,
//   },
//   leftButton: {
//     marginTop: 20
//     // width: 100,
//     // height: 37,
//     // position: 'absolute',
//     // top: 20,
//     // left: 2,
//     // padding: 8,
//   },
//   barRightButtonText: {
//     color: 'rgb(0, 122, 255)',
//     textAlign: 'right',
//     fontSize: 17,
//   },
//   barLeftButtonText: {
//     color: '#FFF',
//     textAlign: 'left',
//     fontSize: 17,
//   }
// });
