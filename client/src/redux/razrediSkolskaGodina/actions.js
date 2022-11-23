import fetchInstance from '../utils/fetchInstance';
import { razrediSkolGodTypes } from './types';

export const ucitajRazredeIzSkolskeGodine =
  (idSkolskaGodina) => async (dispatch) => {
    try {
      dispatch({ type: razrediSkolGodTypes.UCITAJ_RAZREDE_IZ_SK_GOD_REQUEST });
      const result = await fetchInstance(
        `http://localhost:3001/odjeljenja/skolske-godine/${idSkolskaGodina}`
      );
      dispatch({
        type: razrediSkolGodTypes.UCITAJ_RAZREDE_IZ_SK_GOD_SUCCESS,
        payload: result.odjeljenja || [],
      });
    } catch (error) {
      dispatch({
        type: razrediSkolGodTypes.UCITAJ_RAZREDE_IZ_SK_GOD_ERROR,
        error: error.message,
      });
    }
  };
