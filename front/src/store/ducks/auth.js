export const Types = {
  SIGN_IN_REQUEST: 'auth/SIGN_IN_REQUEST',
  SIGN_IN_SUCCESS: 'auth/SIGN_IN_SUCCESS',
  SIGN_IN_ERROR: 'auth/SIGN_IN_ERROR',
  GET_PERMISSION_SUCCESS: 'auth/GET_PERMISSION_SUCCESS',
  INITI_CHECK_SUCCESS: 'auth/INITI_CHECK_SUCCESS',
  LOG_OUT: 'auth/LOG_OUT',
};

const INITIAL_STATE = {
  authChecked: false,
  signedIn: false,
  token: null,
  toles: [],
  permissions: [],
};

export default function auth(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.SIGN_IN_REQUEST:
      return { ...state, loading: true };

    case Types.SIGN_IN_SUCCESS: {
      const { token } = action.payload;

      return { ...state, signedIn: true, token };
    }

    case Types.GET_PERMISSION_SUCCESS: {
      const { permissions, roles } = action.payload.data;
      return { ...state, permissions, roles };
    }

    case Types.INITI_CHECK_SUCCESS:
      return { ...state, authChecked: true };

    case Types.LOG_OUT:
      return { ...state, token: null, signedIn: false };
    default:
      return state;
  }
}

export const Creators = {
  signInRequest: (data) => ({
    type: Types.SIGN_IN_REQUEST,
    payload: { data },
  }),
  signInSuccess: (token, permissions) => ({
    type: Types.SIGN_IN_SUCCESS,
    payload: { token, permissions },
  }),
  signInError: (error) => ({
    type: Types.SIGN_IN_ERROR,
    payload: { error },
  }),
  getPermissionsSuccess: (data) => ({
    type: Types.GET_PERMISSION_SUCCESS,
    payload: { data },
  }),

  initCheckSuccess: () => ({
    type: Types.INITI_CHECK_SUCCESS,
  }),
  logOut: () => ({
    type: Types.LOG_OUT,
  }),
};
