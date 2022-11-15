/*  [...select.options] takes the Array-like list of options and destructures it so that we can use Array.prototype methods on it (Edit: also consider using Array.from())
filter(...) reduces the options to only the ones that are selected
map(...) converts the raw <option> elements into their respective values */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { ucitajRazredeIzSkolskeGodine } from '../redux/razrediSkolskaGodina/actions';

import { ucitajSveSkolskeGodine } from '../redux/skolskeGodine/actions';
import { ucitajSveUcenike } from '../redux/ucenici/actions';
import { ucitajUcenikeIzRazreda } from '../redux/ucenikRazred/actions';
import { dodajUcenikaURazred } from '../redux/ucenikRazred/actions';
import formStyles from './Form.module.css';

const AddUcenikURazredForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { idRazred, idSkolskaGodina } = useParams();
  const [backdrop, setBackdrop] = useState('');
  const skolskeGodine = useSelector((state) => state.skolskeGodine.items);
  const ucenici = useSelector((state) => state.ucenici.items);
  const uceniciRazred = useSelector((state) => state.ucenikRazred.items);
  const [idSkolskaGod, setIdSkolskaGod] = useState(idSkolskaGodina);
  const razredi = useSelector((state) => state.razredi.items);
  const razrediUSkolskojGodini = useSelector(
    (state) => state.razrediUSkolskojGodini.items
  );
  const [idRazr, setIdRazr] = useState('');
  console.log(razrediUSkolskojGodini);
  console.log(idRazr);

  useEffect(() => {
    if (skolskeGodine.length < 1) {
      dispatch(ucitajSveSkolskeGodine());
    }
  }, [+idSkolskaGod]);

  useEffect(() => {
    if (+idSkolskaGod) {
      dispatch(ucitajRazredeIzSkolskeGodine(+idSkolskaGod));
    }
  }, [+idSkolskaGod]);

  useEffect(() => {
    if (idRazr && idSkolskaGod) {
      dispatch(ucitajUcenikeIzRazreda(+idRazr));
    }
  }, [+idSkolskaGod, +idRazr]);

  const backdropHandler = () => {
    setBackdrop(true);
    navigate(`/razredi/${idSkolskaGodina}/${idRazred}/ucenici`);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const selectedIds = [...e.target.idUcenik.options]
      .filter((option) => option.selected)
      .map((option) => option.value);

    selectedIds.forEach((idUcenik) => {
      dispatch(dodajUcenikaURazred(+idRazred, +idUcenik));
    });
    navigate(-1);
  };

  return (
    ucenici && (
      <>
        {!backdrop && (
          <div
            className={formStyles.backdrop}
            onClick={() => {
              backdropHandler();
            }}
          ></div>
        )}
        <form onSubmit={submitHandler} className={formStyles['form-control']}>
          <div className={formStyles.box}>
            <select
              name="idSkolskaGodina"
              id="idSkolskaGodina"
              value={idSkolskaGod}
              onChange={(e) => {
                setIdSkolskaGod(e.target.value);
              }}
            >
              {skolskeGodine.length > 0 &&
                skolskeGodine.map((sg) => {
                  return (
                    <option value={sg.idSkolskaGodina} key={sg.idSkolskaGodina}>
                      {sg.skolskaGodina}
                    </option>
                  );
                })}
            </select>
          </div>
          <div className={formStyles.box}>
            <select
              name="idRazred"
              id="idRazred"
              value={idRazr}
              onChange={(e) => {
                setIdRazr(e.target.value);
              }}
            >
              {razrediUSkolskojGodini.map((razred) => {
                return (
                  <option key={razred.idOdjeljenja} value={razred.idOdjeljenja}>
                    {razred.razred} {razred.oznakaOdjeljenja}
                  </option>
                );
              })}
            </select>
          </div>
          <div className={formStyles.multiple}>
            <select name="idUcenik" multiple id="idUcenik">
              {uceniciRazred.map((ucenik) => {
                return (
                  <option
                    type="checkbox"
                    key={ucenik.idUcenik}
                    value={ucenik.idUcenik}
                  >
                    {ucenik.ime} {ucenik.prezime}
                  </option>
                );
              })}
            </select>
          </div>
          <button>Dodaj u razred</button>
        </form>
      </>
    )
  );
};

export default AddUcenikURazredForm;
