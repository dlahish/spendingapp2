import React, { PropTypes, Component } from 'react'
import { Text, View, StyleSheet, ScrollView, TouchableHighlight, AlertIOS, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import moment from 'moment'
var RNFS = require('react-native-fs');


class Fs extends Component {
    // componentWillMount() {
    //   RNFS.readDir(RNFS.MainBundlePath) // On Android, use "RNFS.DocumentDirectoryPath" (MainBundlePath is not defined)
    //     .then((result) => {
    //       console.log('GOT RESULT', result);
    //
    //       // stat the first file
    //       return Promise.all([RNFS.stat(result[0].path), result[0].path]);
    //     })
    //     .then((statResult) => {
    //       if (statResult[0].isFile()) {
    //         // if we have a file, read it
    //         return RNFS.readFile(statResult[1], 'utf8');
    //       }
    //
    //       return 'no file';
    //     })
    //     .then((contents) => {
    //       // log the file contents
    //       console.log(contents);
    //     })
    //     .catch((err) => {
    //       console.log(err.message, err.code);
    //     });
    // }

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

    onCreatefile = () => {
      // create a path you want to write to
      var path = RNFS.DocumentDirectoryPath + '/test.csv';
      var text = this.createCsvContent()

      // write the file
      RNFS.writeFile(path, text, 'utf8')
        .then((success) => {
          console.log('path', path);
          console.log('FILE WRITTEN!');
        })
        .catch((err) => {
          console.log(err.message);
        });
    }

    render() {
      return (
        <View style={{paddingTop: 64}}>
          <Text style={{marginBottom: 40}}>File System</Text>
          <TouchableOpacity onPress={() => this.createCsv()}>
            <Text>Create File</Text>
          </TouchableOpacity>
        </View>
      )
    }
}

  export default connect(
    (state) => ({ visibleTransactions: state.data.visibleTransactions }),
    (dispatch) => ({})
  )(Fs)
