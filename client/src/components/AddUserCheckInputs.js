export const handleImeOnBlur = (ime, error, setError) => {
  if (ime.trim().length === 0) {
    setError({ ...error, name: 'Please fill out this field' });
  } else {
    setError({ ...error, name: '' });
  }
};

export const handleEmailOnBlur = (email, error, setError) => {
  if (!email.includes('@')) {
    setError({ ...error, email: 'Must include @' });
  } else {
    setError({ ...error, email: '' });
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

export const handlePasswordOnBlur = (password, error, setError) => {
  if (password.trim().length === 0) {
    setError({ ...error, password: 'Must enter the password' });
  } else {
    setError({ ...error, password: '' });
  }
};
