export const Types = {
  CITIES_REQUEST: 'cities/CITIES_REQUEST',
  CITIES_SUCCESS: 'cities/CITIES_SUCCESS',
  CITIES_ERROR: 'cities/CITIES_ERROR',
};

const INITIAL_STATE = {
  loading: false,
  error: false,
  data: [],
};

export default function cities(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.CITIES_REQUEST:
      return {
        loading: false,
        error: false,
      };
    case Types.CITIES_SUCCESS:
      return {
        loading: false,
        error: false,
        data: action.payload.data,
      };
    case Types.CITIES_ERROR:
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
  citiesRequest: (data) => ({
    type: Types.CITIES_REQUEST,
    payload: { data },
  }),
  citiesSuccess: (data) => ({
    type: Types.CITIES_SUCCESS,
    payload: { data },
  }),
};
