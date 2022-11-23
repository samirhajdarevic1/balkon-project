import fetchInstance from '../utils/fetchInstance';
import { ucenikRazredTypes } from './types';

export const ucitajUcenikeIzRazreda = (idRazred) => async (dispatch) => {
  try {
    dispatch({ type: ucenikRazredTypes.UCITAJ_UCENIKE_IZ_RAZREDA_REQUEST });
    const result = await fetchInstance(
      `http://localhost:3001/odjeljenja/${idRazred}/ucenici`
    );
    //const result = await response.json();
    dispatch({
      type: ucenikRazredTypes.UCITAJ_UCENIKE_IZ_RAZREDA_SUCCESS,
      payload: result.ucenici,
    });
  } catch (error) {
    dispatch({
      type: ucenikRazredTypes.UCITAJ_UCENIKE_IZ_RAZREDA_ERROR,
      error: error.message,
    });
  }
};

export const dodajUcenikaURazred = (idRazred, idUcenik) => {
  return async (dispatch) => {
    try {
      dispatch({ type: ucenikRazredTypes.DODAJ_UCENIKA_U_RAZRED_REQUEST });
      const response = await fetch(
        `http://localhost:3001/ucenik-razred/${idRazred}/${idUcenik}`,
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            idRazred: `${idRazred}`,
            idUcenik: `${idUcenik}`,
          }),
        }
      );
      const result = await response.json();
      dispatch({
        type: ucenikRazredTypes.DODAJ_UCENIKA_U_RAZRED_SUCCESS,
        payload: result.ucenikRazred,
      });
    } catch (error) {
      dispatch({
        type: ucenikRazredTypes.DODAJ_UCENIKA_U_RAZRED_ERROR,
        error: error.message,
      });
    }
  };
};
