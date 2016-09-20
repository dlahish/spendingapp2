import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  DatePickerIOS,
  TouchableHighlight,
  Modal,
  ListView,
  TouchableOpacity
} from 'react-native'
import Button from 'react-native-button'
import { addBorder, DatePicker, DatePickerModal } from '../../components'
import { Actions } from 'react-native-router-flux'

class NewTransactionForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dateModalVisible: false,
      timeZoneOffsetInHours: (-1) * (new Date()).getTimezoneOffset() / 60,
      dataSource: null
    }
  }

  setModalVisible = (visible) => {
    this.setState({ dateModalVisible: visible })
  }

  setCategoryColor = (category) => {
    if (category === 'Category') return 0.5
    else return 1
  }

  render() {
    return (
      <View style={[styles.container]}>
        <View style={[styles.inputWrapper]}>
          <Text style={styles.inputTitle}>
            Date:
          </Text>
          <TouchableHighlight onPress={this.setModalVisible.bind(this, true)} style={styles.touchableHighlight} >
            <Text style={styles.date}>
              {this.props.date.toLocaleDateString('en-GB')}
            </Text>
          </TouchableHighlight>
        </View>

        <View style={[styles.inputWrapper]}>
          <Text style={styles.inputTitle}>
            Amount:
          </Text>
          <TextInput style={styles.input}
            placeholder='Amount'
            onChangeText={(value) => this.props.onInputChange('amount', value)}
            value={this.props.amount}
            keyboardType='numeric'
            autoCapitalize='none'
            multiline={true}
            numberOfLines = {1}
            maxLength = {6}
          />
        </View>

        <View style={[styles.inputWrapper]}>
          <Text style={styles.inputTitle} onPress={() => Actions.categoryList}>
            Category:
          </Text>
          <TouchableHighlight
            onPress={() => Actions.categoryList({categoryType: this.props.categoryType})}
            style={[styles.touchableHighlight, {padding: 0}]}
          >
            <Text style={[styles.categoryPlaceHolder, {opacity: this.setCategoryColor(this.props.category)}]}>
              {this.props.category}
            </Text>
          </TouchableHighlight>
        </View>

        <View style={[styles.inputWrapper, styles.notesWrapper]}>
          <Text style={[styles.notesTitle]}>
            Notes:
          </Text>
          <TextInput style={[styles.input, {paddingTop: 4}]}
            placeholder='Notes'
            onChangeText={(value) => this.props.onInputChange('notes', value)}
            value={this.props.notes}
            multiline = {true}
            numberOfLines = {4}
            maxLength = {40}
            autoCapitalize='none'
            />
        </View>
        {this.props.error.length > 0 ?
          <View style={[styles.errorWrapper]}>
            <Text style={[styles.error]}>{this.props.error}</Text>
          </View> : <View></View>
        }
        <DatePickerModal
          setModalVisible={this.setModalVisible}
          modalVisible={this.state.dateModalVisible}
          date={this.props.date}
          timeZoneOffsetInHours={this.state.timeZoneOffsetInHours}
          onDateChange={this.props.onDateChange}
        />
      </View>
    )
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    // backgroundColor: "#f2f2f2",
    backgroundColor: "#FFF",
    paddingTop: 20
  },
  input: {
    flex: 2,
    backgroundColor: "#fff",
    fontSize: 20,
    marginBottom: 10,
    padding:10,
    borderBottomWidth: 1,
    borderBottomColor: '#828287'
  },
  inputTitle: {
    flex: 1,
    backgroundColor: "#fff",
    marginBottom: 10,
    padding:10,
    paddingRight: 0,
    fontWeight: '600',
    fontSize: 20
  },
  inputWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 10
  },
  notesWrapper: {
    height: 84,
    alignItems: 'flex-start'
  },
  notesTitle: {
    flex: 1,
    height: 74,
    backgroundColor: "#fff",
    marginBottom: 10,
    padding:10,
    paddingRight: 0,
    fontWeight: '600',
    fontSize: 20
  },
  touchableHighlight: {
    flex: 2,
    backgroundColor: "#fff",
    marginBottom: 10,
    padding:10,
    paddingRight: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#828287'
  },
  date: {
    flex: 1,
    fontWeight: '600',
    fontSize: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#828287'
  },
  categoryPlaceHolder: {
    flex: 1,
    fontSize: 20,
    opacity: 0.5,
    fontWeight: '400',
    paddingTop: 10
  },
  errorWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 10
  },
  error: {
    color: 'red',
    fontSize: 20,
    marginBottom: 10,
    padding:10
  }
})

NewTransactionForm.propTypes = {
  date: PropTypes.object,
  amount: PropTypes.string,
  category: PropTypes.string,
  notes: PropTypes.string,
  error: PropTypes.string,
  onDateChange: PropTypes.func.isRequired,
  onInputChange: PropTypes.func.isRequired,
}

export default connect(
  (state) => ({newCategory: state.form.category})
)(NewTransactionForm)
