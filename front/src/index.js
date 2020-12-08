import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import './config/reactotron';
import store from './store';
import App from './App';

require('dotenv');

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
