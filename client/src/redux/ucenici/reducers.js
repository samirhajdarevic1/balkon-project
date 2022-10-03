import { uceniciTypes } from './types';

const INITIAL_STATE = {
  loading: false,
  items: [],
  error: null,
};

const uceniciReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case uceniciTypes.UCITAJ_UCENIKE_REQUEST:
      return { ...state, loading: true };
    case uceniciTypes.UCITAJ_UCENIKE_SUCCESS:
      return {
        ...state,
        items: action.payload,
        loading: false,
      };
    case uceniciTypes.UCITAJ_UCENIKE_ERROR: {
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    }

    case uceniciTypes.UCITAJ_UCENIKA_REQUEST:
      return { ...state, loading: true };
    case uceniciTypes.UCITAJ_UCENIKA_SUCCESS:
      return {
        ...state,
        items: [action.payload],
        loading: false,
      };
    case uceniciTypes.UCITAJ_UCENIKA_ERROR: {
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    }

    default:
      return state;
  }
};

export default uceniciReducer;
