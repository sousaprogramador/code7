import { put, call } from 'redux-saga/effects';
import { actions as toastrActions } from 'react-redux-toastr';
import { api, userApi } from '../../services';
import { Creators as CasesActions } from '../ducks/cases';

const fileDownload = require('react-file-download');

export function* casesRequest({ payload }) {
  const limit = payload.data.limit || '';
  const page = payload.data.page || '';
  const name = payload.data.name || '';

  try {
    const response = yield call(
      api.get,
      `cases?name=${name}&limit=${limit}&page=${page}`,
    );
    const { data } = response;

    yield put(CasesActions.casesSucess(data.data, data.total, data.lastPage));
  } catch (error) {
    console.log('error', error);
  }
}

export function* paramsRequest() {
  try {
    const { data } = yield call(api.get, '/parameters-case');

    yield put(CasesActions.paramsSuccess(data));
  } catch (error) {
    console.log('error', error);
  }
}

export function* createNotificationsRequest({ payload }) {
  try {
    yield call(api.post, '/notifications', payload.data);

    yield put(
      toastrActions.add({
        type: 'success',
        title: 'Cadastrado',
        message: 'Salvo com Sucesso',
      }),
    );
  } catch (error) {
    console.log('cadastro', error);
    yield put(
      toastrActions.add({
        type: 'error',
        title: 'Erro ao cadastrar',
        message: 'Tente novamente',
        options: { timeOut: 4000 },
      }),
    );
  }
}

export function* updateNotificationsRequest({ payload }) {
  try {
    yield call(api.put, `/notifications/${payload.data.id}`, payload.data);

    yield put(
      toastrActions.add({
        type: 'success',
        title: 'Atuaizado',
        message: 'Salvo com Sucesso',
      }),
    );
  } catch (error) {
    console.log('update', error);
    yield put(
      toastrActions.add({
        type: 'error',
        title: 'Erro ao cadastrar',
        message: 'Tente novamente',
        options: { timeOut: 4000 },
      }),
    );
  }
}

export function* createCasesRequest({ payload }) {
  try {
    console.log('create', payload.data);

    yield call(api.post, '/cases', payload.data);
    yield put(
      toastrActions.add({
        type: 'success',
        title: 'Cadastrado',
        message: 'Salvo com Sucesso',
      }),
    );
  } catch (error) {
    console.log('cadastro', error);
    yield put(
      toastrActions.add({
        type: 'error',
        title: 'Erro ao cadastrar',
        message: 'Tente novamente',
        options: { timeOut: 4000 },
      }),
    );
  }
}

export function* getUserData({ payload }) {
  try {
    const { cpf } = payload.data;
    const { data } = yield call(userApi.get, cpf);

    yield put(CasesActions.userDataSuccess(data));
  } catch (error) {
    yield put(CasesActions.userError());
  }
}

export function* updateCasesRequest({ payload }) {
  const { data } = payload;
  delete data.tableData;

  try {
    yield call(api.put, `/cases/${data.patient_id}`, data);
    console.log('upadate', data);

    yield put(
      toastrActions.add({
        type: 'success',
        title: 'Alteração feita',
        message: 'Atualizada com sucesso',
        options: { timeOut: 4000 },
      }),
    );
  } catch (error) {
    console.log('error', error);
  }
}

export function* deleteCasesRequest({ payload }) {
  try {
    yield call(api.delete, `/notifications/${payload.data}`);
    yield put(CasesActions.casesRequest({}));
    yield put(
      toastrActions.add({
        type: 'success',
        title: 'Alteração feita',
        message: 'Deletado',
        options: { timeOut: 4000 },
      }),
    );
  } catch (error) {
    console.log('error', error);
  }
}

export function* sheetsRequest({ payload }) {
  try {
    const response = yield call(api.post, '/reports', payload.data);

    yield put(CasesActions.sheetsSuccess(response.data));

    fileDownload(response.data, 'casos-diarios.xlsx');
  } catch (error) {
    console.log('eror');
    yield put(CasesActions.sheetsError());
    yield put(
      toastrActions.add({
        type: 'error',
        title: 'Erro ao gerar relatório',
        message: 'Tente novamente',
        options: { timeOut: 4000 },
      }),
    );
  }
}
