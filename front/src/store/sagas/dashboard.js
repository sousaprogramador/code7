import { put, call } from 'redux-saga/effects';
import { api } from '../../services';
import { Creators as DashActions } from '../ducks/dashboard';

export function* dataRequest() {
  try {
    const { data } = yield call(api.get, '/graphics');

    yield put(DashActions.dataSuccess(data));
  } catch (error) {
    console.log('error', error);
  }
}
