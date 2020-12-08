import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import { reducer as toastr } from 'react-redux-toastr';
import auth from './auth';
import user from './user';
import monitor from './monitor';
import cases from './cases';
import dashboard from './dashboard';
import notification from './notification';
import patient from './patient';

export default (history) =>
  combineReducers({
    auth,
    user,
    cases,
    monitor,
    toastr,
    dashboard,
    notification,
    patient,
    router: connectRouter(history),
  });
