import fetchInstance from '../utils/fetchInstance';
import { ocjeneTypes } from './types';

export const ucitajSveOcjene = () => async (dispatch) => {
  try {
    dispatch({ type: ocjeneTypes.UCITAJ_OCJENE_REQUEST });
    const result = await fetchInstance('http://localhost:3001/ocjene');
    dispatch({
      type: ocjeneTypes.UCITAJ_OCJENE_SUCCESS,
      payload: result.ocjene,
    });
  } catch (error) {
    dispatch({
      type: ocjeneTypes.UCITAJ_OCJENE_ERROR,
      error: error.message,
    });
  }
};

export const ucitajOcjeneIzPredmeta = (idUcenik, idRazred, idPredmet) => {
  return async (dispatch) => {
    try {
      dispatch({ type: ocjeneTypes.UCITAJ_UCENIKOVE_OCJENE_REQUEST });
      const result = await fetchInstance(
        `http://localhost:3001/ucenici/${idUcenik}/${idRazred}/${idPredmet}/ocjene`
      );
      dispatch({
        type: ocjeneTypes.UCITAJ_UCENIKOVE_OCJENE_SUCCESS,
        payload: result.ocjene,
      });
      return result.ocjene;
    } catch (error) {
      dispatch({
        type: ocjeneTypes.UCITAJ_UCENIKOVE_OCJENE_ERROR,
        error: error.message,
      });
    }
  };
};

export const ucitajOcjenu = (id) => {
  return async (dispatch) => {
    try {
      dispatch({ type: ocjeneTypes.UCITAJ_OCJENU_REQUEST });
      const result = await fetchInstance(`http://localhost:3001/ocjene/${id}`);
      dispatch({
        type: ocjeneTypes.UCITAJ_OCJENU_SUCCESS,
        payload: result.ocjena,
      });
    } catch (error) {
      dispatch({
        type: ocjeneTypes.UCITAJ_OCJENU_ERROR,
        error: error.message,
      });
    }
  };
};

export const urediOcjenu = (ocjena) => {
  return async (dispatch) => {
    try {
      dispatch({ type: ocjeneTypes.UREDI_OCJENU_REQUEST });
      const result = await fetchInstance(
        `http://localhost:3001/ocjene/${ocjena.idOcjena}`,
        {
          method: 'PUT',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            idOdjeljenja: `${ocjena.idRazred}`,
            idUcenik: `${ocjena.idUcenik}`,
            idNastavnik: `${ocjena.idNastavnik}`,
            idPredmet: `${ocjena.idPredmet}`,
            datum: `${ocjena.datum}`,
            ocjena: `${ocjena.ocj}`,
            opis: `${ocjena.opis}`,
          }),
        }
      );
      dispatch({
        type: ocjeneTypes.UREDI_OCJENU_SUCCESS,
        payload: result.data,
      });
    } catch (error) {
      dispatch({
        type: ocjeneTypes.UREDI_OCJENU_ERROR,
        error: error.message,
      });
    }
  };
};

export const dodajOcjenu = (ocjena) => {
  return async (dispatch) => {
    try {
      dispatch({ type: ocjeneTypes.DODAJ_OCJENU_REQUEST });
      const result = await fetchInstance(`http://localhost:3001/ocjene`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          idOdjeljenja: `${ocjena.idRazred}`,
          idUcenik: `${ocjena.idUcenik}`,
          idNastavnik: `${ocjena.idNastavnik}`,
          idPredmet: `${ocjena.idPredmet}`,
          datum: `${ocjena.datum}`,
          ocjena: `${ocjena.ocj}`,
          opis: `${ocjena.opis}`,
        }),
      });
      dispatch({
        type: ocjeneTypes.DODAJ_OCJENU_SUCCESS,
        payload: result.data,
      });
    } catch (error) {
      dispatch({
        type: ocjeneTypes.DODAJ_OCJENU_ERROR,
        error: error.message,
      });
    }
  };
};

export const obrisiOcjenu = (id) => {
  return async (dispatch) => {
    try {
      dispatch({ type: ocjeneTypes.OBRISI_OCJENU_REQUEST });
      const response = await fetchInstance(
        `http://localhost:3001/ocjene/${id}`,
        {
          method: 'DELETE',
        }
      );
      dispatch({
        type: ocjeneTypes.OBRISI_OCJENU_SUCCESS,
        payload: id,
      });
    } catch (error) {
      dispatch({
        type: ocjeneTypes.OBRISI_OCJENU_ERROR,
        error: error.message,
      });
    }
  };
};
