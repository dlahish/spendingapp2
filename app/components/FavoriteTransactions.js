import React, { Component, PropTypes } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { addBorder, FavoriteTransaction } from '../components'

export default class FavoriteTransactions extends Component {
  handleAddTransaction(favoriteTransaction){
    this.props.addTransaction(favoriteTransaction)
  }

  renderFavoriteTransactions(favoriteTransactions) {
      return favoriteTransactions.map((transaction, i) =>
        <FavoriteTransaction
          key={i}
          addTransaction={this.handleAddTransaction.bind(this)}
          transaction={transaction}
        />)
  }

  render() {
    return (
      <View style={[styles.container]}>
        <View style={[styles.innerContainer]}>
          {this.renderFavoriteTransactions(this.props.incomeFavoriteTransactions)}
        </View>
        <View style={[styles.innerContainer]}>
          {this.renderFavoriteTransactions(this.props.expeseFavoriteTransactions)}
        </View>
      </View>
    )
  }
}

FavoriteTransactions.propTypes = {
  addTransaction: PropTypes.func.isRequired,
  incomeFavoriteTransactions: PropTypes.array.isRequired,
  expeseFavoriteTransactions: PropTypes.array.isRequired
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: 20
  },
  innerContainer: {
    flex: 1
  }
})
