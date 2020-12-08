import { put, call } from 'redux-saga/effects';
import { actions as toastrActions } from 'react-redux-toastr';
import { api } from '../../services';
import { Creators as NotificationAction } from '../ducks/notification';

export function* notificationsRequest({ payload }) {
  const limit = payload.data.limit || '';
  const page = payload.data.page || '';
  const name = payload.data.name || '';

  try {
    const response = yield call(
      api.get,
      `notifications?name=${name}&limit=${limit}&page=${page}`,
    );
    const { data } = response;

    yield put(
      NotificationAction.notificationsSucess(
        data.data,
        data.total,
        data.lastPage,
      ),
    );
  } catch (error) {
    console.log('error', error);
  }
}

export function* createNotificationsRequest({ payload }) {
  try {
    console.log('createNotificationsRequest', payload.data);
    yield call(api.post, '/notifications', payload.data);
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

export function* deleteNotificationsRequest({ payload }) {
  try {
    yield call(api.delete, `/notifications/${payload.data}`);
    yield put(NotificationAction.casesRequest({}));
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
