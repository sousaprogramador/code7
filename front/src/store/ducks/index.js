import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import { reducer as toastr } from 'react-redux-toastr';
import auth from './auth';
import user from './user';
import dashboard from './dashboard';
import clients from './clients';

export default (history) =>
  combineReducers({
    auth,
    user,
    dashboard,
    clients,
    toastr,
    router: connectRouter(history),
  });
