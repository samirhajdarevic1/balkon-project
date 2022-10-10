import { nastavniciTypes } from './types';

const INITIAL_STATE = {
  loading: false,
  items: [],
  messages: undefined,
  error: null,
};

const nastavniciReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case nastavniciTypes.UCITAJ_NASTAVNIKE_REQUEST:
      return { ...state, loading: true };
    case nastavniciTypes.UCITAJ_NASTAVNIKE_SUCCESS:
      return {
        ...state,
        items: action.payload,
        loading: false,
      };
    case nastavniciTypes.UCITAJ_NASTAVNIKE_ERROR: {
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    }
    case nastavniciTypes.UCITAJ_NASTAVNIKA_REQUEST:
      return { ...state, loading: true };
    case nastavniciTypes.UCITAJ_NASTAVNIKA_SUCCESS:
      return {
        ...state,
        //items: [...state.items, action.payload],
        items: [action.payload],
        //items: state.items.filter((i) => i.idNastavnik !== action.payload),
        loading: false,
      };
    case nastavniciTypes.UCITAJ_NASTAVNIKA_ERROR: {
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    }
    case nastavniciTypes.OBRISI_NASTAVNIKA_REQUEST:
      return { ...state, loading: true };
    case nastavniciTypes.OBRISI_NASTAVNIKA_SUCCESS:
      return {
        ...state,
        items: state.items.filter((i) => i.idNastavnik !== action.payload),
        loading: false,
      };
    case nastavniciTypes.OBRISI_NASTAVNIKA_ERROR: {
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    }
    case nastavniciTypes.DODAJ_NASTAVNIKA_REQUEST:
      return { ...state, loading: true };
    case nastavniciTypes.DODAJ_NASTAVNIKA_SUCCESS:
      return {
        ...state,
        items: [...state.items, action.payload],
        loading: false,
      };
    case nastavniciTypes.DODAJ_NASTAVNIKA_ERROR: {
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    }

    case nastavniciTypes.UREDI_NASTAVNIKA_REQUEST:
      return { ...state, loading: true };

    case nastavniciTypes.UREDI_NASTAVNIKA_SUCCESS:
      return {
        ...state,
        items: state.items.map((item) =>
          item.idNastavnik !== action.payload.idNastavnik
            ? item
            : action.payload
        ),
        loading: false,
      };

    case nastavniciTypes.UREDI_NASTAVNIKA_ERROR: {
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

export default nastavniciReducer;
