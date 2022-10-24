import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { ucitajNastavnikeIzPredmeta } from '../redux/nastavnici/actions';
import { ucitajOcjenu, urediOcjenu } from '../redux/ocjene/actions';
import formStyles from './Form.module.css';

const EditOcjenuForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { idUcenik, idRazred, idPredmet, idOcjena } = useParams();
  const [opis, setOpis] = useState('');
  const [ocj, setOcj] = useState('');
  const [datum, setDatum] = useState('');
  const [backdrop, setBackdrop] = useState('');
  const nastavnici = useSelector((state) => state.nastavnici.items);
  const [ucenikovRazred] = useSelector((state) =>
    state.razredi.items.filter((raz) => raz.idRazred === +idRazred)
  );
  const [ocjena] = useSelector((state) =>
    state.ocjene.items.filter((pred) => pred.idOcjena === +idOcjena)
  );
  const [ucenik] = useSelector((state) =>
    state.ucenici.items.filter((ucenik) => ucenik.idUcenik === +idUcenik)
  );
  const [predmet] = useSelector((state) =>
    state.predmeti.items.filter((pred) => pred.idPredmet === +idPredmet)
  );

  useEffect(() => {
    dispatch(ucitajNastavnikeIzPredmeta(+idPredmet));
  }, [+idPredmet]);

  useEffect(() => {
    if (!ocjena) {
      dispatch(ucitajOcjenu(+idOcjena));
    }
  }, []);

  useEffect(() => {
    if (ocjena) {
      setDatum(String(ocjena.datum).split('T')[0]);
      setOcj(ocjena.ocjena);
      setOpis(ocjena.opis);
    }
  }, [ocjena]);

  const editingHandler = (e) => {
    e.preventDefault();
    const idRazred = e.target.idRazred.value;
    const idUcenik = e.target.idUcenik.value;
    const idNastavnik = e.target.idNastavnik.value;
    const idPredmet = e.target.idPredmet.value;
    dispatch(
      urediOcjenu({
        idOcjena,
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
      <form onSubmit={editingHandler} className={formStyles['form-control']}>
        <div>
          <ul>
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
              <label>Opis</label>
              <input
                value={opis}
                onChange={(e) => setOpis(e.target.value)}
                placeholder="Opis"
              />
            </li>
          </ul>
        </div>
        <button>Done editing</button>
      </form>
    </>
  );
};

export default EditOcjenuForm;
