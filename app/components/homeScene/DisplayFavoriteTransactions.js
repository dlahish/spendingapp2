import React, { Component, PropTypes } from 'react'
import { View, Text, TouchableHighlight, StyleSheet } from 'react-native'
import { ListItem } from '../../components'

renderFavoriteTransactions = (favTransaction, i, onAddNewFavortieTransaction) => {
  const favTransactionText = getFavortieTransactionText(favTransaction)
  const iconColor = getAddButtonColor(favTransaction)
  return (
      <ListItem
        key={i}
        icon='plus'
        iconColor={iconColor}
        text={favTransactionText}
        onPress={() => onAddNewFavortieTransaction(favTransaction)}
      />
  )
}

function getFavortieTransactionText(favTransaction) {
  if (!favTransaction.notes) return `${favTransaction.category}, ${favTransaction.amount}`
  else return `${favTransaction.category}, ${favTransaction.amount}, ${favTransaction.notes}`
}

function getAddButtonColor(favTransaction) {
  if (favTransaction.amount > 0) return '#2ecc71'
  else return '#ff4d4d'
}

export default DisplayFavoriteTransactions = (props) => {
  return (
    <View style={{flex: 1}}>
      {props.favoriteTransactions.length > 0
        ? props.favoriteTransactions.map((transaction, i) => {
            return renderFavoriteTransactions(transaction, i, props.onAddNewFavortieTransaction)
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
