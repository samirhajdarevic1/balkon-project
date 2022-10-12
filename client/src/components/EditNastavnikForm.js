import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { ucitajNastavnika, urediNastavnika } from '../redux/nastavnici/actions';
import formStyles from './Form.module.css';

const EditNastavnikForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { idNastavnik } = useParams();
  const [nastavnik] = useSelector((state) =>
    state.nastavnici.items.filter((nast) => nast.idNastavnik === +idNastavnik)
  );
  const [ime, setIme] = useState('');
  const [prezime, setPrezime] = useState('');

  useEffect(() => {
    if (!nastavnik) {
      dispatch(ucitajNastavnika(+idNastavnik));
    }
  }, []);

  useEffect(() => {
    if (nastavnik) {
      setIme(nastavnik.ime);
      setPrezime(nastavnik.prezime);
    }
  }, [nastavnik]);

  const editingHandler = (e) => {
    e.preventDefault();
    dispatch(urediNastavnika({ idNastavnik, ime, prezime })).then(() =>
      navigate(`/nastavnici/${idNastavnik}`)
    );
  };

  return (
    <form onSubmit={editingHandler} className={formStyles['form-control']}>
      <div>
        <ul>
          <li>
            <label>Ime</label>
            <input
              value={ime}
              onChange={(e) => setIme(e.target.value)}
              type="text"
            />
          </li>
          <li>
            <label>Prezime</label>
            <input
              value={prezime}
              onChange={(e) => setPrezime(e.target.value)}
              type="text"
            />
          </li>
        </ul>
      </div>
      <button>Done editing</button>
    </form>
  );
};

export default EditNastavnikForm;
