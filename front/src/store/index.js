import { createStore, compose, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { routerMiddleware } from 'connected-react-router';
import logger from 'redux-logger';

import reducers from './ducks';
import sagas from './sagas';
import history from '../routes/history';

const middlewares = [];

const sagaMonitor =
  process.env.NODE_ENV === 'development'
    ? console.tron.createSagaMonitor()
    : null;

const sagaMiddleware = createSagaMiddleware({ sagaMonitor });

middlewares.push(sagaMiddleware);
middlewares.push(routerMiddleware(history));

const composer =
  process.env.NODE_ENV === 'development'
    ? compose(applyMiddleware(...middlewares, logger))
    : compose(applyMiddleware(...middlewares));

const store = createStore(reducers(history), composer);

sagaMiddleware.run(sagas);

export default store;
