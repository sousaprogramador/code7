export const Types = {
  DATA_REQUEST: 'DATA_REQUEST',
  DATA_SUCCESS: 'DATA_SUCCESS',
  DATA_ERROR: 'DATA_ERROR',
  CLIENT_REQUEST: 'CLIENT_REQUEST',
  CLIENT_SUCCESS: 'CLIENT_SUCCESS',
  CLIENT_ERROR: 'CLIENT_ERROR',
  CREATE_REQUEST: 'CREATE_REQUEST',
  CREATE_SUCCESS: 'CREATE_SUCCESS',
};

const INITIAL_STATE = {
  loading: false,
  error: false,
  client: [],
  data: [],
};

export default function dashboard(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.DATA_REQUEST:
      return {
        loading: true,
        error: false,
      };
    case Types.DATA_SUCCESS:
      return {
        loading: false,
        error: false,
        data: action.payload.data,
      };
    case Types.DATA_ERROR:
      return {
        loading: false,
        data: [],
        error: action.payload.data,
      };
    case Types.CLIENT_REQUEST:
      return {
        loading: true,
        error: false,
      };
    case Types.CLIENT_SUCCESS:
      return {
        loading: false,
        error: false,
        client: action.payload.data,
      };
    case Types.CLIENT_ERROR:
      return {
        loading: false,
        data: [],
        error: action.payload.data,
      };
    case Types.CREATE_REQUEST:
      return {
        loading: true,
        error: false,
      };
    case Types.CREATE_SUCCESS:
      return {
        loading: false,
        error: false,
        data: action.payload.data,
      };
    default:
      return state;
  }
}

export const Creators = {
  dataRequest: (data) => ({
    type: Types.DATA_REQUEST,
    payload: { data },
  }),
  dataSuccess: (data) => ({
    type: Types.DATA_SUCCESS,
    payload: { data },
  }),
  clientRequest: (data) => ({
    type: Types.CLIENT_REQUEST,
    payload: { data },
  }),
  clientSuccess: (data) => ({
    type: Types.CLIENT_SUCCESS,
    payload: { data },
  }),
  createRequest: (data) => ({
    type: Types.CREATE_REQUEST,
    payload: { data },
  }),
  createSuccess: (data) => ({
    type: Types.CREATE_SUCCESS,
    payload: { data },
  }),
};
