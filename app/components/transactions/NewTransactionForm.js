import React, { Component, PropTypes } from 'react'
import { GiftedForm, GiftedFormManager } from 'react-native-gifted-form'
import Icon from 'react-native-vector-icons/Ionicons'
import { connect } from 'react-redux'
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  ListView,
} from 'react-native'
import Button from 'react-native-button'
import { addBorder, DatePicker, DatePickerModal } from '../../components'
import { Actions } from 'react-native-router-flux'

function getIcon(name) {
  return <Icon name={name} size={16} color='black' style={{paddingLeft: 10}}/>
}

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
    const { name, category, categoryType, amount, date, notes, handleValueChange, onDateChange, error } = this.props
    return (
      <View style={[styles.container]}>
        <GiftedForm
          formName='newReminderForm'
          openModal={route => Actions.formModal({ ...route, title: route.getTitle() })}
          onValueChange={(values) => {
            handleValueChange(values, GiftedFormManager.validate('newReminderForm'))
          }}
          validators={{
            amount: {
              title: 'Amount',
              validate: [{
                validator: 'isNumeric',
                message: '{TITLE} must be a number'
              }]
            }
          }}
        >
          <GiftedForm.NoticeWidget title={error} style={{paddingTop: 2, color: 'red'}}/>
          {/* {this.props.title !== 'New Favorite Transaction'
            ? <GiftedForm.RowDatePicker
                name='dateRow'
                title='Date'
                placeholder='Enter date'
                image={getIcon('ios-calendar')}
                date={date}
                onDateChange={onDateChange}
              /> : null } */}
              <GiftedForm.TextInputWidget
                name='amount'
                title='Amount'
                placeholder='Enter amount'
                clearButtonMode='while-editing'
                value={amount}
                image={getIcon('ios-cash')}
              />
              {/* <GiftedForm.RowWidgetWithTitle
                title='Category'
                disclosure={true}
                onPress={() => Actions.categoryList({categoryType: this.props.categoryType})}
                image={getIcon('ios-list-box')}
                mainContent={category}
                placeholder='Category'
              /> */}
              <GiftedForm.TextAreaWidget
                name='notes'
                title='Notes'
                placeholder='Enter Notes'
                clearButtonMode='while-editing'
                value={notes}
              />
              <GiftedForm.ErrorsWidget />
              <GiftedForm.SubmitWidget
                title='Add new transactions'
                widgetStyles={{
                  submitButton: {
                    backgroundColor: 'green',
                  }
                }}
                onSubmit={(isValid, values, validationResults, postSubmit = null, modalNavigator = null) => {
                  if (isValid === true) {
                    values.date = date
                    GiftedFormManager.reset('newReminderForm')
                    this.props.onSaveNewTransaction(isValid)
                  } else {
                    console.log('validationResults', validationResults)
                  }
                }}
              />
        </GiftedForm>
        {/* {this.props.title !== 'New Favorite Transaction'
          ? <View style={[styles.inputWrapper]}>
              <Text style={styles.inputTitle}>
                Date:
              </Text>
              <TouchableHighlight onPress={this.setModalVisible.bind(this, true)} style={styles.touchableHighlight} >
                <Text style={styles.date}>
                  {this.props.date.toLocaleDateString('en-GB')}
                </Text>
              </TouchableHighlight>
            </View> :<View></View>}

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
        /> */}
      </View>
    )
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    backgroundColor: "#FFF",
    // paddingTop: 20
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
