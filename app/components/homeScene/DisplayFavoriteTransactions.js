import React, { Component, PropTypes } from 'react'
import { View, Text, TouchableHighlight, StyleSheet } from 'react-native'
import ListItem from '../common/ListItem'

export default DisplayFavoriteTransactions = (props) => {
  return (
    <View>
      {props.favoriteTransactions !== null
        ? props.favoriteTransactions.map((transaction, i) => {
            return renderFavoriteTransactions(transaction, i, props.onAddNewFavortieTransaction)
          })
        : <View><Text style={{opacity: 0.6}}>Go to settings to add your favorite Transactions</Text></View>}
    </View>
  )
}

DisplayFavoriteTransactions.propTypes = {
  favoriteTransactions: PropTypes.array,
  onAddNewFavortieTransaction: PropTypes.func.isRequired
}

renderFavoriteTransactions = (favTransaction, i, onAddNewFavortieTransaction) => {
  const favTransactionText = getFavortieTransactionText(favTransaction)
  // const addButtonColor = getAddButtonColor(favTransaction)
  const iconColor = getAddButtonColor(favTransaction)
  return (
      <ListItem
        key={i}
        icon='plus'
        iconColor={iconColor}
        text={favTransactionText}
        onPress={() => onAddNewFavortieTransaction(favTransaction)}
      />
    // <View style={styles.favTransactionWrapper} key={i}>
    //   <View style={[styles.buttonWrapper, {backgroundColor: addButtonColor}]}>
    //     <TouchableHighlight onPress={() => onAddNewFavortieTransaction(favTransaction)}>
    //       <View style={[styles.buttonWrapper, {backgroundColor: addButtonColor}]}>
    //         <Text style={styles.favTransactionText}>Add</Text>
    //       </View>
    //     </TouchableHighlight>
    //   </View>
    //   <View style={styles.favTransactionTextWrapper}>
    //     <Text
    //       numberOfLines={1}
    //       style={styles.favTransactionText}>{favTransactionText}
    //     </Text>
    //   </View>
    // </View>
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
  }
})
