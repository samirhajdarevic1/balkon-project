const { getAuthTokens } = require('.');

const fetchInstance = async (url, fetchInit) => {
  try {
    let newFetchInit = undefined;
    if (fetchInit) {
      newFetchInit = { ...fetchInit };
      if (newFetchInit.headers) {
        newFetchInit.headers = {
          ...newFetchInit.headers,
          Authorization: `Bearer ${getAuthTokens().token}`,
        };
      } else {
        newFetchInit['headers'] = {
          Authorization: `Bearer ${getAuthTokens().token}`,
        };
      }
    } else {
      newFetchInit = {
        headers: {
          Authorization: `Bearer ${getAuthTokens().token}`,
        },
      };
    }

    const response = await fetch(url, newFetchInit);

    if (!response.ok) {
      if (response.status === 401) {
        const authResponse = await fetch(
          'http://localhost:3001/login/refresh',
          {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              refreshToken: getAuthTokens().refreshToken,
            }),
          }
        );

        if (!authResponse.ok) {
          throw new Error(response.statusText);
        } else {
          const result = await authResponse.json();
          localStorage.setItem('token', result.data.accesToken);
          localStorage.setItem('refreshToken', result.data.refreshToken);
        }
      }

      throw new Error(response.statusText);
    }

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};

export default fetchInstance;
