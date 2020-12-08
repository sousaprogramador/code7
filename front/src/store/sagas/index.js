import { all, takeLatest, fork } from 'redux-saga/effects';
import { logOut, getPermissions, signIn, init } from './auth';

import { Types as AuthActions } from '../ducks/auth';

import {
  casesRequest,
  createCasesRequest,
  updateCasesRequest,
  deleteCasesRequest,
  sheetsRequest,
  getUserData,
  paramsRequest,
} from './cases';
import { Types as CasesActions } from '../ducks/cases';

import { getInviteAllowedRequest, createInviteRequest } from './user';

import { Types as UserActions } from '../ducks/user';

import {
  monitorRequest,
  createMonitorRequest,
  updateMonitorRequest,
  deleteMonitorRequest,
} from './monitor';

import { Types as MonitorActions } from '../ducks/monitor';

import { dataRequest } from './dashboard';

import { Types as DashboardActions } from '../ducks/dashboard';

import { createNotificationsRequest } from './notification';

import { Types as NotificationAction } from '../ducks/notification';

import {
  patientRequest,
  createPatientRequest,
  updatePatientRequest,
  deletePatientRequest,
  patientParamsRequest,
} from './patient';

import { Types as PatientActions } from '../ducks/patient';

export default function* rootSaga() {
  yield all([
    init(),
    fork(getPermissions),
    takeLatest(AuthActions.SIGN_IN_REQUEST, signIn),
    takeLatest(AuthActions.LOG_OUT, logOut),
    takeLatest(CasesActions.USER_DATA_REQUEST, getUserData),
    takeLatest(CasesActions.PARAMTERS_REQUEST, paramsRequest),
    takeLatest(CasesActions.CASES_REQUEST, casesRequest),
    takeLatest(CasesActions.CREATE_CASES_REQUEST, createCasesRequest),
    takeLatest(CasesActions.UPDATE_CASES_REQUEST, updateCasesRequest),
    takeLatest(CasesActions.DELETE_CASES_REQUEST, deleteCasesRequest),
    takeLatest(CasesActions.DELETE_CASES_REQUEST, deleteCasesRequest),
    takeLatest(CasesActions.SHEETS_REQUEST, sheetsRequest),
    takeLatest(MonitorActions.MONITOR_REQUEST, monitorRequest),
    takeLatest(MonitorActions.CREATE_MONITOR_REQUEST, createMonitorRequest),
    takeLatest(MonitorActions.UPDATE_MONITOR_REQUEST, updateMonitorRequest),
    takeLatest(MonitorActions.DELETE_MONITOR_REQUEST, deleteMonitorRequest),
    takeLatest(MonitorActions.SHEETS_REQUEST, sheetsRequest),
    takeLatest(UserActions.GET_INVITE_ALLOWED_REQUEST, getInviteAllowedRequest),
    takeLatest(UserActions.CREATE_INVITE_REQUEST, createInviteRequest),
    takeLatest(DashboardActions.DATA_REQUEST, dataRequest),
    takeLatest(
      NotificationAction.CREATE_NOTIFICATION_REQUEST,
      createNotificationsRequest,
    ),
    takeLatest(PatientActions.PATIENT_REQUEST, patientRequest),
    takeLatest(PatientActions.CREATE_PATIENT_REQUEST, createPatientRequest),
    takeLatest(PatientActions.UPDATE_PATIENT_REQUEST, updatePatientRequest),
    takeLatest(PatientActions.DELETE_PATIENT_REQUEST, deletePatientRequest),
    takeLatest(PatientActions.DELETE_PATIENT_REQUEST, deletePatientRequest),
    takeLatest(PatientActions.PATIENT_PARAMTERS_REQUEST, patientParamsRequest),
  ]);
}
