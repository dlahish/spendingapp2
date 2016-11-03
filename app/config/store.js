import {persistStore, autoRehydrate, purgeStoredState} from 'redux-persist'
import {applyMiddleware, createStore, compose} from 'redux'
import {AsyncStorage} from 'react-native'
import thunk from 'redux-thunk'
// import createLogger from 'redux-logger'
import rootReducer from '../reducers'

// const logger = createLogger()

const store = createStore(rootReducer, compose(
	// applyMiddleware(thunk, logger),
	applyMiddleware(thunk),
	autoRehydrate()
));

persistStore(store, {storage: AsyncStorage})

// purgeStoredState({storage: AsyncStorage}).then(() => {
//   console.log('purge of someReducer completed')
// }).catch(() => {
//   console.log('purge of someReducer failed')
// })

export default store;
