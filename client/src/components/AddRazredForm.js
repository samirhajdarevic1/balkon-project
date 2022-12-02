import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ucitajSveNastavnike } from '../redux/nastavnici/actions';
import { dodajRazred } from '../redux/odjeljenjaRazredi/actions';
import { ucitajSveSkolskeGodine } from '../redux/skolskeGodine/actions';
import formStyles from './Form.module.css';

const AddRazredForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [razred, setRazred] = useState('');
  const [oznakaOdjeljenja, setOznakaOdjeljenja] = useState('');
  const nastavnici = useSelector((state) => state.nastavnici.items);
  const skolskeGodine = useSelector((state) => state.skolskeGodine.items);
  const [backdrop, setBackdrop] = useState('');

  useEffect(() => {
    dispatch(ucitajSveNastavnike());
  }, []);

  useEffect(() => {
    if (skolskeGodine.length < 1) {
      dispatch(ucitajSveSkolskeGodine());
    }
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    const idNastavnikRazrednik = e.target.idNastavnik.value;
    const idSkolskaGodina = e.target.idSkolskaGodina.value;
    dispatch(
      dodajRazred({
        idSkolskaGodina,
        razred,
        oznakaOdjeljenja,
        idNastavnikRazrednik,
      })
    ).then(() => navigate('/razredi'));
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
              <label>Odaberi skolsku godinu</label>
              <select name="idSkolskaGodina">
                {skolskeGodine.map((sg) => (
                  <option value={sg.idSkolskaGodina} key={sg.idSkolskaGodina}>
                    {sg.skolskaGodina}
                  </option>
                ))}
              </select>
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
              <label>Odaberi nastavnika</label>
              <select name="idNastavnik">
                {nastavnici.map((nastavnik) => (
                  <option
                    value={nastavnik.idNastavnik}
                    key={nastavnik.idNastavnik}
                  >
                    {nastavnik.ime} {nastavnik.prezime}
                  </option>
                ))}
              </select>
            </li>
          </ul>
        </div>
        <button className="btn">Finnish adding</button>
      </form>
    </>
  );
};

export default AddRazredForm;
