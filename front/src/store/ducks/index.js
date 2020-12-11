import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import { reducer as toastr } from 'react-redux-toastr';
import auth from './auth';
import user from './user';
import dashboard from './dashboard';

export default (history) =>
  combineReducers({
    auth,
    user,
    dashboard,
    toastr,
    router: connectRouter(history),
  });
