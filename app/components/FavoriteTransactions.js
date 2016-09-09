import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { addBorder, FavoriteTransaction } from '../components'

export default class FavoriteTransactions extends Component {
  handleAddTransaction(favoriteTransaction){
    console.log('handle transaction')
    this.props.addTransaction(favoriteTransaction)
  }

  favoriteTransactions(favoriteTransactions) {
      return favoriteTransactions.map((transaction, i) =>
        <FavoriteTransaction key={i} addTransaction={this.handleAddTransaction.bind(this)} transaction={transaction} />)
  }

  render() {
    return (
      <View style={[styles.container]}>
        <View style={[styles.innerContainer]}>
          {this.favoriteTransactions(this.props.incomeFavoriteTransactions)}
        </View>
        <View style={[styles.innerContainer]}>
          {this.favoriteTransactions(this.props.expeseFavoriteTransactions)}
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 10
  },
  innerContainer: {
    flex: 1
  }
})
