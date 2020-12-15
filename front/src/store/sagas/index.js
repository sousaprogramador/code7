import { all, takeLatest } from 'redux-saga/effects';
import { signIn, init } from './auth';

import { Types as AuthActions } from '../ducks/auth';

import {
  dataRequest,
  createRequest,
  updateRequest,
  deleteRequest,
} from './dashboard';
import { Types as DashboardActions } from '../ducks/dashboard';

import { clientsRequest } from './clients';
import { Types as ClientsActions } from '../ducks/clients';

export default function* rootSaga() {
  yield all([
    init(),
    takeLatest(AuthActions.SIGN_IN_REQUEST, signIn),
    takeLatest(DashboardActions.DATA_REQUEST, dataRequest),
    takeLatest(DashboardActions.CREATE_REQUEST, createRequest),
    takeLatest(DashboardActions.UPDATE_REQUEST, updateRequest),
    takeLatest(DashboardActions.DELETE_REQUEST, deleteRequest),
    takeLatest(ClientsActions.CLIENTS_REQUEST, clientsRequest),
  ]);
}
