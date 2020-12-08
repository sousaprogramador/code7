export const Types = {
  MONITOR_REQUEST: 'monitor/ORGANIZATION_REQUEST',
  MONITOR_SUCCESS: 'monitor/ORGANIZATION_SUCCESS',
  MONITOR_ERROR: 'monitor/MONITOR_ERROR',
  CREATE_MONITOR_REQUEST: 'monitor/CREATE_MONITOR_REQUEST',
  CREATE_MONITOR_SUCCESS: 'monitor/CREATE_MONITOR_SUCCESS',
  SELECT_MONITOR: 'monitor/SELECT_MONITOR',
  SELECT_MONITOR_SELECTED: 'monitor/SELECT_MONITOR_SELECTED',
  UPDATE_MONITOR_REQUEST: 'monitor/UPDATE_MONITOR_REQUEST',
  UPDATE_MONITOR_SUCCESS: 'monitor/UPDATE_MONITOR_SUCCESS',
  DELETE_MONITOR_REQUEST: 'monitor/DELETE_MONITOR_REQUEST',
  DELETE_MONITOR_SUCCESS: 'monitor/DELETE_MONITOR_SUCCESS',
  SET_MONITOR: 'monitor/SET_MONITOR',
  SET_ACTIVEMONITOR: 'monitor/SET_ACTIVEMONITOR',
  SHEETS_REQUEST: 'monitor/SHEETS_REQUEST',
  SHEETS_SUCCESS: 'monitor/SHEETS_SUCCESS',
  SHEETS_ERROR: 'monitor/SHEETS_ERROR',
};

const INITIAL_STATE = {
  loading: false,
  error: false,
  count: 0,
  data: [],
};

export default function monitor(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.MONITOR_REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case Types.MONITOR_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        data: action.payload.data,
        count: action.payload.count,
      };
    case Types.MONITOR_ERROR:
      return {
        ...state,
        loading: false,
        data: [],
        error: action.payload.data,
      };
    case Types.CREATE_MONITOR_REQUEST:
      return {
        ...state,
        error: [],
      };
    case Types.CREATE_MONITOR_SUCCESS:
      return {
        ...state,
        error: [],
        data: action.payload.data,
      };
    case Types.SELECT_MONITOR:
      return {
        ...state,
        loading: false,
        error: [],
        active: null,
      };
    case Types.SELECT_MONITOR_SELECTED:
      return {
        ...state,
        loading: false,
        error: [],
        active: action.payload.data,
      };
    case Types.UPDATE_MONITOR_REQUEST:
      return {
        ...state,
        loading: false,
        error: [],
      };
    case Types.UPDATE_MONITOR_SUCCESS:
      return {
        ...state,
        loading: false,
        error: [],
      };
    case Types.DELETE_MONITOR_REQUEST:
      return {
        ...state,
        loading: false,
        error: [],
      };
    case Types.DELETE_MONITOR_SUCCESS:
      return {
        ...state,
        loading: false,
        error: [],
      };
    case Types.SET_MONITOR:
      return {
        ...state,
        loading: false,
        error: [],
      };
    case Types.SET_ACTIVE_MONITOR:
      return {
        ...state,
      };
    case Types.SHEETS_REQUEST: // retorno dos dados da API
      return {
        ...state,
      };
    case Types.SHEETS_SUCCESS:
      return {
        ...state,
      };
    case Types.SHEETS_ERROR:
      return {
        ...state,
      };
    default:
      return state;
  }
}

export const Creators = {
  monitorRequest: (data) => ({
    type: Types.MONITOR_REQUEST,
    payload: { data },
  }),
  monitorSucess: (data, count) => ({
    type: Types.MONITOR_SUCCESS,
    payload: { data, count },
  }),
  createMonitorRequest: (data) => ({
    type: Types.CREATE_MONITOR_REQUEST,
    payload: { data },
  }),
  createMonitorSucess: (data) => ({
    type: Types.CREATE_MONITOR_SUCCESS,
    payload: { data },
  }),
  selectMonitor: (data) => ({
    type: Types.SELECT_MONITOR,
    payload: { data },
  }),
  selectMonitorSelected: (data) => ({
    type: Types.SELECT_MONITOR_SELECTED,
    payload: { data },
  }),
  updateMonitorRequest: (data) => ({
    type: Types.UPDATE_MONITOR_REQUEST,
    payload: { data },
  }),
  updateMonitorSuccess: (data) => ({
    type: Types.UPDATE_MONITOR_SUCCESS,
    payload: { data },
  }),
  deleteMonitorRequest: (data) => ({
    type: Types.DELETE_MONITOR_REQUEST,
    payload: { data },
  }),
  deleteMonitorSuccess: (data) => ({
    type: Types.DELETE_MONITOR_SUCCESS,
    payload: { data },
  }),
  setMonitor: (data) => ({
    type: Types.SET_MONITOR,
    payload: { data },
  }),
  setActiveMonitor: (data) => ({
    type: Types.SET_ACTIVE_MONITOR,
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
  sheetsError: (data) => ({
    type: Types.SHEETS_ERROR,
    payload: { data },
  }),
};
