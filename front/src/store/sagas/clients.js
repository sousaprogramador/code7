import { put, call } from 'redux-saga/effects';
import { userApi } from '../../services';
import { Creators as clients } from '../ducks/clients';

export function* clientsRequest() {
  try {
    const { data } = yield call(userApi.get, 'users');

    yield put(clients.clientsSuccess(data));
  } catch (error) {}
}
