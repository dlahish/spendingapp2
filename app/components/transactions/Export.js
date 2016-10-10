import React, { Component, PropTypes } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity
} from 'react-native'
// import {  } from '../../components'
import { Actions, ActionConst } from 'react-native-router-flux'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as dataActionCreators from '../../actions/data'
import * as formActionCreators from '../../actions/form'
import Button from 'react-native-button'
import KeyboardSpacer from 'react-native-keyboard-spacer'
// import { email } from 'react-native-communications'
var Mailer = require('NativeModules').RNMail;

var MailExampleApp = React.createClass({
  handleHelp: function() {
    Mailer.mail({
      subject: 'need help',
      recipients: ['support@example.com'],
      ccRecipients: ['supportCC@example.com'],
      bccRecipients: ['supportBCC@example.com'],
      body: '',
      // isHTML: true, // iOS only, exclude if false
      attachment: {
        path: '',  // The absolute path of the file from which to read data.
        type: '',   // Mime Type: jpg, png, doc, ppt, html, pdf
        name: '',   // Optional: Custom filename for attachment
      }
    }, (error, event) => {
        if(error) {
          return console.log('error - ' + error)
          // AlertIOS.alert('Error', 'Could not send mail. Please send a mail to support@example.com');
        }
        console.log('event ' + event)
    });
  },
  render: function() {
    return (
      <View style={styles.container}>
      <TouchableHighlight
            onPress={this.handleHelp}
            underlayColor="#f7f7f7">
          <View style={styles.container}>
            {/* <Image source={require('image!announcement')} style={styles.image} /> */}
            <Text style={styles.text}>Send an email</Text>
          </View>
       </TouchableHighlight>
      </View>

    );
  }
});

export default MailExampleApp

// export default class Export extends Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//
//     }
//   }
//
//   render() {
//     return (
//       <View style={styles.container}>
//         <TouchableOpacity onPress={() => email(['emailAddress1', 'emailAddress2'],null,null,'My Subject','My body text')}>
//           <View style={styles.holder}>
//             <Text style={styles.text}>Send an email</Text>
//           </View>
//         </TouchableOpacity>
//       </View>
//     )
//   }
// }

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(253,253,253)',
  },
  holder: {
    flex: 0.25,
    justifyContent: 'center',
  },
  text: {
    fontSize: 32,
  }
})

// export default connect(
//   (state) => ({}),
//   (dispatch) => ({
//     actions: {
//       data: bindActionCreators(dataActionCreators, dispatch),
//       form: bindActionCreators(formActionCreators, dispatch)
//     }
//   })
// )(Export)
