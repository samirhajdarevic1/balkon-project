import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { ucitajRazredeIzSkolskeGodine } from '../redux/odjeljenjaRazredi/actions';
import { ucitajSveSkolskeGodine } from '../redux/skolskeGodine/actions';
import { ucitajSveUcenike } from '../redux/ucenici/actions';
import { dodajUcenikaURazred } from '../redux/ucenikRazred/actions';
import formStyles from './Form.module.css';

const AddUcenikURazredForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { idRazred, idSkolskaGodina } = useParams();
  const [backdrop, setBackdrop] = useState('');
  const ucenici = useSelector((state) => state.ucenici.items);
  const skolskeGodine = useSelector((state) => state.skolskeGodine.items);
  const razredi = useSelector((state) => state.razredi.items);

  useEffect(() => {
    dispatch(ucitajSveUcenike());
  }, [ucenici.length]);

  useEffect(() => {
    if (skolskeGodine.length < 1) {
      dispatch(ucitajSveSkolskeGodine());
    }
  }, [skolskeGodine.length, idSkolskaGodina]);

  useEffect(() => {
    if (idSkolskaGodina) {
      dispatch(ucitajRazredeIzSkolskeGodine(+idSkolskaGodina));
    }
  }, [idSkolskaGodina, razredi.length]);
  const backdropHandler = () => {
    setBackdrop(true);
    navigate(-1);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(e.target);
    const idUcenik = e.target.idUcenik.value;
    dispatch(dodajUcenikaURazred(+idRazred, +idUcenik));
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
          <select name="idSkolskaGodina">
            {skolskeGodine.length > 0 &&
              skolskeGodine.map((sg) => {
                return (
                  <option value={sg.idSkolskaGodina} key={sg.idSkolskaGodina}>
                    {sg.skolskaGodina}
                  </option>
                );
              })}
          </select>
          <select name="idRazred">
            {razredi.map((razred) => {
              return (
                <option key={razred.idUcenik} value={razred.idUcenik}>
                  {razred.razred} {razred.oznakaOdjeljenja}
                </option>
              );
            })}
          </select>
          <select name="idUcenik" multiple>
            {ucenici.map((ucenik) => {
              return (
                <option key={ucenik.idUcenik} value={ucenik.idUcenik}>
                  {ucenik.ime} {ucenik.prezime}
                </option>
              );
            })}
          </select>
          <button>Dodaj ucenika u razred</button>
        </form>
      </>
    )
  );
};

export default AddUcenikURazredForm;
