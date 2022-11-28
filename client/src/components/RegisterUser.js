import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { dodajUsera } from '../redux/users/actions';
import formStyles from './Form.module.css';
import {
  handleImeOnBlur,
  handleEmailOnBlur,
  handleChangeIme,
  handlePasswordOnBlur,
} from './AddUserCheckInputs';

const RegisterUser = () => {
  const dispatch = useDispatch();
  const [ime, setIme] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState({ name: '', email: '', password: '' });

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(ime.trim().length);
    if (ime.trim().length === 0) {
      return setError({ ...error, name: 'Must have length greather than 0' });
    } else {
      setError({ ...error, name: '' });
    }
    if (!email.includes('@')) {
      return setError({ ...error, email: 'Email must contain @' });
    } else {
      setError({ ...error, email: '' });
    }
    if (password.trim().length < 6) {
      return setError({
        ...error,
        password: 'Must enter more than 6 characters',
      });
    } else {
      setError({ ...error, password: '' });
    }

    dispatch(dodajUsera({ ime, email, password }));
  };

  return (
    <>
      <div className={formStyles.backdrop}></div>
      <form className={formStyles['form-control']} onSubmit={submitHandler}>
        <h1>Enter your data</h1>
        <div>
          <ul>
            <li>
              <label>Ime</label>
              <br />
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <input
                  value={ime}
                  name="ime"
                  onChange={(e) => handleChangeIme(e, error, setError, setIme)}
                  onBlur={() => handleImeOnBlur(ime, error, setError)}
                  type="text"
                  placeholder="Ime"
                />
                {error.name && (
                  <span style={{ color: 'red' }} htmlFor="ime">
                    {error.name}
                  </span>
                )}
              </div>
            </li>
            <li>
              <label>email</label>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <input
                  value={email}
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={() => handleEmailOnBlur(email, error, setError)}
                  type="text"
                  placeholder="email"
                />
                {error.email && (
                  <span style={{ color: 'red' }} htmlFor="email">
                    {error.email}
                  </span>
                )}
              </div>
            </li>
            <li>
              <label>Password</label>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onBlur={() => {
                    handlePasswordOnBlur(password, error, setError);
                  }}
                  type="password"
                  placeholder="Must have at least 6 characters"
                />
                {error.password && (
                  <span
                    style={{ color: 'red', marginBottom: '1rem' }}
                    htmlFor="ime"
                  >
                    {error.password}
                  </span>
                )}
              </div>
            </li>
          </ul>
        </div>
        <button type="submit">Sign up</button>
      </form>
    </>
  );
};

export default RegisterUser;
