import { put, call, select } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { actions as toastrActions } from 'react-redux-toastr';
import { api } from '../../services';
import { Creators as AuthAction } from '../ducks/auth';

export function* init() {
  const token = localStorage.getItem('@COVID_TOKENS');
  if (token) {
    yield put(AuthAction.signInSuccess(token));
    yield put(push('/dashboard'));
  }

  yield put(AuthAction.initCheckSuccess());
}

export function* signIn({ payload }) {
  try {
    const { email, password } = payload.data;
    const { data } = yield call(api.post, 'login', {
      email,
      password,
    });
    const { token, user } = data;

    localStorage.setItem('@COVID_TOKENS', token);
    localStorage.setItem('@COVID_NAME', user[0].profile.name);
    localStorage.setItem('@COVID_PERMISSION', user[0].roles[0].id);

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

export function* logOut() {
  localStorage.removeItem('@COVID_TOKENS');
  localStorage.removeItem('@COVID_NAME');
  localStorage.removeItem('@COVID_PERMISSION');
  yield put(push('/'));

  yield put(
    toastrActions.add({
      type: 'info',
      title: 'Obrigado',
      message: 'Até a proxima!',
      options: { timeOut: 4000 },
    }),
  );
}
