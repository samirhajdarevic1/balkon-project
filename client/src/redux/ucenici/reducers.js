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

    case uceniciTypes.UCITAJ_UCENIKE_IZ_RAZREDA_REQUEST:
      return { ...state, loading: true };
    case uceniciTypes.UCITAJ_UCENIKE_IZ_RAZREDA_SUCCESS:
      return {
        ...state,
        items: action.payload,
        loading: false,
      };
    case uceniciTypes.UCITAJ_UCENIKE_IZ_RAZREDA_ERROR: {
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

    case uceniciTypes.OBRISI_UCENIKA_REQUEST:
      return { ...state, loading: true };
    case uceniciTypes.OBRISI_UCENIKA_SUCCESS:
      return {
        ...state,
        items: state.items.filter((i) => i.idUcenik !== action.payload),
        loading: false,
      };
    case uceniciTypes.OBRISI_UCENIKA_ERROR: {
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    }
    case uceniciTypes.UREDI_UCENIKA_REQUEST:
      return { ...state, loading: true };

    case uceniciTypes.UREDI_UCENIKA_SUCCESS:
      return {
        ...state,
        items: state.items.map((item) =>
          item.idUcenik !== action.payload.idUcenik ? item : action.payload
        ),
        loading: false,
      };

    case uceniciTypes.UREDI_PREDMET_ERROR: {
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    }

    case uceniciTypes.DODAJ_UCENIKA_REQUEST:
      return { ...state, loading: true };
    case uceniciTypes.DODAJ_UCENIKA_SUCCESS:
      return {
        ...state,
        items: [...state.items, action.payload],
        loading: false,
      };
    case uceniciTypes.DODAJ_UCENIKA_ERROR:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    default:
      return state;
  }
};

export default uceniciReducer;
