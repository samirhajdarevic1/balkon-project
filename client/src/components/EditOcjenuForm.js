import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { ucitajOcjenu, urediOcjenu } from '../redux/ocjene/actions';
import formStyles from './Form.module.css';

const EditOcjenuForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { idOcjena } = useParams();
  const [ocjena] = useSelector((state) =>
    state.ocjene.items.filter((pred) => pred.idOcjena === +idOcjena)
  );
  console.log(ocjena);
  const [ucenik, setUcenik] = useState('');
  const [nastavnik, setNastavnik] = useState('');
  const [datum, setDatum] = useState('');
  const [ocj, setOcj] = useState('');
  const [razred, setRazred] = useState('');

  useEffect(() => {
    if (!ocjena) {
      dispatch(ucitajOcjenu(+idOcjena));
    }
  }, []);

  useEffect(() => {
    if (ocjena) {
      setUcenik(ocjena.ucenik);
      setNastavnik(ocjena.nastavnik);
      setDatum(ocjena.datum);
      setOcj(ocjena.ocjena);
      setRazred(ocjena.razred);
    }
  }, [ocjena]);

  const editingHandler = (e) => {
    e.preventDefault();
    dispatch(
      urediOcjenu({ idOcjena, ucenik, nastavnik, datum, ocjena, razred })
    ).then(() => navigate(`/ocjena/${idOcjena}`));
  };

  return (
    <form onSubmit={editingHandler} className={formStyles['form-control']}>
      <div>
        <ul>
          <li>
            <label>Ucenik</label>
            <input
              value={ucenik}
              onChange={(e) => setUcenik(e.target.value)}
              type="text"
            />
          </li>
          <li>
            <label>Nastavnik</label>
            <input
              value={nastavnik}
              onChange={(e) => setNastavnik(e.target.value)}
              type="text"
            />
          </li>
          <li>
            <label>Datum</label>
            <input
              value={datum}
              onChange={(e) => setDatum(e.target.value)}
              type="text"
            />
          </li>
          <li>
            <label>Ocjena</label>
            <input
              value={ocj}
              onChange={(e) => setOcj(e.target.value)}
              type="text"
            />
          </li>
          <li>
            <label>Razred</label>
            <input
              value={razred}
              onChange={(e) => setRazred(e.target.value)}
              type="text"
            />
          </li>
        </ul>
      </div>
      <button>Done editing</button>
    </form>
  );
};

export default EditOcjenuForm;
