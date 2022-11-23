import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { dodajUsera } from '../redux/users/actions';
import formStyles from './Form.module.css';

const RegisterUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [ime, setIme] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState({ name: '', email: '', password: '' });

  const submitHandler = (e) => {
    e.preventDefault();
    if (ime.trim().length === 0) {
      setError({ ...error, name: 'Must have length greather than 0' });
    } else {
      setError({ ...error, name: '' });
    }
    if (!email.includes('@')) {
      setError({ ...error, email: 'Email must contain @' });
      return;
    } else {
      setError({ ...error, email: '' });
    }

    if (password.trim().length < 6) {
      setError({ ...error, password: 'Must enter more than 6 characters' });
      return;
    } else {
      setError({ ...error, password: '' });
    }

    dispatch(dodajUsera({ ime, email, password }));
  };

  const handleChangeIme = (e) => {
    e.preventDefault();

    if (e.target.value.includes('_')) {
      setError({ ...error, name: 'You cannot use an underscore' });
    } else {
      setError({ ...error, name: '' });
    }
    setIme(e.target.value);
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
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <input
                  value={ime}
                  name="ime"
                  onChange={handleChangeIme}
                  type="text"
                  placeholder="Ime"
                />
                {error.name && (
                  <label style={{ color: 'red' }} htmlFor="ime">
                    {error.name}
                  </label>
                )}
              </div>
            </li>
            <li>
              <label>email</label>
              <input
                value={email}
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                type="text"
                placeholder="email"
              />
              {error.email && (
                <label style={{ color: 'red' }} htmlFor="email">
                  {error.email}
                </label>
              )}
            </li>
            <li>
              <label>Password</label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Password"
              />
              {error.password && (
                <label style={{ color: 'red' }} htmlFor="ime">
                  {error.password}
                </label>
              )}
            </li>
          </ul>
        </div>
        <button type="submit">Sign up</button>
      </form>
    </>
  );
};

export default RegisterUser;
