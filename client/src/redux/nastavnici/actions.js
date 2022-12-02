import fetchInstance from '../utils/fetchInstance';
import { nastavniciTypes } from './types';

export const ucitajSveNastavnike = () => async (dispatch) => {
  try {
    dispatch({ type: nastavniciTypes.UCITAJ_NASTAVNIKE_REQUEST });
    const result = await fetchInstance('http://localhost:3001/nastavnici');
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

export const ucitajNastavnikeIzPredmeta = (idPredmet) => async (dispatch) => {
  try {
    dispatch({ type: nastavniciTypes.UCITAJ_NASTAVNIKE_REQUEST });
    const result = await fetchInstance(
      `http://localhost:3001/predmeti/${idPredmet}/nastavnici`
    );
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

export const ucitajNastavnika = (id) => {
  return async (dispatch) => {
    try {
      dispatch({ type: nastavniciTypes.UCITAJ_NASTAVNIKA_REQUEST });
      const result = await fetchInstance(
        `http://localhost:3001/nastavnici/${id}`
      );
      if (!result.nastavnik) {
        dispatch({
          type: nastavniciTypes.UCITAJ_NASTAVNIKA_SUCCESS,
          payload: [],
        });
      }
      dispatch({
        type: nastavniciTypes.UCITAJ_NASTAVNIKA_SUCCESS,
        payload: result.nastavnik,
      });
    } catch (error) {
      dispatch({
        type: nastavniciTypes.UCITAJ_NASTAVNIKA_ERROR,
        error: error.message,
      });
    }
  };
};

export const obrisiNastavnika = (id) => {
  return async (dispatch) => {
    try {
      dispatch({ type: nastavniciTypes.OBRISI_NASTAVNIKA_REQUEST });
      const result = await fetchInstance(
        `http://localhost:3001/nastavnici/${id}`,
        {
          method: 'DELETE',
        }
      );
      dispatch({
        type: nastavniciTypes.OBRISI_NASTAVNIKA_SUCCESS,
        payload: id,
      });
    } catch (error) {
      dispatch({
        type: nastavniciTypes.OBRISI_NASTAVNIKA_ERROR,
        error: error.message,
      });
    }
  };
};

export const urediNastavnika = (nastavnik) => {
  return async (dispatch) => {
    try {
      dispatch({ type: nastavniciTypes.UREDI_NASTAVNIKA_REQUEST });
      const result = await fetchInstance(
        `http://localhost:3001/nastavnici/${nastavnik.idNastavnik}`,
        {
          method: 'PUT',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ime: `${nastavnik.ime}`,
            prezime: `${nastavnik.prezime}`,
          }),
        }
      );
      dispatch({
        type: nastavniciTypes.UREDI_NASTAVNIKA_SUCCESS,
        payload: result.data,
      });
    } catch (error) {
      dispatch({
        type: nastavniciTypes.UREDI_NASTAVNIKA_ERROR,
        error: error.message,
      });
    }
  };
};
export const dodajNastavnika = (nastavnik) => {
  return async (dispatch) => {
    try {
      dispatch({ type: nastavniciTypes.DODAJ_NASTAVNIKA_REQUEST });
      const result = await fetchInstance(`http://localhost:3001/nastavnici`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ime: `${nastavnik.ime}`,
          prezime: `${nastavnik.prezime}`,
          photo: `${nastavnik.photo}`,
        }),
      });
      dispatch({
        type: nastavniciTypes.DODAJ_NASTAVNIKA_SUCCESS,
        payload: result.data,
      });
    } catch (error) {
      dispatch({
        type: nastavniciTypes.DODAJ_NASTAVNIKA_ERROR,
        error: error.message,
      });
    }
  };
};
