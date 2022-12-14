import fetchInstance from '../utils/fetchInstance';
import { skolskeGodineTypes } from './types';

export const ucitajSveSkolskeGodine = () => async (dispatch) => {
  try {
    dispatch({ type: skolskeGodineTypes.UCITAJ_SKOLSKE_GODINE_REQUEST });
    const result = await fetchInstance('http://localhost:3001/skolske-godine');
    dispatch({
      type: skolskeGodineTypes.UCITAJ_SKOLSKE_GODINE_SUCCESS,
      payload: result.skolskeGodine.reverse(),
    });
  } catch (error) {
    dispatch({
      type: skolskeGodineTypes.UCITAJ_SKOLSKE_GODINE_ERROR,
      error: error.message,
    });
  }
};
/* 
export const ucitajUcenika = (id) => {
  return async (dispatch) => {
    try {
      dispatch({ type: uceniciTypes.UCITAJ_UCENIKA_REQUEST });
      const response = await fetch(`http://localhost:3001/ucenici/${id}`);
      const result = await response.json();
      dispatch({
        type: uceniciTypes.UCITAJ_UCENIKA_SUCCESS,
        payload: result.ucenik,
      });
    } catch (error) {
      dispatch({
        type: uceniciTypes.UCITAJ_UCENIKA_ERROR,
        error: error.message,
      });
    }
  };
};

export const dodajUcenika = (ucenik) => {
  return async (dispatch) => {
    try {
      dispatch({ type: uceniciTypes.DODAJ_UCENIKA_REQUEST });
      const response = await fetch(`http://localhost:3001/ucenici`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ime: `${ucenik.ime}`,
          prezime: `${ucenik.prezime}`,
          birthday: `${ucenik.birthday}`,
          image: `${ucenik.image}`,
        }),
      });
      const result = await response.json();
      dispatch({
        type: uceniciTypes.DODAJ_UCENIKA_SUCCESS,
        payload: result.data,
      });
    } catch (error) {
      dispatch({
        type: uceniciTypes.DODAJ_UCENIKA_ERROR,
        error: error.message,
      });
    }
  };
};

export const urediUcenika = (ucenik) => {
  return async (dispatch) => {
    try {
      console.log(ucenik);
      dispatch({ type: uceniciTypes.UREDI_UCENIKA_REQUEST });
      const response = await fetch(
        `http://localhost:3001/ucenici/${ucenik.idUcenik}`,
        {
          method: 'PUT',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ime: `${ucenik.ime}`,
            prezime: `${ucenik.prezime}`,
            birthday: `${ucenik.birthday}`,
            image: `${ucenik.image}`,
            imeMajke: `${ucenik.imeMajke}`,
            imeOca: `${ucenik.imeOca}`,
            adresa: `${ucenik.adresa}`,
            maticniBroj: `${ucenik.maticniBroj}`,
          }),
        }
      );
      const result = await response.json();
      dispatch({
        type: uceniciTypes.UREDI_UCENIKA_SUCCESS,
        payload: result.data,
      });
    } catch (error) {
      dispatch({
        type: uceniciTypes.UREDI_UCENIKA_ERROR,
        error: error.message,
      });
    }
  };
};

export const obrisiUcenika = (id) => {
  return async (dispatch) => {
    try {
      dispatch({ type: uceniciTypes.OBRISI_UCENIKA_REQUEST });
      const response = await fetch(`http://localhost:3001/ucenici/${id}`, {
        method: 'DELETE',
      });
      await response.json();
      dispatch({
        type: uceniciTypes.OBRISI_UCENIKA_SUCCESS,
        payload: id,
      });
    } catch (error) {
      dispatch({
        type: uceniciTypes.OBRISI_UCENIKA_ERROR,
        error: error.message,
      });
    }
  };
};
 */
