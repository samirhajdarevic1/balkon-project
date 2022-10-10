import { predmetiTypes } from './types';

const INITIAL_STATE = {
  loading: false,
  items: [],
  error: null,
};

const predmetiReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case predmetiTypes.UCITAJ_PREDMETE_REQUEST:
      return { ...state, loading: true };
    case predmetiTypes.UCITAJ_PREDMETE_SUCCESS:
      return {
        ...state,
        items: action.payload,
        loading: false,
      };
    case predmetiTypes.UCITAJ_PREDMETE_ERROR: {
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    }

    case predmetiTypes.UCITAJ_PREDMET_REQUEST:
      return { ...state, loading: true };
    case predmetiTypes.UCITAJ_PREDMET_SUCCESS:
      return {
        ...state,
        items: [action.payload],
        loading: false,
      };
    case predmetiTypes.UCITAJ_PREDMET_ERROR: {
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    }
    case predmetiTypes.OBRISI_PREDMET_REQUEST:
      return { ...state, loading: true };
    case predmetiTypes.OBRISI_PREDMET_SUCCESS:
      return {
        ...state,
        items: state.items.filter((i) => i.idPredmet !== action.payload),
        loading: false,
      };
    case predmetiTypes.OBRISI_PREDMET_ERROR: {
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    }

    case predmetiTypes.DODAJ_PREDMET_REQUEST:
      return { ...state, loading: true };
    case predmetiTypes.DODAJ_PREDMET_SUCCESS:
      return {
        ...state,
        items: [...state.items, action.payload],
        loading: false,
      };
    case predmetiTypes.DODAJ_PREDMET_ERROR: {
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    }

    case predmetiTypes.UREDI_PREDMET_REQUEST:
      return { ...state, loading: true };

    case predmetiTypes.UREDI_PREDMET_SUCCESS:
      return {
        ...state,
        items: state.items.map((item) =>
          item.idPredmet !== action.payload.idPredmet ? item : action.payload
        ),
        loading: false,
      };

    case predmetiTypes.UREDI_PREDMET_ERROR: {
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

export default predmetiReducer;
