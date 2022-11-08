import { razrediSkolGodTypes } from './types';

const INITIAL_STATE = {
  loading: false,
  items: [],
  error: null,
};

const razrediUSkolskojGodiniReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case razrediSkolGodTypes.UCITAJ_RAZREDE_IZ_SK_GOD_REQUEST:
      return { ...state, loading: true };
    case razrediSkolGodTypes.UCITAJ_RAZREDE_IZ_SK_GOD_SUCCESS:
      return {
        ...state,
        items: action.payload,
        loading: false,
      };
    case razrediSkolGodTypes.UCITAJ_RAZREDE_IZ_SK_GOD_ERROR: {
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

export default razrediUSkolskojGodiniReducer;
