import { put, call, select } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { actions as toastrActions } from 'react-redux-toastr';
import { api } from '../../services';
import { Creators as AuthAction } from '../ducks/auth';

export function* init() {
  const token = localStorage.getItem('@CODE7_TOKENS');
  if (token) {
    yield put(AuthAction.signInSuccess(token));
    yield put(push('/dashboard'));
  }

  yield put(AuthAction.initCheckSuccess());
}

export function* signIn({ payload }) {
  try {
    const { email, password } = payload.data;
    const { data } = yield call(api.post, '/auth', {
      email,
      password,
    });
    const { token, user } = data;

    localStorage.setItem('@CODE7_TOKENS', token);
    localStorage.setItem('@CODE7_NAME', user.name);

    yield put(AuthAction.signInSuccess(token));
    yield put(push('/dashboard'));
    yield put(
      toastrActions.add({
        type: 'success',
        title: 'Login',
        message: 'Usuário autenticado!',
        options: { timeOut: 4000 },
      }),
    );
  } catch (error) {
    console.log('erro', error);
    yield put(
      toastrActions.add({
        type: 'error',
        title: 'Falha no login',
        message: 'Verfique suas credenciais',
        options: { timeOut: 4000 },
      }),
    );
  }
}

export function* getPermissions() {
  const signedIn = yield select((state) => state.auth.signedIn);

  if (!signedIn) return;

  const { data } = yield call(api.get, '/auth/permissions');
  yield put(AuthAction.getPermissionsSuccess(data));
}

export function* logOut() {}
