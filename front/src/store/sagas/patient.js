import { put, call } from 'redux-saga/effects';
import { actions as toastrActions } from 'react-redux-toastr';
import { api, userApi } from '../../services';
import { Creators as PatientActions } from '../ducks/patient';

export function* patientRequest({ payload }) {
  const limit = payload.data.limit || '';
  const page = payload.data.page || '';
  const name = payload.data.name || '';

  try {
    const response = yield call(
      api.get,
      `patients?name=${name}&limit=${limit}&page=${page}`,
    );
    const { data } = response;

    yield put(
      PatientActions.patientSucess(data.data, data.total, data.lastPage),
    );
  } catch (error) {
    console.log('error', error);
  }
}

export function* patientParamsRequest() {
  try {
    const { data } = yield call(api.get, '/parameters-case');

    yield put(PatientActions.patientParamsRequest(data));
  } catch (error) {}
}

export function* createPatientRequest({ payload }) {
  try {
    yield call(api.post, '/patients', payload.data);
    yield put(
      toastrActions.add({
        type: 'success',
        title: 'Cadastrado',
        message: 'Salvo com Sucesso',
      }),
    );
  } catch (error) {
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

    yield put(PatientActions.userDataSuccess(data));
  } catch (error) {
    yield put(PatientActions.userError());
  }
}

export function* updatePatientRequest({ payload }) {
  const { data } = payload;
  delete data.tableData;

  try {
    yield call(api.put, `/patients/${data.id}`, data);

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

export function* deletePatientRequest({ payload }) {
  try {
    yield call(api.delete, `/patients/${payload.data}`);
    yield put(PatientActions.patientRequest({}));
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
