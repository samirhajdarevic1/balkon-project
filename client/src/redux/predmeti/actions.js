import { predmetiTypes } from './types';

export const ucitajSvePredmete = () => async (dispatch) => {
  try {
    dispatch({ type: predmetiTypes.UCITAJ_PREDMETE_REQUEST });
    const response = await fetch('http://localhost:3001/predmeti');
    const result = await response.json();
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
    console.log(999, idUcenik, idRazred);
    try {
      dispatch({ type: predmetiTypes.UCITAJ_UCENIKOVE_PREDMETE_REQUEST });
      const response = await fetch(
        `http://localhost:3001/ucenici/${idUcenik}/${idRazred}/predmeti`
      );
      const result = await response.json();
      dispatch({
        type: predmetiTypes.UCITAJ_UCENIKOVE_PREDMETE_SUCCESS,
        payload: result.ucenikoviPredmeti,
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
      const response = await fetch(`http://localhost:3001/predmeti/${id}`);
      const result = await response.json();
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
      const response = await fetch(`http://localhost:3001/predmeti/${id}`, {
        method: 'DELETE',
      });
      await response.json();
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
      const response = await fetch(
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
      const result = await response.json();
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
      const response = await fetch(`http://localhost:3001/predmeti`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          naziv: `${predmet.naziv}`,
        }),
      });
      //.then(ucitajSvePredmete().then((res) => console.log(res)));
      const result = await response.json();
      console.log(1234, result);
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
