import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Link,
  redirect,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom';
import { ucitajRazredeIzSkolskeGodine } from '../redux/odjeljenjaRazredi/actions';
import { ucitajSveSkolskeGodine } from '../redux/skolskeGodine/actions';
import { ucitajSveUcenike } from '../redux/ucenici/actions';
import { ucitajUcenikeIzRazreda } from '../redux/ucenikRazred/actions';
import { dodajUcenikaURazred } from '../redux/ucenikRazred/actions';
import formStyles from './Form.module.css';

const AddUcenikURazredForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  var { pathname } = useLocation();
  const { idRazred, idSkolskaGodina } = useParams();
  const [backdrop, setBackdrop] = useState('');
  const ucenici = useSelector((state) => state.ucenici.items);
  const skolskeGodine = useSelector((state) => state.skolskeGodine.items);
  const razredi = useSelector((state) => state.razredi.items);
  const uceniciRazred = useSelector((state) => state.ucenikRazred.items);
  /*   const [idSkolskaGod, setIdSkolskaGod] = useState(idSkolskaGodina); */

  useEffect(() => {
    if (skolskeGodine.length < 1) {
      dispatch(ucitajSveSkolskeGodine());
    }
  }, []);

  useEffect(() => {
    if (idSkolskaGodina) {
      console.log(idSkolskaGodina);
      dispatch(ucitajRazredeIzSkolskeGodine(+idSkolskaGodina));
    }
  }, [+idSkolskaGodina]);

  useEffect(() => {
    if (idSkolskaGodina && idRazred) {
      dispatch(ucitajUcenikeIzRazreda(+idRazred));
    }
  }, [ucenici.length, +idSkolskaGodina, +idRazred]);

  const backdropHandler = () => {
    setBackdrop(true);
    navigate(-1);
  };

  /*  [...select.options] takes the Array-like list of options and destructures it so that we can use Array.prototype methods on it (Edit: also consider using Array.from())
filter(...) reduces the options to only the ones that are selected
map(...) converts the raw <option> elements into their respective values */

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
              onChange={(e) => {
                navigate(
                  `/razredi/${e.target.value}/${idRazred}/ucenici/add-ucenik`
                );
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
              onChange={(e) => {
                navigate(
                  `/razredi/${idSkolskaGodina}/${e.target.value}/ucenici/add-ucenik`
                );
              }}
            >
              {razredi.map((razred) => {
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
