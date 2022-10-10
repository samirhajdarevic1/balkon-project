import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { dodajNastavnika } from '../redux/nastavnici/actions';
import formStyles from './Form.module.css';

const AddNastavnikForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [ime, setIme] = useState('');
  const [prezime, setPrezime] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(dodajNastavnika({ ime, prezime })).then(() =>
      navigate('/nastavnici')
    );
  };

  return (
    <form onSubmit={submitHandler} className={formStyles['form-control']}>
      <div>
        <ul>
          <li>
            <input
              value={ime}
              onChange={(e) => setIme(e.target.value)}
              type="text"
              placeholder="Ime nastavnika"
            />
          </li>
          <li>
            <input
              value={prezime}
              onChange={(e) => setPrezime(e.target.value)}
              type="text"
              placeholder="Prezime nastavnika"
            />
          </li>
        </ul>
      </div>
      <button>Finnish adding</button>
    </form>
  );
};

export default AddNastavnikForm;
