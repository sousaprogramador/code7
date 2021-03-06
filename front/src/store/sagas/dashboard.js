import { put, call } from 'redux-saga/effects';
import { api, userApi } from '../../services';
import { Creators as DashActions } from '../ducks/dashboard';

export function* dataRequest() {
  try {
    const { data } = yield call(api.get, 'financial');

    const clients = yield call(userApi.get, 'users');

    const financial = [];

    data.financial.map((row) => {
      clients.data.map((row2) => {
        if (row2.id === row.client_id) {
          const merges = { ...row2, ...row };
          financial.push(merges);
        }
      });
    });

    yield put(DashActions.dataSuccess(financial));
  } catch (error) {}
}

export function* clientRequest() {
  try {
    const { data } = yield call(userApi.get, 'users');

    yield put(DashActions.clientSuccess(data));
  } catch (error) {}
}

export function* createRequest({ payload }) {
  try {
    yield call(api.post, '/financial', payload.data);
  } catch (error) {}
}

export function* updateRequest({ payload }) {
  try {
    // eslint-disable-next-line camelcase
    const { client_id, date, motive, amount } = payload.data;

    // eslint-disable-next-line no-underscore-dangle
    yield call(api.put, `/financial/${payload.data._id}`, {
      client_id,
      date,
      motive,
      amount,
    });
  } catch (error) {}
}

export function* deleteRequest({ payload }) {
  try {
    yield call(api.delete, `/financial/${payload.data.id}`, payload.data);
  } catch (error) {}
}
