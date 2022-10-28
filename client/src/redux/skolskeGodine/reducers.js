import { skolskeGodineTypes } from './types';

const INITIAL_STATE = {
  loading: false,
  items: [],
  error: null,
};

const skolskeGodineReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case skolskeGodineTypes.UCITAJ_SKOLSKE_GODINE_REQUEST:
      return { ...state, loading: true };
    case skolskeGodineTypes.UCITAJ_SKOLSKE_GODINE_SUCCESS:
      return {
        ...state,
        items: action.payload,
        loading: false,
      };
    case skolskeGodineTypes.UCITAJ_SKOLSKE_GODINE_ERROR: {
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    }
    /* 
    case skolskeGodineTypes.UCITAJ_SKOLSKU_GODINU_REQUEST:
      return { ...state, loading: true };
    case skolskeGodineTypes.UCITAJ_SKOLSKU_GODINU_SUCCESS:
      return {
        ...state,
        items: [action.payload],
        loading: false,
      };
    case skolskeGodineTypes.UCITAJ_SKOLSKU_GODINU_ERROR: {
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    }

    case skolskeGodineTypes.OBRISI_SKOLSKU_GODINU_REQUEST:
      return { ...state, loading: true };
    case skolskeGodineTypes.OBRISI_SKOLSKU_GODINU_SUCCESS:
      return {
        ...state,
        items: state.items.filter((i) => i.idUcenik !== action.payload),
        loading: false,
      };
    case skolskeGodineTypes.OBRISI_SKOLSKU_GODINU_ERROR: {
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    }
    case skolskeGodineTypes.UREDI_SKOLSKU_GODINU_REQUEST:
      return { ...state, loading: true };

    case skolskeGodineTypes.UREDI_SKOLSKU_GODINU_SUCCESS:
      return {
        ...state,
        items: state.items.map((item) =>
          item.idUcenik !== action.payload.idUcenik ? item : action.payload
        ),
        loading: false,
      };

    case skolskeGodineTypes.UREDI_PREDMET_ERROR: {
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    }

    case skolskeGodineTypes.DODAJ_SKOLSKU_GODINU_REQUEST:
      return { ...state, loading: true };
    case skolskeGodineTypes.DODAJ_SKOLSKU_GODINU_SUCCESS:
      return {
        ...state,
        items: [...state.items, action.payload],
        loading: false,
      };
    case skolskeGodineTypes.DODAJ_SKOLSKU_GODINU_ERROR:
      return {
        ...state,
        error: action.error,
        loading: false,
      }; */
    default:
      return state;
  }
};

export default skolskeGodineReducer;
