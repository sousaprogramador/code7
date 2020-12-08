export const Types = {
  CREATE_NOTIFICATION_REQUEST: 'notifications/NOTIFICATION_REQUEST',
  CREATE_NOTIFICATION_SUCCESS: 'notifications/NOTIFICATION_SUCCESS',
  CREATE_NOTIFICATION_ERROR: 'notifications/CREATE_NOTIFICATION_REQUEST',
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

export default function notifications(state = INITIAL_STATE, action) {
  switch (action.type) {

    case Types.CREATE_NOTIFICATION_REQUEST:
      return {
        ...state,
      };
    case Types.CREATE_NOTIFICATION_SUCCESS:
      return {
        ...state,
      };
    case Types.CREATE_NOTIFICATION_ERROR:
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
  createNotificationsRequest: (data) => ({
    type: Types.CREATE_NOTIFICATION_REQUEST,
    payload: { data },
  }),
  notificationSuccess: (data) => ({
    type: Types.CREATE_NOTIFICATION_SUCCESS,
    payload: { data },
  }),
  notificationCreate: (data) => ({
    type: Types.CREATE_NOTIFICATION_ERROR,
    payload: { data },
  }),
};
