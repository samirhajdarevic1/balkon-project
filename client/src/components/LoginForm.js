import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { authUser } from '../redux/authUser/actions';
import formStyles from './Form.module.css';

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [ime, setIme] = useState('');
  const [password, setPassword] = useState('');
  const [backdrop, setBackdrop] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    const x = dispatch(authUser({ ime, password }));
  };
  const backdropHandler = () => {
    setBackdrop(true);
    navigate(-1);
  };
  return (
    <>
      {!backdrop && (
        <div
          className={formStyles.backdrop}
          onClick={() => {
            backdropHandler();
          }}
        ></div>
      )}
      <form onSubmit={submitHandler} className={formStyles['form-control']}>
        <div>
          <ul>
            <li>
              <label>Ime</label>
              <input
                value={ime}
                onChange={(e) => setIme(e.target.value)}
                type="text"
                placeholder="Ime"
              />
            </li>
            <li>
              <label>Password</label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Password"
              />
            </li>
          </ul>
        </div>
        <button>Login</button>
        <hr></hr>
        <Link to="/createUser">Don't have an account?</Link>
      </form>
    </>
  );
};

export default LoginForm;
