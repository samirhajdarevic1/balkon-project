import { ucenikRazredTypes } from './types';

const INITIAL_STATE = {
  loading: false,
  items: [],
  error: null,
};

const ucenikRazredReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ucenikRazredTypes.DODAJ_UCENIKA_U_RAZRED_REQUEST:
      return { ...state, loading: true };
    case ucenikRazredTypes.DODAJ_UCENIKA_U_RAZRED_SUCCESS:
      return {
        ...state,
        items: [...state.items, action.payload],
        loading: false,
      };
    case ucenikRazredTypes.DODAJ_UCENIKA_U_RAZRED_ERROR:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    case ucenikRazredTypes.UCITAJ_UCENIKE_IZ_RAZREDA_REQUEST:
      return { ...state, loading: true };
    case ucenikRazredTypes.UCITAJ_UCENIKE_IZ_RAZREDA_SUCCESS:
      return {
        ...state,
        items: action.payload,
        loading: false,
      };
    case ucenikRazredTypes.UCITAJ_UCENIKE_IZ_RAZREDA_ERROR: {
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

export default ucenikRazredReducer;
