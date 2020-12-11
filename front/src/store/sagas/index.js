import { all, takeLatest } from 'redux-saga/effects';
import { dataRequest } from './dashboard';
import { Types as DashboardActions } from '../ducks/dashboard';

export default function* rootSaga() {
  yield all([takeLatest(DashboardActions.DATA_REQUEST, dataRequest)]);
}
