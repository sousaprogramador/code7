export const Types = {
  USER_REQUEST: 'user/USER_REQUEST',
  USER_SUCCESS: 'user/USER_SUCCESS',
  USER_ERROR: 'user/USER_ERROR',
  GET_INVITE_ALLOWED_REQUEST: 'user/GET_INVITE_ALLOWED_REQUEST',
  GET_INVITE_ALLOWED_SUCCESS: 'user/GET_INVITE_ALLOWED_SUCCESS',
  GET_INVITE_ALLOWED_ERROR: 'user/GET_INVITE_ALLOWED_ERROR',
  CREATE_INVITE_REQUEST: 'user/CREATE_INVITE_REQUEST',
  CREATE_INVITE_SUCCESS: 'user/CREATE_INVITE_SUCCESS',
  CREATE_USER_REQUEST: 'user/USER_CREATE_REQUEST',
  CREATE_USER_SUCCESS: 'user/USER_CREATE_SUCCESS',
  CREATE_USER_ERROR: 'user/CREATE_USER_ERROR',
  SIGNUP_COLLABORATOR_REQUEST: 'user/SIGNUP_COLLABORATOR_REQUEST',
  SIGNUP_COLLABORATOR_SUCCESS: 'user/SIGNUP_COLLABORATOR_SUCCESS',
};

const INITIAL_STATE = {
  loading: false,
  error: false,
  data: [],
};

export default function user(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.USER_REQUEST:
      return {
        loading: true,
        error: false,
      };
    case Types.USER_SUCCESS:
      return {
        loading: false,
        error: false,
      };
    case Types.GET_INVITE_ALLOWED_REQUEST:
      return {
        loading: true,
        error: false,
      };
    case Types.GET_INVITE_ALLOWED_SUCCESS:
      return {
        loading: false,
        error: false,
        data: action.payload.data,
      };
    case Types.GET_INVITE_ALLOWED_ERROR:
      return {
        loading: false,
      };
    case Types.CREATE_INVITE_REQUEST:
      return {
        loading: false,
        error: false,
      };
    case Types.CREATE_INVITE_SUCCESS:
      return {
        loading: false,
        error: false,
        data: action.payload.data,
      };
    case Types.SIGNUP_COLLABORATOR_REQUEST:
      return {
        loading: false,
        error: false,
      };
    case Types.signupCollaboratorSuccess:
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
  userRequest: (data) => ({
    type: Types.USER_REQUEST,
    payload: { data },
  }),
  userSuccess: (data) => ({
    type: Types.USER_SUCCESS,
    payload: { data },
  }),
  getInviteAllowedRequest: () => ({
    type: Types.GET_INVITE_ALLOWED_REQUEST,
  }),
  getInviteAllowedSuccess: (data) => ({
    type: Types.GET_INVITE_ALLOWED_SUCCESS,
    payload: { data },
  }),
  getInviteAllowedErrror: () => ({
    type: Types.GET_INVITE_ALLOWED_ERROR,
  }),
  createInviteRequest: (data) => ({
    type: Types.CREATE_INVITE_REQUEST,
    payload: { data },
  }),
  createInviteSuccess: (data) => ({
    type: Types.CREATE_INVITE_SUCCESS,
    payload: { data },
  }),
  signupCollaboratorRequest: (data) => ({
    type: Types.SIGNUP_COLLABORATOR_REQUEST,
    payload: { data },
  }),
  signupCollaboratorSuccess: (data) => ({
    type: Types.SIGNUP_COLLABORATOR_SUCCESS,
    payload: { data },
  }),
};
