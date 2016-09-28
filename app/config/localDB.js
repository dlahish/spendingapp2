import Store from 'react-native-store'

const DB = {
    'favoriteTransactions': Store.model('favoriteTransactions'),
    'currencySymbol': Store.model('currencySymbol')
}

export default DB
