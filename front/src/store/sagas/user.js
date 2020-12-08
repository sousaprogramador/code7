import { put, call } from 'redux-saga/effects';
import { actions as toastrActions } from 'react-redux-toastr';

import { api } from '../../services';
import { Creators as UserActions } from '../ducks/user';
import { Creators as AuthAction } from '../ducks/auth';

export function* getInviteAllowedRequest() {
  try {
    const { data } = yield call(api.get, '/users');

    yield put(UserActions.getInviteAllowedSuccess(data));
  } catch (error) {
    console.log(error);
    yield put(UserActions.getInviteAllowedErrror());
  }
}

export function* createInviteRequest({ payload }) {
  try {
    const { data } = payload;

    const res = yield call(api.post, '/register', data);

    yield put(UserActions.getInviteAllowedRequest());
    yield put(
      toastrActions.add({
        type: 'success',
        title: 'Concluído',
        message: 'Usuário Cadastrado',
        options: { timeOut: 4000 },
      }),
    );
  } catch (error) {
    console.log(error);
  }
}

export function* signupCollaboratorRequest({ payload }) {
  try {
    const {
      name,
      email,
      password,
      password_confirmation,
      token,
    } = payload.data;
    const { data } = yield call(api.post, `/signup/collaborator/${token}`, {
      name,
      email,
      password,
      password_confirmation,
    });

    yield put(AuthAction.signInSuccess(data.token));
  } catch (error) {
    console.log(error);
  }
}
