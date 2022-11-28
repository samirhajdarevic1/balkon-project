import { getAuthTokens } from '../utils';
import fetchInstance from '../utils/fetchInstance';
import { userTypes } from './types';

export const dodajUsera = (user) => {
  return async (dispatch) => {
    try {
      dispatch({ type: userTypes.DODAJ_USERA_REQUEST });
      const result = await fetchInstance(`http://localhost:3001/createUser`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          // Authorization: `Bearer ${getAuthTokens().token}`,
        },
        body: JSON.stringify({
          name: `${user.ime}`,
          email: `${user.email}`,
          password: `${user.password}`,
        }),
      });
      if (result.success) {
        window.location.href = '/login';
      }
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
