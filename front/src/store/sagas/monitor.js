import { put, call } from 'redux-saga/effects';
import { actions as toastrActions } from 'react-redux-toastr';
import { api } from '../../services';
import { Creators as MonitorActions } from '../ducks/monitor';

export function* monitorRequest({ payload }) {
  const limit = payload.data.limit || '';
  const page = payload.data.page || '';
  const name = payload.data.name || '';
  try {
    const response = yield call(
      api.get,
      `cases?name=${name}&limit=${limit}&page=${page}`,
    );
    const { data } = response;

    yield put(MonitorActions.monitorSucess(data.data, data.total));
  } catch (error) {
    console.log('error', error);
  }
}

export function* createMonitorRequest({ payload }) {
  try {
    // console.log("createMonitorRequest", payload.data)
    console.log('create', payload.data);
    yield call(api.post, '/monitors', payload.data);

    yield put(
      toastrActions.add({
        type: 'success',
        title: 'Organização',
        message: 'Salva com Sucesso',
      }),
    );
  } catch (error) {
    yield put(
      toastrActions.add({
        type: 'error',
        title: 'Organização',
        message: 'errr',
      }),
    );
  }
}

export function* updateMonitorRequest({ payload }) {
  const { data } = payload;

  try {
    yield call(api.put, `/monitors/${data.id}`, data);

    yield put(
      toastrActions.add({
        type: 'success',
        title: 'Alteração realizada',
        message: 'Atualizada com sucesso',
      }),
    );
  } catch (error) {
    console.log('error', error);
  }
}

export function* deleteMonitorRequest({ payload }) {
  try {
    console.log('payload', payload);
    yield call(api.delete, `/monitor/${payload.data.id}`);
    yield put(
      toastrActions.add({
        type: 'success',
        title: 'Organização',
        message: 'Atualizada com sucesso',
      }),
    );
  } catch (error) {
    console.log('error', error);
  }
}

export function* sheetsRequest() {
  try {
    yield call(api.get, '/monitor/spreadsheet');
  } catch (error) {}
}
