import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { dodajPredmet } from '../redux/predmeti/actions';
import formStyles from './Form.module.css';

const AddPredmetForm = () => {
  const dispatch = useDispatch();
  const [predmet, setPredmet] = useState('');
  const navigate = useNavigate();
  const [backdrop, setBackdrop] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(dodajPredmet({ naziv: predmet })).then(() =>
      navigate('/predmeti')
    );
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
      <form onSubmit={submitHandler} className="form-control">
        <div>
          <ul>
            <li>
              <label>Predmet</label>
              <input
                data="add-predmet-input"
                value={predmet}
                onChange={(e) => setPredmet(e.target.value)}
                type="text"
                placeholder="naziv predmeta"
              />
            </li>
          </ul>
        </div>
        <button className="btn">Finnish adding</button>
      </form>
    </>
  );
};

export default AddPredmetForm;
