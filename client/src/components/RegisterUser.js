import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { dodajUsera } from '../redux/users/actions';
import formStyles from './Form.module.css';

const RegisterUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [ime, setIme] = useState('');
  const [password, setPassword] = useState('');
  const [backdrop, setBackdrop] = useState('');
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(dodajUsera({ ime, password }));
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
      <form className={formStyles['form-control']} onSubmit={submitHandler}>
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
        <button type="submit">Sign up</button>
      </form>
    </>
  );
};

export default RegisterUser;
