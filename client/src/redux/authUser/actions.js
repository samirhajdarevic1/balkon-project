import { authUserTypes } from './types';

export const authUser = (user) => {
  return async (dispatch) => {
    try {
      console.log(user);
      dispatch({ type: authUserTypes.AUTH_USER_REQUEST });
      const response = await fetch(`http://localhost:3001/login`, {
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
      if (result.accessToken) {
        localStorage.setItem('token', result.accessToken);
        localStorage.setItem('refreshToken', result.refreshToken);
        alert('Login successful');
        window.location.href = '/home';
      } else {
        alert('Please check your username and password');
      }
      dispatch({
        type: authUserTypes.AUTH_USER_SUCCESS,
        payload: result.data,
      });
    } catch (error) {
      dispatch({
        type: authUserTypes.AUTH_USER_ERROR,
        error: error.message,
      });
    }
  };
};
