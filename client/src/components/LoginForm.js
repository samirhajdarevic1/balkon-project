import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { authUser } from '../redux/authUser/actions';
import {
  handleChangeIme,
  handleImeOnBlur,
  handlePasswordOnBlur,
} from './LoginUserCheckInput';
import formStyles from './Form.module.css';

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [ime, setIme] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState({ ime: '', password: '' });

  const submitHandler = (e) => {
    e.preventDefault();
    if (ime.trim().length === 0) {
      setError({ ...error, ime: 'Must enter a value' });
    } else if (password.trim().length === 0) {
      setError({ ...error, password: 'Must enter the value' });
    }
    dispatch(authUser({ ime, password }));
  };

  return (
    <>
      {<div className={formStyles.backdrop}></div>}
      <form onSubmit={submitHandler} className="form-control">
        <h1 className="font-bold">Login</h1>
        <div>
          <ul>
            <li>
              <label>Ime</label>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <input
                  value={ime}
                  onChange={(e) => handleChangeIme(e, error, setError, setIme)}
                  onBlur={() => handleImeOnBlur(ime, error, setError)}
                  type="text"
                  placeholder="Ime"
                />
                {error.ime && (
                  <span style={{ color: 'red' }} htmlFor="ime">
                    {error.ime}
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
                  placeholder="Password"
                />
                {error.password && (
                  <span style={{ color: 'red' }} htmlFor="ime">
                    {error.password}
                  </span>
                )}
              </div>
            </li>
          </ul>
        </div>
        <button className="btn">Login</button>
        <hr></hr>
        <Link to="/createUser">Don't have an account?</Link>
      </form>
    </>
  );
};

export default LoginForm;
