import { razrediTypes } from './types';

const INITIAL_STATE = {
  loading: false,
  items: [],
  error: null,
};

const razrediReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case razrediTypes.UCITAJ_RAZREDE_REQUEST:
      return { ...state, loading: true };
    case razrediTypes.UCITAJ_RAZREDE_SUCCESS:
      return {
        ...state,
        items: action.payload,
        loading: false,
      };
    case razrediTypes.UCITAJ_RAZREDE_ERROR: {
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    }

    case razrediTypes.UCITAJ_UCENIKOVE_RAZREDE_REQUEST:
      return { ...state, loading: true };
    case razrediTypes.UCITAJ_UCENIKOVE_RAZREDE_SUCCESS:
      return {
        ...state,
        items: action.payload,
        loading: false,
      };
    case razrediTypes.UCITAJ_UCENIKOVE_RAZREDE_ERROR: {
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    }

    case razrediTypes.UCITAJ_RAZRED_REQUEST:
      return { ...state, loading: true };
    case razrediTypes.UCITAJ_RAZRED_SUCCESS:
      return {
        ...state,
        items: [action.payload],
        loading: false,
      };
    case razrediTypes.UCITAJ_RAZRED_ERROR: {
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    }

    case razrediTypes.OBRISI_RAZRED_REQUEST:
      return { ...state, loading: true };
    case razrediTypes.OBRISI_RAZRED_SUCCESS:
      return {
        ...state,
        items: state.items.filter((i) => i.idOdjeljenja !== action.payload),
        loading: false,
      };
    case razrediTypes.OBRISI_RAZRED_ERROR: {
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    }
    case razrediTypes.UREDI_RAZRED_REQUEST:
      return { ...state, loading: true };

    case razrediTypes.UREDI_RAZRED_SUCCESS:
      return {
        ...state,
        items: state.items.map((item) =>
          item.idOdjeljenja !== action.payload.idOdjeljenja
            ? item
            : action.payload
        ),
        loading: false,
      };

    case razrediTypes.UREDI_RAZRED_ERROR: {
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    }

    case razrediTypes.DODAJ_RAZRED_REQUEST:
      return { ...state, loading: true };
    case razrediTypes.DODAJ_RAZRED_SUCCESS:
      return {
        ...state,
        items: [...state.items, action.payload],
        loading: false,
      };
    case razrediTypes.DODAJ_RAZRED_ERROR:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    default:
      return state;
  }
};

export default razrediReducer;
