export const Types = {
  DATA_REQUEST: 'DATA_REQUEST',
  DATA_SUCCESS: 'DATA_SUCCESS',
  DATA_ERROR: 'DATA_ERROR',
};

const INITIAL_STATE = {
  loading: false,
  error: false,
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
};
