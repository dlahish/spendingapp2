import React, { PropTypes, Component } from 'react'
import { Text, View, StyleSheet, ScrollView, TouchableHighlight, AlertIOS } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as settingsActions from '../../actions/settings'
var Mailer = require('NativeModules').RNMail;

class MailerPage extends Component {
  handleHelp = () => {
    Mailer.mail({
      subject: 'need help',
      recipients: ['nadavlachish@gmail.com'],
      // ccRecipients: ['supportCC@example.com'],
      // bccRecipients: ['supportBCC@example.com'],
      body: 'Hello World',
      isHTML: true, // iOS only, exclude if false
      // attachment: {
      //   path: '',  // The absolute path of the file from which to read data.
      //   type: '',   // Mime Type: jpg, png, doc, ppt, html, pdf
      //   name: '',   // Optional: Custom filename for attachment
      // }
    }, (error, event) => {
        if(error) {
          console.log('error', error)
          AlertIOS.alert('Error', 'Could not send mail. Please send a mail to support@example.com');
        }
    }
  );
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableHighlight
            onPress={this.handleHelp}
            underlayColor="#f7f7f7">
          <View style={{marginBottom: 20}}>
            <Text>Send an Email</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight
            onPress={() => this.props.actions.settings.createCsv()}
            underlayColor="#f7f7f7">
          <View>
            <Text>Create CSV</Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  }
};

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
}

export default connect(
  (state) => ({}),
  (dispatch) => ({
    actions: {
      settings: bindActionCreators(settingsActions, dispatch)
    }
  })
)(MailerPage)
