import { predmetiTypes } from './types';
import fetchInstance from '../utils/fetchInstance';

export const ucitajSvePredmete = () => async (dispatch) => {
  try {
    dispatch({ type: predmetiTypes.UCITAJ_PREDMETE_REQUEST });
    const result = await fetchInstance('http://localhost:3001/predmeti');
    dispatch({
      type: predmetiTypes.UCITAJ_PREDMETE_SUCCESS,
      payload: result.predmeti,
    });
  } catch (error) {
    dispatch({
      type: predmetiTypes.UCITAJ_PREDMETE_ERROR,
      error: error.message,
    });
  }
};
export const ucitajUcenikovePredmete = (idUcenik, idRazred) => {
  return async (dispatch) => {
    try {
      dispatch({ type: predmetiTypes.UCITAJ_UCENIKOVE_PREDMETE_REQUEST });
      const result = await fetchInstance(
        `http://localhost:3001/ucenici/${idUcenik}/${idRazred}/predmeti`
      );
      dispatch({
        type: predmetiTypes.UCITAJ_UCENIKOVE_PREDMETE_SUCCESS,
        payload: result.ucenikoviPredmeti || [],
      });
      return result.ucenikoviPredmeti;
    } catch (error) {
      dispatch({
        type: predmetiTypes.UCITAJ_UCENIKOVE_PREDMETE_ERROR,
        error: error.message,
      });
    }
  };
};

export const ucitajPredmet = (id) => {
  return async (dispatch) => {
    try {
      dispatch({ type: predmetiTypes.UCITAJ_PREDMET_REQUEST });
      const result = await fetchInstance(
        `http://localhost:3001/predmeti/${id}`
      );
      console.log(result.predmet);
      if (!result.predmet) {
        dispatch({
          type: predmetiTypes.UCITAJ_PREDMET_SUCCESS,
          payload: [],
        });
      }
      dispatch({
        type: predmetiTypes.UCITAJ_PREDMET_SUCCESS,
        payload: result.predmet,
      });
    } catch (error) {
      dispatch({
        type: predmetiTypes.UCITAJ_PREDMET_ERROR,
        error: error.message,
      });
    }
  };
};

export const obrisiPredmet = (id) => {
  return async (dispatch) => {
    try {
      dispatch({ type: predmetiTypes.OBRISI_PREDMET_REQUEST });
      const result = await fetchInstance(
        `http://localhost:3001/predmeti/${id}`,
        {
          method: 'DELETE',
        }
      );
      dispatch({
        type: predmetiTypes.OBRISI_PREDMET_SUCCESS,
        payload: id,
      });
    } catch (error) {
      dispatch({
        type: predmetiTypes.OBRISI_PREDMET_ERROR,
        error: error.message,
      });
    }
  };
};

export const urediPredmet = (predmet) => {
  return async (dispatch) => {
    try {
      dispatch({ type: predmetiTypes.UREDI_PREDMET_REQUEST });
      const result = await fetchInstance(
        `http://localhost:3001/predmeti/${predmet.idPredmet}`,
        {
          method: 'PUT',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            naziv: `${predmet.naziv}`,
          }),
        }
      );
      dispatch({
        type: predmetiTypes.UREDI_PREDMET_SUCCESS,
        payload: result.data,
      });
    } catch (error) {
      dispatch({
        type: predmetiTypes.UREDI_PREDMET_ERROR,
        error: error.message,
      });
    }
  };
};

export const dodajPredmet = (predmet) => {
  return async (dispatch) => {
    try {
      dispatch({ type: predmetiTypes.DODAJ_PREDMET_REQUEST });
      const result = await fetchInstance(`http://localhost:3001/predmeti`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          naziv: `${predmet.naziv}`,
        }),
      });
      dispatch({
        type: predmetiTypes.DODAJ_PREDMET_SUCCESS,
        payload: result.predmet,
      });
    } catch (error) {
      dispatch({
        type: predmetiTypes.DODAJ_PREDMET_ERROR,
        error: error.message,
      });
    }
  };
};
