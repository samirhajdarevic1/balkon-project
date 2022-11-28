export const handleImeOnBlur = (ime, error, setError) => {
  if (ime.trim().length === 0) {
    setError({ ...error, ime: 'Please fill out this field' });
  } else {
    setError({ ...error, ime: '' });
  }
};

export const handlePasswordOnBlur = (password, error, setError) => {
  if (password.trim().length === 0) {
    setError({ ...error, password: 'Must enter the password' });
  } else {
    setError({ ...error, password: '' });
  }
};

export const handleChangeIme = (e, error, setError, setIme) => {
  e.preventDefault();
  if (e.target.value.includes('_')) {
    setError({ ...error, name: 'You cannot use an underscore' });
  } else {
    setError({ ...error, name: '' });
  }
  setIme(e.target.value);
};
