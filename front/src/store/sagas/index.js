import { all, takeLatest, fork } from 'redux-saga/effects';
import { signIn, init } from './auth';

import { Types as AuthActions } from '../ducks/auth';
import { dataRequest, clientRequest, createRequest } from './dashboard';
import { Types as DashboardActions } from '../ducks/dashboard';

export default function* rootSaga() {
  yield all([
    init(),
    takeLatest(AuthActions.SIGN_IN_REQUEST, signIn),
    takeLatest(DashboardActions.DATA_REQUEST, dataRequest),
    takeLatest(DashboardActions.CLIENT_REQUEST, clientRequest),
    takeLatest(DashboardActions.CREATE_REQUEST, createRequest),
  ]);
}
