import { put, call } from 'redux-saga/effects';
import { userApi, api } from '../../services';
import { Creators as DashActions } from '../ducks/dashboard';

export function* dataRequest() {
  try {
    const { data } = yield call(userApi.get, 'users');

    yield put(DashActions.dataSuccess(data));
  } catch (error) {}
}

export function* createRequest({ payload }) {
  try {
    yield call(api.post, '/financial', payload.data);
  } catch (error) {}
}
