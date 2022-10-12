import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { dodajPredmet } from '../redux/predmeti/actions';
import formStyles from './Form.module.css';

const AddPredmetForm = () => {
  const dispatch = useDispatch();
  const [predmet, setPredmet] = useState('');
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(dodajPredmet({ naziv: predmet })).then(() =>
      navigate('/predmeti')
    );
  };
  return (
    <form onSubmit={submitHandler} className={formStyles['form-control']}>
      <div>
        <ul>
          <li>
            <label>Predmet</label>
            <input
              value={predmet}
              onChange={(e) => setPredmet(e.target.value)}
              type="text"
              placeholder="naziv predmeta"
            />
          </li>
        </ul>
      </div>
      <button>Finnish adding</button>
    </form>
  );
};

export default AddPredmetForm;
