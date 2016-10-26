import React, { PropTypes, Component } from 'react'
import { Text, View, StyleSheet, ScrollView, TouchableHighlight, AlertIOS } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import moment from 'moment'
import * as settingsActions from '../../actions/settings'
var Mailer = require('NativeModules').RNMail;
var RNFS = require('react-native-fs');

class MailerPage extends Component {
  createCsvContent = () => {
    let fileContent = 'Category, Amount, Date, Type, Notes'+'\n'
    let date = new Date(this.props.visibleTransactions[0].date)

    for (var i=0; i < this.props.visibleTransactions.length; i++) {
      let transaction = this.props.visibleTransactions[i]
      let formattedDate = moment(transaction.date).format('DD/MM/YYYY')
      fileContent += `${transaction.category}, ${transaction.amount}, ${formattedDate}, ${transaction.type}, ${transaction.notes},` + '\n'
    }
    return fileContent
  }

  onSendEmail = () => {
    // create a path you want to write to
    var path = RNFS.DocumentDirectoryPath + '/transactions.csv';
    var text = this.createCsvContent()

    // write the file
    RNFS.writeFile(path, text, 'utf8')
      .then((success) => {
        console.log('path', path);
        console.log('FILE WRITTEN!');
        this.handleHelp()
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  handleHelp = () => {
    var path = RNFS.DocumentDirectoryPath + '/transactions.csv';
    Mailer.mail({
      subject: 'SpendingApp - transactions CSV',
      recipients: ['nadavlachish@gmail.com'],
      // ccRecipients: ['supportCC@example.com'],
      // bccRecipients: ['supportBCC@example.com'],
      body: 'Hello World',
      isHTML: true, // iOS only, exclude if false
      attachment: {
        path: path,  // The absolute path of the file from which to read data.
        type: 'doc',   // Mime Type: jpg, png, doc, ppt, html, pdf
        name: 'transactions.csv',   // Optional: Custom filename for attachment
      }
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
            onPress={() => this.onSendEmail()}
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
  (state) => ({ visibleTransactions: state.data.visibleTransactions }),
  (dispatch) => ({
    actions: {
      settings: bindActionCreators(settingsActions, dispatch)
    }
  })
)(MailerPage)
