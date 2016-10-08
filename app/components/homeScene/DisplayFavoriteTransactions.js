import React, { Component, PropTypes } from 'react'
import { View, Text, TouchableHighlight, StyleSheet } from 'react-native'
import { ListItem } from '../../components'
import { Actions } from 'react-native-router-flux'

renderFavoriteTransactions = (favTransaction, i, onAddNewFavortieTransaction, favTransactionsLength) => {
  const favTransactionText = getFavortieTransactionText(favTransaction)
  const iconColor = getAddButtonColor(favTransaction)
  return (
      <View key={i}>
        <ListItem
          icon='plus'
          iconStyle={{color: iconColor}}
          text={favTransactionText}
          info={favTransaction.amount}
          styleInfo={{color: iconColor}}
          onPress={() => onAddNewFavortieTransaction(favTransaction)}
        />
        {favTransactionsLength < 5 && i === favTransactionsLength-1 ?
          <ListItem
            icon='plus'
            iconStyle={{opacity: 0.6}}
            text='Add new preset transaction'
            styleText={{opacity: 0.6}}
            onPress={() => Actions.presetTransactions()}
          /> : null}
      </View>


  )
}

function getFavortieTransactionText(favTransaction) {
  if (!favTransaction.notes) return favTransaction.category
  else return `${favTransaction.category}, ${favTransaction.notes}`
}

function getAddButtonColor(favTransaction) {
  if (favTransaction.amount > 0) return '#2ecc71'
  else return '#ff4d4d'
}

export default DisplayFavoriteTransactions = (props) => {
  const p = props
  return (
    <View style={{flex: 1}}>
      {p.favoriteTransactions.length > 0
        ? p.favoriteTransactions.map((transaction, i) => {
            return renderFavoriteTransactions(transaction, i, p.onAddNewFavortieTransaction, p.favoriteTransactions.length)
          })
        : <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
            <View style={styles.messageBox}>
              <Text style={{fontSize: 15}}>Go to setting to add a new preset transaction</Text>
            </View>
          </View>}
    </View>
  )
}

DisplayFavoriteTransactions.propTypes = {
  favoriteTransactions: PropTypes.array,
  onAddNewFavortieTransaction: PropTypes.func.isRequired
}

const styles = StyleSheet.create({
  favTransactionWrapper: {
    flexDirection: 'row',
    marginTop: 3,
    marginBottom: 3
  },
  buttonWrapper: {
    backgroundColor: '#2ecc71',
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 2,
    paddingBottom: 2,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5
  },
  favTransactionText: {
    fontSize: 15,
    flex: 0.5
  },
  favTransactionTextWrapper: {
    flex: 1,
    flexDirection: 'row',
    paddingLeft: 5,
    paddingRight: 5,
    backgroundColor: '#BBB',
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    paddingTop: 4,
    paddingBottom: 2
  },
  messageBox: {
    backgroundColor: '#d8d8d8',
    borderWidth: 1,
    borderColor: 'black',
    padding: 15
  }
})
