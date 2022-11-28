import fetchInstance from '../utils/fetchInstance';
import { razrediTypes } from './types';

export const ucitajSveRazrede = () => async (dispatch) => {
  try {
    dispatch({ type: razrediTypes.UCITAJ_RAZREDE_REQUEST });
    const result = await fetchInstance('http://localhost:3001/odjeljenja');
    result.reverse();
    dispatch({
      type: razrediTypes.UCITAJ_RAZREDE_SUCCESS,
      payload: result.odjeljenja,
    });
  } catch (error) {
    dispatch({
      type: razrediTypes.UCITAJ_RAZREDE_ERROR,
      error: error.message,
    });
  }
};

//UCITAJ UCENIKOVE RAZREDE

export const ucitajUcenikoveRazrede = (id) => {
  return async (dispatch) => {
    try {
      dispatch({ type: razrediTypes.UCITAJ_UCENIKOVE_RAZREDE_REQUEST });
      const result = await fetchInstance(
        `http://localhost:3001/ucenici/${id}/razredi`
      );
      // const result = await response.json();
      dispatch({
        type: razrediTypes.UCITAJ_UCENIKOVE_RAZREDE_SUCCESS,
        payload: result.ucenikovaOdjeljenja.reverse() || [],
      });
    } catch (error) {
      dispatch({
        type: razrediTypes.UCITAJ_UCENIKOVE_RAZREDE_ERROR,
        error: error.message,
      });
    }
  };
};

export const dodajRazred = (razred) => {
  return async (dispatch) => {
    try {
      dispatch({ type: razrediTypes.DODAJ_RAZRED_REQUEST });
      const result = await fetchInstance(`http://localhost:3001/odjeljenja`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          idSkolskaGodina: `${razred.idSkolskaGodina}`,
          oznakaOdjeljenja: `${razred.oznakaOdjeljenja}`,
          razred: `${razred.razred}`,
          idNastavnikRazrednik: `${razred.idNastavnikRazrednik}`,
        }),
      });
      dispatch({
        type: razrediTypes.DODAJ_RAZRED_SUCCESS,
        payload: result.razred,
      });
    } catch (error) {
      dispatch({
        type: razrediTypes.DODAJ_RAZRED_ERROR,
        error: error.message,
      });
    }
  };
};

export const urediRazred = (razred) => {
  return async (dispatch) => {
    try {
      dispatch({ type: razrediTypes.UREDI_RAZRED_REQUEST });
      const result = await fetchInstance(
        `http://localhost:3001/odjeljenja/${razred.idOdjeljenja}`,
        {
          method: 'PUT',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            idSkolskaGodina: `${razred.idSkolskaGodina}`,
            idNastavnikRazrednik: `${razred.idNastavnikRazrednik}`,
            oznakaOdjeljenja: `${razred.oznakaOdjeljenja}`,
            razred: `${razred.razred}`,
          }),
        }
      );
      dispatch({
        type: razrediTypes.UREDI_RAZRED_SUCCESS,
        payload: result.data,
      });
    } catch (error) {
      dispatch({
        type: razrediTypes.UREDI_RAZRED_ERROR,
        error: error.message,
      });
    }
  };
};

export const obrisiRazred = (id) => {
  return async (dispatch) => {
    try {
      dispatch({ type: razrediTypes.OBRISI_RAZRED_REQUEST });
      const response = await fetchInstance(
        `http://localhost:3001/odjeljenja/${id}`,
        {
          method: 'DELETE',
        }
      );
      dispatch({
        type: razrediTypes.OBRISI_RAZRED_SUCCESS,
        payload: id,
      });
    } catch (error) {
      dispatch({
        type: razrediTypes.OBRISI_RAZRED_ERROR,
        error: error.message,
      });
    }
  };
};
