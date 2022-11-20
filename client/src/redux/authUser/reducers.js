import { authUserTypes } from './types';

const INITIAL_STATE = {
  loading: false,
  items: [],
  error: null,
};

const authUserReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case authUserTypes.AUTH_USER_REQUEST:
      return { ...state, loading: true };
    case authUserTypes.AUTH_USER_SUCCESS:
      return {
        ...state,
        items: [...state.items, action.payload],
        loading: false,
      };
    case authUserTypes.AUTH_USER_ERROR:
      return {
        ...state,
        error: action.error,
        loading: false,
      };

    default:
      return state;
  }
};

export default authUserReducer;
