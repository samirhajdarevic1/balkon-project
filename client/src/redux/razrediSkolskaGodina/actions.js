import { razrediSkolGodTypes } from './types';

export const ucitajRazredeIzSkolskeGodine =
  (idSkolskaGodina) => async (dispatch) => {
    try {
      dispatch({ type: razrediSkolGodTypes.UCITAJ_RAZREDE_IZ_SK_GOD_REQUEST });
      const response = await fetch(
        `http://localhost:3001/odjeljenja/skolske-godine/${idSkolskaGodina}`
      );
      const result = await response.json();
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
