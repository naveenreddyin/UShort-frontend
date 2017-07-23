import { createStore, applyMiddleware, compose } from 'redux'
import createLogger from 'redux-logger'
import createSagaMiddleware from 'redux-saga'
import R from 'ramda'

// creates the store
export default (rootReducer, rootSaga) => {
const middlewares = [];

//middlewares.push(logger);
const sagaMiddleware = createSagaMiddleware()
middlewares.push(sagaMiddleware);
const SAGA_LOGGING_BLACKLIST = ['EFFECT_TRIGGERED', 'EFFECT_RESOLVED', 'EFFECT_REJECTED', 'persist/REHYDRATE']

// the logger master switch
const USE_LOGGING = true
// silence these saga-based messages
// create the logger
const logger = createLogger({
  predicate: (getState, { type }) => true,
})
middlewares.push(logger)

// mount it on the Store
//const store = createStore(
//  rootReducer,
//  applyMiddleware(sagaMiddleware)
//)
const store = compose(applyMiddleware(...middlewares))(createStore)(rootReducer);
  // kick off root saga
  sagaMiddleware.run(rootSaga)

  return store
}
