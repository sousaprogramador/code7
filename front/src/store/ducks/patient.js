export const Types = {
  PATIENT_REQUEST: 'patient/PATIENT_REQUEST',
  PATIENT_SUCCESS: 'patient/PATIENT_SUCCESS',
  SET_PATIENT: 'patient/SET_PATIENT',
  CREATE_PATIENT_REQUEST: 'patient/CREATE_PATIENT_REQUEST',
  CREATE_PATIENT_SUCCESS: 'patient/CREATE_PATIENT_SUCCESS',
  UPDATE_PATIENT_REQUEST: 'patient/UPDATE_PATIENT_REQUEST',
  UPDATE_PATIENT_SUCCESS: 'patient/UPDATE_PATIENT_SUCCESS',
  DELETE_PATIENT_REQUEST: 'patient/DELETE_PATIENT_REQUEST',
  DELETE_PATIENT_SUCCESS: 'patient/DELETE_PATIENT_SUCCESS',
  CREATE_PATIENT_ERROR: 'patient/CREATE_PATIENT_ERROR',
  PATIENT_PARAMTERS_REQUEST: 'patient/PATIENT_PARAMTERS_REQUEST',
};

const INITIAL_STATE = {
  loading: true,
  error: false,
  data: [],
  params: null,
  exportLoading: false,
  count: 0,
  lastPage: 0,
  reports: null,
};

export default function patient(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.PATIENT_REQUEST:
      return {
        ...state,
        error: false,
        loading: true,
      };
    case Types.PATIENT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        data: action.payload.data,
        count: action.payload.count,
        lastPage: action.payload.lastPage,
      };
    case Types.SET_PATIENT:
      return {
        ...state,
        loading: false,
        error: [],
      };
    case Types.CREATE_PATIENT_REQUEST:
      return {
        ...state,
        error: [],
      };
    case Types.CREATE_PATIENT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: [],
        data: action.payload.data,
      };
    case Types.UPDATE_PATIENT_REQUEST:
      return {
        ...state,
        loading: false,
        error: [],
      };
    case Types.UPDATE_PATIENT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: [],
      };
    case Types.DELETE_PATIENT_REQUEST:
      return {
        ...state,
        loading: false,
        error: [],
      };
    case Types.DELETE_PATIENT_SUCCESS:
      return {
        loading: false,
        error: [],
      };
    case Types.CREATE_PATIENT_ERROR:
      return {
        ...state,
        loading: false,
        data: [],
        error: action.payload.data,
      };
    case Types.PATIENT_PARAMTERS_REQUEST:
      return {
        ...state,
      };

    default:
      return state;
  }
}

export const Creators = {
  patientRequest: (data) => ({
    type: Types.PATIENT_REQUEST,
    payload: { data },
  }),
  patientSucess: (data, count, lastPage) => ({
    type: Types.PATIENT_SUCCESS,
    payload: { data, count, lastPage },
  }),
  setPatient: (data) => ({
    type: Types.SET_PATIENT,
    payload: { data },
  }),
  createPatientRequest: (data) => ({
    type: Types.CREATE_PATIENT_REQUEST,
    payload: { data },
  }),
  createPatientSucess: (data) => ({
    type: Types.CREATE_PATIENT_SUCCESS,
    payload: { data },
  }),
  updatePatientRequest: (data) => ({
    type: Types.UPDATE_PATIENT_REQUEST,
    payload: { data },
  }),
  updatePatientSuccess: (data) => ({
    type: Types.UPDATE_PATIENT_SUCCESS,
    payload: { data },
  }),
  deletePatientRequest: (data) => ({
    type: Types.DELETE_PATIENT_REQUEST,
    payload: { data },
  }),
  deletePatientSuccess: (data) => ({
    type: Types.DELETE_PATIENT_SUCCESS,
    payload: { data },
  }),
  patientParamsRequest: () => ({
    type: Types.PATIENT_PARAMTERS_REQUEST,
  }),
};
