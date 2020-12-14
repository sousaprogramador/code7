export const Types = {
  CLIENTS_REQUEST: 'CLIENTS_REQUEST',
  CLIENTS_SUCCESS: 'CLIENTS_SUCCESS',
  CLIENTS_ERROR: 'CLIENTS_ERROR',
  CREATE_REQUEST: 'CREATE_REQUEST',
  CREATE_SUCCESS: 'CREATE_SUCCESS',
};

const INITIAL_STATE = {
  loading: false,
  error: false,
  data: [],
};

export default function clients(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.CLIENTS_REQUEST:
      return {
        loading: true,
        error: false,
      };
    case Types.CLIENTS_SUCCESS:
      return {
        loading: false,
        error: false,
        data: action.payload.data,
      };
    case Types.CLIENTS_ERROR:
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
  clientsRequest: (data) => ({
    type: Types.CLIENTS_REQUEST,
    payload: { data },
  }),
  clientsSuccess: (data) => ({
    type: Types.CLIENTS_SUCCESS,
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
