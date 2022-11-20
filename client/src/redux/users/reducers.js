import { userTypes } from './types';

const INITIAL_STATE = {
  loading: false,
  items: [],
  error: null,
};

const usersReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case userTypes.DODAJ_USERA_REQUEST:
      return { ...state, loading: true };
    case userTypes.DODAJ_USERA_SUCCESS:
      return {
        ...state,
        items: [...state.items, action.payload],
        loading: false,
      };
    case userTypes.DODAJ_USERA_ERROR:
      return {
        ...state,
        error: action.error,
        loading: false,
      };

    default:
      return state;
  }
};

export default usersReducer;
