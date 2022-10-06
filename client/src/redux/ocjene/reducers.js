import { ocjeneTypes } from './types';

const INITIAL_STATE = {
  loading: false,
  items: [],
  error: null,
};

const ocjeneReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ocjeneTypes.UCITAJ_OCJENE_REQUEST:
      return { ...state, loading: true };
    case ocjeneTypes.UCITAJ_OCJENE_SUCCESS:
      return {
        ...state,
        items: action.payload,
        loading: false,
      };
    case ocjeneTypes.UCITAJ_OCJENE_ERROR: {
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    }
    case ocjeneTypes.UCITAJ_OCJENU_REQUEST:
      return { ...state, loading: true };
    case ocjeneTypes.UCITAJ_OCJENU_SUCCESS:
      return {
        ...state,
        items: [action.payload],
        loading: false,
      };
    case ocjeneTypes.UCITAJ_OCJENU_ERROR: {
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    }
    case ocjeneTypes.OBRISI_OCJENU_REQUEST:
      return { ...state, loading: true };
    case ocjeneTypes.OBRISI_OCJENU_SUCCESS:
      return {
        ...state,
        //items: state.items.filter((i) => i.idNastavnik !== action.payload.id),
        //items: state.items.splice(action.payload.index, 1),
        items: state.items.filter((i) => i.idNastavnik !== action.payload),
        loading: false,
      };
    case ocjeneTypes.OBRISI_OCJENU_ERROR: {
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

export default ocjeneReducer;
