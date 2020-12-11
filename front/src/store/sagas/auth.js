import { put, call, select } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { actions as toastrActions } from 'react-redux-toastr';
import { api } from '../../services';
import { Creators as AuthAction } from '../ducks/auth';

export function* init() {
  // const token = localStorage.getItem('@COVID_TOKENS');
  // if (token) {
  // yield put(AuthAction.signInSuccess(token));
  yield put(push('/dashboard'));
  // }

  // yield put(AuthAction.initCheckSuccess());
}

export function* signIn({ payload }) {}

export function* getPermissions() {
  const signedIn = yield select((state) => state.auth.signedIn);

  if (!signedIn) return;

  const { data } = yield call(api.get, '/auth/permissions');
  yield put(AuthAction.getPermissionsSuccess(data));
}

export function* logOut() {}
