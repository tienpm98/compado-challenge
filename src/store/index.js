import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga'

import reducers from '../redux';

const sagaMiddleware = createSagaMiddleware()

/* Create a Redux store that holds the app state. */

const composeEnhancers =
typeof window === 'object' &&
window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
  }) : compose;

const enhancer = composeEnhancers(applyMiddleware(sagaMiddleware));
const store = createStore(reducers, enhancer);

export default store;
