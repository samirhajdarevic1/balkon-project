import { nastavniciTypes } from './types';

export const ucitajSveNastavnike = () => async (dispatch) => {
  try {
    dispatch({ type: nastavniciTypes.UCITAJ_NASTAVNIKE_REQUEST });
    const response = await fetch('http://localhost:3001/nastavnici');
    const result = await response.json();
    dispatch({
      type: nastavniciTypes.UCITAJ_NASTAVNIKE_SUCCESS,
      payload: result.nastavnici,
    });
  } catch (error) {
    dispatch({
      type: nastavniciTypes.UCITAJ_NASTAVNIKE_ERROR,
      error: error.message,
    });
  }
};

/* export const obrisiNastavnika = () => async (dispatch) => {
  console.log(dispatch);
  try {
    const requestOptions = {
      method: 'DELETE',
    };
    dispatch({ type: nastavniciTypes.OBRISI_NASTAVNIKA_REQUEST });
    const response = await fetch(
      `http://localhost:3001/nastavnici/${idNastavnik}`,
      requestOptions
    );
    const result = await response.json();
    dispatch({
      type: nastavniciTypes.OBRISI_NASTAVNIKA_SUCCESS,
      payload: result.nastavnici,
    });
  } catch (error) {
    dispatch({
      type: nastavniciTypes.OBRISI_NASTAVNIKA_ERROR,
      error: error.message,
    });
  }
}; */
