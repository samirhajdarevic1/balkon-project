import { userTypes } from './types';

export const dodajUsera = (user) => {
  return async (dispatch) => {
    try {
      console.log(user);
      dispatch({ type: userTypes.DODAJ_USERA_REQUEST });
      const response = await fetch(`http://localhost:3001/createUser`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: `${user.ime}`,
          password: `${user.password}`,
        }),
      });
      const result = await response.json();
      dispatch({
        type: userTypes.DODAJ_USERA_SUCCESS,
        payload: result.status,
      });
    } catch (error) {
      dispatch({
        type: userTypes.DODAJ_USERA_ERROR,
        error: error.message,
      });
    }
  };
};
