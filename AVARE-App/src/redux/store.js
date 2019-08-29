import { combineReducers, createStore  } from 'redux'

import apps from './modules/apps/reducer'
import categories from './/modules/categories/reducer'
import disclaimer from './modules/disclaimer/reducer'


//TODO server communication commented out. Needs quality revision!
//export const SERVER = 'http://193.196.36.83:8443' // IP + Port of the host, or  http://localhost:8443 for testing on pc
//import network from './src/redux/modules/network/reducer'
//import communication from './src/redux/modules/communication/reducer'
//import fetchMiddleware from './src/redux/middleware/fetchMiddleware'
//import { setConnectivity } from './src/redux/modules/network/actions'
//Track network 
//export const onConnectivityChange = (reach) => {
//    console.log('Network change');
//    console.log(reach)
//    store.dispatch(setConnectivity(reach));
//}

//Setting up the store
const reducers = combineReducers({ apps: apps, categories: categories, disclaimer: disclaimer });
//export const store = createStore(reducers, applyMiddleware(fetchMiddleware));
export const store = createStore(reducers);
//const unsubscribe = store.subscribe(() => console.log(store.getState()))

