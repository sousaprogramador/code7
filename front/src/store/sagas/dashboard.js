import { put, call } from 'redux-saga/effects';
import { userApi } from '../../services';
import { Creators as DashActions } from '../ducks/dashboard';

export function* dataRequest() {
  try {
    const { data } = yield call(userApi.get, 'users');

    console.log('data', data);

    yield put(DashActions.dataSuccess(data));
  } catch (error) {
    console.log('error', error);
  }
}
