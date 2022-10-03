import { uceniciTypes } from './types';

export const ucitajSveUcenike = () => async (dispatch) => {
  try {
    dispatch({ type: uceniciTypes.UCITAJ_UCENIKE_REQUEST });
    const response = await fetch('http://localhost:3001/ucenici');
    const result = await response.json();
    dispatch({
      type: uceniciTypes.UCITAJ_UCENIKE_SUCCESS,
      payload: result.ucenici,
    });
  } catch (error) {
    dispatch({
      type: uceniciTypes.UCITAJ_UCENIKE_ERROR,
      error: error.message,
    });
  }
};

export const ucitajUcenika = (id) => async (dispatch) => {
  try {
    dispatch({ type: uceniciTypes.UCITAJ_UCENIKA_REQUEST });
    const response = await fetch(`http://localhost:3001/ucenici/${id}`);
    const result = await response.json();

    dispatch({
      type: uceniciTypes.UCITAJ_UCENIKA_SUCCESS,
      payload: result.nastavnik,
    });
  } catch (error) {
    dispatch({
      type: uceniciTypes.UCITAJ_UCENIKA_ERROR,
      error: error.message,
    });
  }
};
