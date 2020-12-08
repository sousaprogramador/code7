export const Types = {
  CASES_REQUEST: 'cases/ORGANIZATION_REQUEST',
  CASES_SUCCESS: 'cases/ORGANIZATION_SUCCESS',
  CASES_ERROR: 'cases/CASES_ERROR',
  PARAMTERS_REQUEST: 'cases/PARAMTERS_REQUEST',
  PARAMTERS_SUCCESS: 'cases/PARAMTERS_SUCCESS',
  USER_DATA_REQUEST: 'cases/USER_DATA_REQUEST',
  USER_DATA_SUCCESS: 'cases/USER_DATA_SUCCES',
  USER_RQUEST_ERROR: 'cases/USER_RQUEST_ERROR',
  NOTIFICATION_REQUEST: 'cases/NOTIFICATION_REQUEST',
  NOTIFICATION_SUCCESS: 'cases/NOTIFICATION_SUCCESS',
  UPDATE_NOTIFICATION_REQUEST: 'cases/UPDATE_NOTIFICATION_REQUEST',
  CREATE_CASES_REQUEST: 'cases/CREATE_CASES_REQUEST',
  CREATE_CASES_SUCCESS: 'cases/CREATE_CASES_SUCCESS',
  UPDATE_CASES_REQUEST: 'cases/UPDATE_CASES_REQUEST',
  UPDATE_CASES_SUCCESS: 'cases/UPDATE_CASES_SUCCESS',
  DELETE_CASES_REQUEST: 'cases/DELETE_CASES_REQUEST',
  DELETE_CASES_SUCCESS: 'cases/DELETE_CASES_SUCCESS',
  SET_CASES: 'cases/SET_CASES',
  SET_ACTIVECASES: 'cases/SET_ACTIVECASES',
  SHEETS_REQUEST: 'cases/SHEETS_REQUEST',
  SHEETS_SUCCESS: 'cases/SHEETS_SUCCESS',
  SHEETS_ERROR: 'cases/SHEETS_ERROR',
};

const INITIAL_STATE = {
  loading: true,
  error: false,
  userData: null,
  params: null,
  userLoading: false,
  exportLoading: false,
  count: 0,
  lastPage: 0,
  reports: null,
};

export default function cases(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.CASES_REQUEST:
      return {
        ...state,
        error: false,
        loading: true,
      };
    case Types.CASES_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        data: action.payload.data,
        count: action.payload.count,
        lastPage: action.payload.lastPage,
      };
    case Types.CASES_ERROR:
      return {
        ...state,
        loading: false,
        data: [],
        error: action.payload.data,
      };
    case Types.PARAMTERS_REQUEST:
      return {
        ...state,
      };
    case Types.PARAMTERS_SUCCESS:
      return {
        ...state,
        params: action.payload.params,
      };
    case Types.NOTIFICATION_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case Types.NOTIFICATION_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case Types.CREATE_CASES_REQUEST:
      return {
        ...state,
        error: [],
      };
    case Types.CREATE_CASES_SUCCESS:
      return {
        ...state,
        loading: false,
        error: [],
        data: action.payload.data,
      };
    case Types.USER_DATA_REQUEST:
      return {
        ...state,
        error: false,
        userLoading: true,
      };
    case Types.USER_DATA_SUCCESS:
      return {
        ...state,
        userLoading: false,
        error: false,
        userData: action.payload.data,
      };
    case Types.USER_RQUEST_ERROR:
      return {
        ...state,
        userLoading: false,
        userData: [],
        error: action.payload.data,
      };
    case Types.UPDATE_CASES_REQUEST:
      return {
        ...state,
        loading: false,
        error: [],
      };
    case Types.UPDATE_CASES_SUCCESS:
      return {
        ...state,
        loading: false,
        error: [],
      };
    case Types.DELETE_CASES_REQUEST:
      return {
        ...state,
        loading: false,
        error: [],
      };
    case Types.DELETE_CASES_SUCCESS:
      return {
        loading: false,
        error: [],
      };
    case Types.SET_CASES:
      return {
        ...state,
        loading: false,
        error: [],
      };
    case Types.SET_ACTIVE_CASES:
      return {
        ...state,
      };
    case Types.SHEETS_REQUEST: // retorno dos dados da API
      return {
        ...state,
        exportLoading: true,
      };
    case Types.SHEETS_SUCCESS:
      return {
        ...state,
        exportLoading: false,
        reports: action.payload.data,
      };
    case Types.SHEETS_ERROR:
      return {
        ...state,
        exportLoading: false,
      };
    default:
      return state;
  }
}

export const Creators = {
  casesRequest: (data) => ({
    type: Types.CASES_REQUEST,
    payload: { data },
  }),
  casesSucess: (data, count, lastPage) => ({
    type: Types.CASES_SUCCESS,
    payload: { data, count, lastPage },
  }),
  paramsRequest: () => ({
    type: Types.PARAMTERS_REQUEST,
  }),
  paramsSuccess: (params) => ({
    type: Types.PARAMTERS_SUCCESS,
    payload: { params },
  }),
  notificationRequest: (data) => ({
    type: Types.NOTIFICATION_REQUEST,
    payload: { data },
  }),
  notificationSuccess: (data) => ({
    type: Types.NOTIFICATION_SUCCESS,
    payload: { data },
  }),
  notificationUpdate: (data) => ({
    type: Types.UPDATE_NOTIFICATION_REQUEST,
    payload: { data },
  }),
  createCasesRequest: (data) => ({
    type: Types.CREATE_CASES_REQUEST,
    payload: { data },
  }),
  createCasesSucess: (data) => ({
    type: Types.CREATE_CASES_SUCCESS,
    payload: { data },
  }),
  userDataRequest: (data) => ({
    type: Types.USER_DATA_REQUEST,
    payload: { data },
  }),
  userDataSuccess: (data) => ({
    type: Types.USER_DATA_SUCCESS,
    payload: { data },
  }),
  userError: (data) => ({
    type: Types.USER_RQUEST_ERROR,
    payload: { data },
  }),
  updateCasesRequest: (data) => ({
    type: Types.UPDATE_CASES_REQUEST,
    payload: { data },
  }),
  updateCasesSuccess: (data) => ({
    type: Types.UPDATE_CASES_SUCCESS,
    payload: { data },
  }),
  deleteCasesRequest: (data) => ({
    type: Types.DELETE_CASES_REQUEST,
    payload: { data },
  }),
  deleteCasesSuccess: (data) => ({
    type: Types.DELETE_CASES_SUCCESS,
    payload: { data },
  }),
  setCases: (data) => ({
    type: Types.SET_CASES,
    payload: { data },
  }),
  sheetsRequest: (data) => ({
    type: Types.SHEETS_REQUEST,
    payload: { data },
  }),
  sheetsSuccess: (data) => ({
    type: Types.SHEETS_SUCCESS,
    payload: { data },
  }),
  sheetsError: () => ({
    type: Types.SHEETS_ERROR,
  }),
};
