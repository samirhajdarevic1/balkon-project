export const getAuthTokens = () => {
  const refreshToken = localStorage.getItem('refreshToken');
  const token = localStorage.getItem('token');

  return { token, refreshToken };
};
