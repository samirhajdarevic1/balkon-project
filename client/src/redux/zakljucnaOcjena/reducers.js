import { zakljucneOcjeneTypes } from './types';

const INITIAL_STATE = {
  loading: false,
  items: [],
  error: null,
};

const zakljucneOcjeneReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case zakljucneOcjeneTypes.UCITAJ_ZAKLJUCNU_OCJENU_REQUEST:
      return { ...state, loading: true };
    case zakljucneOcjeneTypes.UCITAJ_ZAKLJUCNU_OCJENU_SUCCESS:
      return {
        ...state,
        items: [action.payload],
        loading: false,
      };
    case zakljucneOcjeneTypes.UCITAJ_ZAKLJUCNU_OCJENU_ERROR: {
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    }
    case zakljucneOcjeneTypes.DODAJ_ZAKLJUCNU_OCJENU_REQUEST:
      return { ...state, loading: true };
    case zakljucneOcjeneTypes.DODAJ_ZAKLJUCNU_OCJENU_SUCCESS:
      return {
        ...state,
        items: [...state.items, action.payload],
        loading: false,
      };
    case zakljucneOcjeneTypes.DODAJ_ZAKLJUCNU_OCJENU_ERROR:
      return {
        ...state,
        error: action.error,
        loading: false,
      };

    default:
      return state;
  }
};

export default zakljucneOcjeneReducer;
