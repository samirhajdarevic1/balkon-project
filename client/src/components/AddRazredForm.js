import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { dodajRazred } from '../redux/odjeljenjaRazredi/actions';
import formStyles from './Form.module.css';

const AddRazredForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [idSkolskaGodina, setIdSkolskaGodina] = useState('');
  const [razred, setRazred] = useState('');
  const [oznakaOdjeljenja, setOznakaOdjeljenja] = useState('');
  const [idNastavnikRazrednik, setIdNastavnikRazrednik] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      dodajRazred({
        idSkolskaGodina,
        razred,
        oznakaOdjeljenja,
        idNastavnikRazrednik,
      })
    ).then(() => navigate('/razredi'));
  };

  return (
    <form onSubmit={submitHandler} className={formStyles['form-control']}>
      <div>
        <ul>
          <li>
            <label>Skolska godina</label>
            <input
              value={idSkolskaGodina}
              onChange={(e) => setIdSkolskaGodina(e.target.value)}
              placeholder="Skoslka godina"
            />
          </li>
          <li>
            <label>Razred</label>
            <input
              value={razred}
              onChange={(e) => setRazred(e.target.value)}
              type="number"
              placeholder="Razred"
            />
          </li>
          <li>
            <label>Odjeljenje</label>
            <input
              value={oznakaOdjeljenja}
              onChange={(e) => setOznakaOdjeljenja(e.target.value)}
              placeholder="Odjeljenje"
            />
          </li>
          <li>
            <label>IdRazrednik</label>
            <input
              value={idNastavnikRazrednik}
              onChange={(e) => setIdNastavnikRazrednik(e.target.value)}
              placeholder="Razrednik"
            />
          </li>
        </ul>
      </div>
      <button>Finnish adding</button>
    </form>
  );
};

export default AddRazredForm;
