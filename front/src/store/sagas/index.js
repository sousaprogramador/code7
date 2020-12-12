import { all, takeLatest } from 'redux-saga/effects';
import { dataRequest, createRequest } from './dashboard';
import { Types as DashboardActions } from '../ducks/dashboard';

export default function* rootSaga() {
  yield all([takeLatest(DashboardActions.DATA_REQUEST, dataRequest)]);
  yield all([takeLatest(DashboardActions.CREATE_REQUEST, createRequest)]);
}
