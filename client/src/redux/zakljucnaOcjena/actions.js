import { uceniciTypes, zakljucneOcjeneTypes } from './types';

/* export const ucitajSveUcenike = () => async (dispatch) => {
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
 */
export const ucitajZakljucnuOcjenu = (idUcenik, idPredmet, idSkolskaGodina) => {
  return async (dispatch) => {
    try {
      dispatch({ type: zakljucneOcjeneTypes.UCITAJ_ZAKLJUCNU_OCJENU_REQUEST });
      const response = await fetch(
        `http://localhost:3001/zakljucne-ocjene/${idUcenik}/${idPredmet}/${idSkolskaGodina}`
      );
      const result = await response.json();
      console.log(result);
      dispatch({
        type: zakljucneOcjeneTypes.UCITAJ_ZAKLJUCNU_OCJENU_SUCCESS,
        payload: result.zakljucnaOcjena,
      });
    } catch (error) {
      dispatch({
        type: zakljucneOcjeneTypes.UCITAJ_ZAKLJUCNU_OCJENU_ERROR,
        error: error.message,
      });
    }
  };
};

export const dodajZakljucnuOcjenu = (zakljucnaOcjena) => {
  return async (dispatch) => {
    console.log(zakljucnaOcjena);
    try {
      dispatch({ type: zakljucneOcjeneTypes.DODAJ_ZAKLJUCNU_OCJENU_REQUEST });
      const response = await fetch(`http://localhost:3001/zakljucne-ocjene`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id_skolska_godina: `${zakljucnaOcjena.idSkolskaGodina}`,
          id_predmet: `${zakljucnaOcjena.idPredmet}`,
          id_ucenik: `${zakljucnaOcjena.idUcenik}`,
          zakljucnaOcjena: `${zakljucnaOcjena.zakljucnaOcjena}`,
        }),
      });
      const result = await response.json();
      console.log(result);
      dispatch({
        type: zakljucneOcjeneTypes.DODAJ_ZAKLJUCNU_OCJENU_SUCCESS,
        payload: result.data,
      });
    } catch (error) {
      dispatch({
        type: zakljucneOcjeneTypes.DODAJ_ZAKLJUCNU_OCJENU_ERROR,
        error: error.message,
      });
    }
  };
};
/* 
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
