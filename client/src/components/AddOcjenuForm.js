import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { ucitajNastavnikeIzPredmeta } from '../redux/nastavnici/actions';
import { dodajOcjenu } from '../redux/ocjene/actions';
import formStyles from './Form.module.css';

const AddOcjenuForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { idPredmet } = useParams();
  const { idRazred } = useParams();
  const { idUcenik } = useParams();
  const [datum, setDatum] = useState(new Date().toISOString().slice(0, -14));
  const [ocj, setOcj] = useState('');
  const [opis, setOpis] = useState('');
  const [backdrop, setBackdrop] = useState('');
  const [ucenik] = useSelector((state) =>
    state.ucenici.items.filter((ucenik) => ucenik.idUcenik === +idUcenik)
  );
  const [predmet] = useSelector((state) =>
    state.predmeti.items.filter((pred) => pred.idPredmet === +idPredmet)
  );
  const [ucenikovRazred] = useSelector((state) =>
    state.razredi.items.filter((raz) => raz.idRazred === +idRazred)
  );
  const nastavnici = useSelector((state) => state.nastavnici.items);

  useEffect(() => {
    dispatch(ucitajNastavnikeIzPredmeta(+idPredmet));
  }, [+idPredmet]);

  const backdropHandler = () => {
    setBackdrop(true);
    navigate(-1);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    const idRazred = e.target.idRazred.value;
    const idUcenik = e.target.idUcenik.value;
    const idNastavnik = e.target.idNastavnik.value;
    const idPredmet = e.target.idPredmet.value;
    dispatch(
      dodajOcjenu({
        idRazred,
        idUcenik,
        idNastavnik,
        idPredmet,
        datum,
        ocj,
        opis,
      })
    );
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
              <label>Odaberi ucenikov razred</label>
              <select name="idRazred" disabled>
                {
                  <option
                    value={ucenikovRazred.idRazred}
                    key={ucenikovRazred.idRazred}
                  >
                    {ucenikovRazred.razred}
                  </option>
                }
              </select>
            </li>
            <li>
              <label>Odaberi ucenika</label>
              <select name="idUcenik" disabled>
                {
                  <option value={ucenik.idUcenik} key={ucenik.idUcenik}>
                    {ucenik.ime} {ucenik.prezime}
                  </option>
                }
              </select>
            </li>
            <li>
              <label htmlFor="predmeti">Odaberi predmet</label>
              <select name="idPredmet" disabled>
                {
                  <option value={predmet.idPredmet} key={predmet.idPredmet}>
                    {predmet.predmet}
                  </option>
                }
              </select>
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
            <li>
              <label>Datum</label>
              <input
                value={datum}
                onChange={(e) => setDatum(e.target.value)}
                type="date"
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
                min="1"
                max="5"
              />
            </li>
            <li>
              <label>Opis</label>
              <input
                value={opis}
                onChange={(e) => setOpis(e.target.value)}
                placeholder="Opis"
              />
            </li>
          </ul>
        </div>
        <button className="btn">Finnish adding</button>
      </form>
    </>
  );
};

export default AddOcjenuForm;
