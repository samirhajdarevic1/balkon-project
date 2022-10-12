import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { dodajOcjenu } from '../redux/ocjene/actions';
import formStyles from './Form.module.css';

const AddOcjenuForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [ucenik, setUcenik] = useState('');
  const [nastavnik, setNastavnik] = useState('');
  const [datum, setDatum] = useState('');
  const [ocj, setOcj] = useState('');
  const [razred, setRazred] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(dodajOcjenu({ ucenik, nastavnik, datum, ocj, razred })).then(() =>
      navigate('/ocjene')
    );
  };
  return (
    <form onSubmit={submitHandler} className={formStyles['form-control']}>
      <div>
        <ul>
          <li>
            <label>Ucenik</label>
            <input
              value={ucenik}
              onChange={(e) => setUcenik(e.target.value)}
              type="text"
              placeholder="Ucenik"
            />
          </li>
          <li>
            <label>Nastavnik</label>
            <input
              value={nastavnik}
              onChange={(e) => setNastavnik(e.target.value)}
              type="text"
              placeholder="Ucenik"
            />
          </li>
          <li>
            <label>Datum</label>
            <input
              value={datum}
              onChange={(e) => setDatum(e.target.value)}
              type="text"
              placeholder="Datum"
            />
          </li>
          <li>
            <label>Ocjena</label>
            <input
              value={ocj}
              onChange={(e) => setOcj(e.target.value)}
              type="number"
              placeholder="Ocjena"
            />
          </li>
          <li>
            <label>Razred</label>
            <input
              value={razred}
              onChange={(e) => setRazred(e.target.value)}
              placeholder="Razred"
            />
          </li>
        </ul>
      </div>
      <button>Finnish adding</button>
    </form>
  );
};

export default AddOcjenuForm;
